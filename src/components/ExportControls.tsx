import { Copy, Download, LoaderCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import type { BannerState } from '../types';
import { downloadBlob } from '../utils/exportBanner';
import { copyText, fileSlug, profileToText } from '../utils/profileText';
import { useToast } from './Toast';

export const SHARE_MESSAGE = 'I’ve created my LBS Alumni Personal Introduction. Connect | Support | Grow.';

interface Props {
  state: BannerState;
  /** Returns the rendered PNG (cached after generation). */
  getBlob: () => Promise<Blob>;
  /** The cached PNG, if one exists — lets Share run synchronously within the user's tap. */
  peekBlob: () => Blob | null;
}

export default function ExportControls({ state, getBlob, peekBlob }: Props) {
  const notify = useToast();
  const [busy, setBusy] = useState<'download' | 'share' | null>(null);
  const filename = `lbsaa-introduction-${fileSlug(state.profile.fullName)}.png`;

  async function download() {
    setBusy('download');
    try {
      const blob = await getBlob();
      downloadBlob(blob, filename);
      notify('Your banner has been downloaded (1600 × 900 PNG).', 'success');
    } catch {
      notify('We couldn’t create the image just now. Please try again in a moment.', 'error');
    } finally {
      setBusy(null);
    }
  }

  async function share() {
    setBusy('share');
    try {
      const blob = peekBlob() ?? (await getBlob());
      const file = new File([blob], filename, { type: 'image/png' });
      const data: ShareData = { files: [file], title: 'LBS Alumni Personal Introduction', text: SHARE_MESSAGE };
      if (typeof navigator.share === 'function' && navigator.canShare?.(data)) {
        await navigator.share(data);
        return;
      }
      await fallbackShare();
    } catch (e) {
      const name = (e as DOMException)?.name;
      if (name === 'AbortError') return; // user closed the share sheet
      if (name === 'NotAllowedError') {
        notify('Almost there — tap Share once more to open your share options.', 'info');
        return;
      }
      await fallbackShare();
    } finally {
      setBusy(null);
    }
  }

  async function fallbackShare() {
    const copied = await copyText(SHARE_MESSAGE);
    notify(
      copied
        ? 'Sharing isn’t available on this browser, so we copied a share message for you. Download your banner to post it with the message.'
        : 'Sharing isn’t available on this browser. Download your banner and share it from your device.',
      'info',
      { label: 'Download banner', onClick: download },
    );
  }

  async function copyProfile() {
    const ok = await copyText(profileToText(state.profile, state.visibility));
    notify(ok ? 'Your profile details were copied to the clipboard.' : 'We couldn’t access your clipboard. Please try again.', ok ? 'success' : 'error');
  }

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
      <button type="button" className="btn-primary sm:min-w-44" onClick={download} disabled={busy !== null}>
        {busy === 'download' ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
        Download PNG
      </button>
      <button type="button" className="btn-secondary" onClick={share} disabled={busy !== null}>
        {busy === 'share' ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
        Share
      </button>
      <button type="button" className="btn-secondary" onClick={copyProfile}>
        <Copy className="size-4" aria-hidden="true" /> Copy Profile
      </button>
    </div>
  );
}
