import React, { useEffect, useState } from 'react';
import { Play, Film, AlertCircle } from 'lucide-react';
import { getVideoBlobFromIDB, parseVideoSource } from '../utils/videoStorage';

interface ProjectVideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
  /** When true, YouTube/Vimeo/Drive embeds show a crisp thumbnail + Play button until clicked */
  clickToPlayEmbed?: boolean;
  className?: string;
}

export const ProjectVideoPlayer: React.FC<ProjectVideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  title,
  clickToPlayEmbed = false,
  className = '',
}) => {
  const parsed = parseVideoSource(videoUrl);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(
    parsed.kind === 'direct' ? parsed.src : null
  );
  const [loadingIdb, setLoadingIdb] = useState<boolean>(parsed.kind === 'idb');
  const [loadError, setLoadError] = useState<boolean>(false);
  const [embedActive, setEmbedActive] = useState<boolean>(!clickToPlayEmbed);

  useEffect(() => {
    setLoadError(false);
    setEmbedActive(!clickToPlayEmbed);

    if (parsed.kind !== 'idb') {
      setLoadingIdb(false);
      setResolvedUrl(parsed.kind === 'direct' ? parsed.src : null);
      return;
    }

    let cancelled = false;
    let createdObjectUrl: string | null = null;
    setLoadingIdb(true);

    getVideoBlobFromIDB(parsed.src).then((blob) => {
      if (cancelled) return;
      if (blob) {
        createdObjectUrl = URL.createObjectURL(blob);
        setResolvedUrl(createdObjectUrl);
        setLoadError(false);
      } else {
        setResolvedUrl(null);
        setLoadError(true);
      }
      setLoadingIdb(false);
    });

    return () => {
      cancelled = true;
      if (createdObjectUrl) {
        URL.revokeObjectURL(createdObjectUrl);
      }
    };
  }, [videoUrl, clickToPlayEmbed]);

  // Embedded platforms (YouTube, Vimeo, Google Drive)
  if (parsed.kind === 'youtube' || parsed.kind === 'vimeo' || parsed.kind === 'gdrive') {
    const thumb =
      posterUrl ||
      (parsed.kind === 'youtube' ? parsed.thumbnailUrl : undefined);

    if (clickToPlayEmbed && !embedActive) {
      return (
        <div
          className={`relative w-full h-full bg-slate-900 overflow-hidden group/vid cursor-pointer ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            setEmbedActive(true);
          }}
        >
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500 opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-slate-300 gap-2">
              <Film className="w-10 h-10 text-[#FF8500]" />
              <span className="text-xs font-medium px-4 text-center truncate max-w-full">{title}</span>
            </div>
          )}

          {/* Centered Play Button */}
          <div className="absolute inset-0 bg-black/30 group-hover/vid:bg-black/40 transition-colors flex items-center justify-center">
            <button
              type="button"
              aria-label={`Play ${title}`}
              className="w-14 h-14 rounded-full bg-[#FF8500] hover:bg-[#FF7700] text-white shadow-xl shadow-orange-500/40 flex items-center justify-center group-hover/vid:scale-110 transition-transform cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </button>
          </div>
        </div>
      );
    }

    const autoplayUrl =
      clickToPlayEmbed && parsed.kind === 'youtube'
        ? `${parsed.embedUrl}&autoplay=1`
        : clickToPlayEmbed && parsed.kind === 'vimeo'
        ? `${parsed.embedUrl}?autoplay=1`
        : parsed.embedUrl;

    return (
      <div className={`relative w-full h-full bg-black ${className}`}>
        <iframe
          src={autoplayUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // Local IndexedDB or Direct HTML5 video
  if (loadingIdb) {
    return (
      <div className={`w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-300 gap-2 ${className}`}>
        <div className="w-6 h-6 border-2 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">Loading video...</span>
      </div>
    );
  }

  if (loadError || !resolvedUrl) {
    return (
      <div className={`w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-300 gap-2 p-4 text-center ${className}`}>
        <AlertCircle className="w-7 h-7 text-orange-400" />
        <span className="text-xs font-medium">Video preview unavailable</span>
        <span className="text-[11px] text-slate-400">
          Use an MP4/WebM file, YouTube, Vimeo, or Google Drive link.
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <video
        key={resolvedUrl}
        src={resolvedUrl}
        poster={posterUrl}
        controls
        playsInline
        preload="metadata"
        onError={() => setLoadError(true)}
        className="w-full h-full object-contain bg-black"
      />
    </div>
  );
};
