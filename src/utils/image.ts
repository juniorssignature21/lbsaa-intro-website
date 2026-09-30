export const MAX_UPLOAD_MB = 10;
const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ACCEPT_ATTR = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp';

export class PhotoError extends Error {}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new PhotoError('read'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new PhotoError('decode'));
    img.src = src;
  });
}

/**
 * Validates an uploaded portrait and returns a downscaled JPEG data URL.
 * Downscaling keeps the page fast, keeps exports crisp (the largest portrait
 * slot on the banner is well under 1400px), and lets the photo survive a
 * refresh in sessionStorage without leaving the browser.
 */
export async function processPhoto(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const typeOk = ACCEPTED.includes(file.type) || ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
  if (!typeOk) {
    throw new PhotoError('Please upload a JPG, PNG or WEBP image.');
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new PhotoError(`That image is larger than ${MAX_UPLOAD_MB} MB. Please choose a smaller photo.`);
  }

  let img: HTMLImageElement;
  let raw: string;
  try {
    raw = await readAsDataUrl(file);
    img = await loadImage(raw);
  } catch {
    throw new PhotoError('We couldn’t open that image. Please try a different photo.');
  }

  if (img.naturalWidth < 200 || img.naturalHeight < 200) {
    throw new PhotoError('That photo is quite small. Please use an image at least 200 × 200 pixels.');
  }

  const MAX = 1400;
  const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return raw;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', 0.9);
  } catch {
    return raw;
  }
}
