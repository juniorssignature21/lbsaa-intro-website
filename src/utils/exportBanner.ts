import { getFontEmbedCSS, toBlob } from 'html-to-image';

export const BANNER_WIDTH = 1600;
export const BANNER_HEIGHT = 900;

let fontCss: Promise<string> | null = null;

function waitForImages(node: HTMLElement): Promise<void> {
  const imgs = Array.from(node.querySelectorAll('img'));
  return Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? img.decode?.().catch(() => undefined)
        : new Promise<void>((res) => {
            img.addEventListener('load', () => res(), { once: true });
            img.addEventListener('error', () => res(), { once: true });
          }),
    ),
  ).then(() => undefined);
}

/**
 * Renders a full-size (unscaled) banner node to a 1600×900 PNG blob.
 * Only the banner node is captured — no UI chrome.
 */
export async function renderBannerPng(node: HTMLElement): Promise<Blob> {
  await document.fonts?.ready;
  await waitForImages(node);

  // Font CSS is identical for every render; embed it once.
  fontCss ??= getFontEmbedCSS(node).catch(() => '');
  const fontEmbedCSS = await fontCss;

  const options = {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    canvasWidth: BANNER_WIDTH,
    canvasHeight: BANNER_HEIGHT,
    pixelRatio: 1,
    backgroundColor: '#FFFFFF',
    fontEmbedCSS,
    style: { transform: 'none', margin: '0' },
  };

  // Safari occasionally drops images on the very first pass; a warm-up
  // render makes the second pass reliable and is cheap everywhere else.
  await toBlob(node, options).catch(() => null);
  const blob = await toBlob(node, options);
  if (!blob) throw new Error('empty');
  return blob;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
