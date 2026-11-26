const DB_NAME = 'portfolio_media_db';
const STORE_NAME = 'videos';
const DB_VERSION = 1;

function openVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open video storage.'));
  });
}

export async function saveVideoToIDB(id: string, blob: Blob): Promise<string> {
  const db = await openVideoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(blob, id);

    tx.oncomplete = () => {
      db.close();
      resolve(`idb://${id}`);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error('Failed to save video.'));
    };
  });
}

export async function getVideoBlobFromIDB(idbUri: string): Promise<Blob | null> {
  if (!idbUri.startsWith('idb://')) return null;
  const key = idbUri.replace('idb://', '');
  try {
    const db = await openVideoDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        db.close();
        resolve((req.result as Blob) || null);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  } catch (err) {
    console.error('Error loading video from IndexedDB:', err);
    return null;
  }
}

export async function deleteVideoFromIDB(idbUri?: string): Promise<void> {
  if (!idbUri || !idbUri.startsWith('idb://')) return;
  const key = idbUri.replace('idb://', '');
  try {
    const db = await openVideoDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(key);

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch (err) {
    console.error('Error deleting video from IndexedDB:', err);
  }
}

export async function clearAllVideosFromIDB(): Promise<void> {
  try {
    const db = await openVideoDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch (err) {
    console.error('Error clearing videos from IndexedDB:', err);
  }
}

export type ParsedVideoSource =
  | { kind: 'youtube'; embedUrl: string; thumbnailUrl: string; src: string }
  | { kind: 'vimeo'; embedUrl: string; src: string }
  | { kind: 'gdrive'; embedUrl: string; src: string }
  | { kind: 'idb'; src: string }
  | { kind: 'direct'; src: string };

export function parseVideoSource(rawUrl: string): ParsedVideoSource {
  const url = rawUrl.trim();

  if (url.startsWith('idb://')) {
    return { kind: 'idb', src: url };
  }

  // YouTube standard, shorts, embed, and youtu.be links
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      kind: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      src: url,
    };
  }

  // Vimeo links
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      kind: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      src: url,
    };
  }

  // Google Drive file share links
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return {
      kind: 'gdrive',
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      src: url,
    };
  }

  return { kind: 'direct', src: url };
}

export function captureVideoThumbnail(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;

    let settled = false;
    const finish = (result: string | null) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };

    const timeout = window.setTimeout(() => finish(null), 5000);

    video.onloadeddata = () => {
      try {
        video.currentTime = Math.min(0.5, video.duration ? video.duration / 4 : 0);
      } catch {
        // Fallback to frame 0 if seeking is unavailable
        tryCapture();
      }
    };

    const tryCapture = () => {
      try {
        const vw = video.videoWidth || 1280;
        const vh = video.videoHeight || 720;
        const maxWidth = 960;
        const scale = vw > maxWidth ? maxWidth / vw : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(vw * scale);
        canvas.height = Math.round(vh * scale);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/webp', 0.82);
          window.clearTimeout(timeout);
          finish(dataUrl);
          return;
        }
      } catch {
        // Ignore capture failure
      }
      window.clearTimeout(timeout);
      finish(null);
    };

    video.onseeked = tryCapture;
    video.onerror = () => {
      window.clearTimeout(timeout);
      finish(null);
    };
  });
}
