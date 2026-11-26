import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  Image as ImageIcon,
  Check,
  FolderOpen,
  Video,
  Film,
  AlertCircle,
  Link2,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import {
  saveVideoToIDB,
  captureVideoThumbnail,
  parseVideoSource,
} from '../utils/videoStorage';
import { ProjectVideoPlayer } from './ProjectVideoPlayer';

interface AddProjectModalProps {
  isOpen: boolean;
  initialMediaType?: 'image' | 'video';
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

const DEFAULT_IMAGE = '/assets/aistudio/7485a2d5c688d5262d6049dbae1d1b84_c05bedca.jpg';
const MAX_VIDEO_SIZE_MB = 100;

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  initialMediaType = 'image',
  onClose,
  onAddProject,
}) => {
  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialMediaType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'wordpress' | 'design' | 'ai' | 'landing' | 'video'>('wordpress');
  const [client, setClient] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [description, setDescription] = useState('');

  // Image state
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Video state
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [videoPreviewObjectUrl, setVideoPreviewObjectUrl] = useState<string | null>(null);
  const [videoPosterUrl, setVideoPosterUrl] = useState<string>('');
  const [videoPosterName, setVideoPosterName] = useState<string | null>(null);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Meta & case study fields
  const [tagsInput, setTagsInput] = useState('WordPress, WooCommerce, Elementor, SEO');
  const [liveUrl, setLiveUrl] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [toolsInput, setToolsInput] = useState('WordPress, Elementor Pro, SEO');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const videoPosterInputRef = useRef<HTMLInputElement>(null);

  // Sync mediaType & smart defaults whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormError(null);
      setMediaType(initialMediaType);
      if (initialMediaType === 'video') {
        setCategory('video');
        setTagsInput('AI Video, Promo Ad, Motion Graphics');
        setToolsInput('AI Video Generator, Video Editing, Scriptwriting');
      } else {
        setCategory('wordpress');
        setTagsInput('WordPress, WooCommerce, Elementor, SEO');
        setToolsInput('WordPress, Elementor Pro, SEO');
      }
    }
  }, [isOpen, initialMediaType]);

  // Clean up object URL when changed or unmounted
  useEffect(() => {
    return () => {
      if (videoPreviewObjectUrl) {
        URL.revokeObjectURL(videoPreviewObjectUrl);
      }
    };
  }, [videoPreviewObjectUrl]);

  if (!isOpen) return null;

  const switchMediaType = (next: 'image' | 'video') => {
    setMediaType(next);
    setFormError(null);
    if (next === 'video' && category === 'wordpress' && !title.trim()) {
      setCategory('video');
      setTagsInput('AI Video, Promo Ad, Motion Graphics');
      setToolsInput('AI Video Generator, Video Editing, Scriptwriting');
    } else if (next === 'image' && category === 'video' && !title.trim()) {
      setCategory('wordpress');
      setTagsInput('WordPress, WooCommerce, Elementor, SEO');
      setToolsInput('WordPress, Elementor Pro, SEO');
    }
  };

  const compressImageFile = (file: File, onDone: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (file.size <= 450 * 1024) {
        onDone(rawDataUrl);
        return;
      }

      const img = new window.Image();
      img.onload = () => {
        const maxWidth = 1400;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          onDone(canvas.toDataURL('image/webp', 0.85));
        } else {
          onDone(rawDataUrl);
        }
      };
      img.onerror = () => onDone(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, WebP, GIF, etc.).');
      e.target.value = '';
      return;
    }

    setIsUploading(true);
    setPreviewError(false);
    setUploadedFileName(file.name);

    compressImageFile(file, (dataUrl) => {
      setImageUrl(dataUrl);
      setIsUploading(false);
    });
    e.target.value = '';
  };

  const handleBrowseVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);

    if (!file.type.startsWith('video/')) {
      setFormError('Please select a valid video file (MP4, WebM, MOV, OGG).');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      setFormError(`Video file is too large. Please choose a video under ${MAX_VIDEO_SIZE_MB}MB or paste a YouTube/Vimeo/Drive link.`);
      e.target.value = '';
      return;
    }

    setIsProcessingVideo(true);
    if (videoPreviewObjectUrl) {
      URL.revokeObjectURL(videoPreviewObjectUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedVideoFile(file);
    setVideoPreviewObjectUrl(previewUrl);
    setVideoUrlInput('');

    // Auto-extract a crisp poster frame if user hasn't picked a custom thumbnail
    if (!videoPosterName) {
      const captured = await captureVideoThumbnail(file);
      if (captured) {
        setVideoPosterUrl(captured);
      }
    }

    setIsProcessingVideo(false);
    e.target.value = '';
  };

  const handleBrowseVideoPoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file for the video thumbnail.');
      e.target.value = '';
      return;
    }

    setVideoPosterName(file.name);
    compressImageFile(file, (dataUrl) => {
      setVideoPosterUrl(dataUrl);
    });
    e.target.value = '';
  };

  const clearSelectedVideo = () => {
    if (videoPreviewObjectUrl) {
      URL.revokeObjectURL(videoPreviewObjectUrl);
    }
    setSelectedVideoFile(null);
    setVideoPreviewObjectUrl(null);
    if (!videoPosterName) {
      setVideoPosterUrl('');
    }
  };

  const imagePresets = [
    { label: 'GlowCare Store', url: '/assets/aistudio/7485a2d5c688d5262d6049dbae1d1b84_c05bedca.jpg' },
    { label: 'Genesis AI App', url: '/src/assets/images/project_ai_platform_1794367988507.jpg' },
    { label: 'WooCommerce MacBook', url: '/src/assets/images/project_wordpress_store_1794367988517.jpg' },
    { label: 'Rashidul 3D Showcase', url: '/src/assets/images/hero_3d_rashidul_1794367987174.jpg' },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'wordpress': return 'WordPress & WooCommerce';
      case 'ai': return 'AI & Automation';
      case 'landing': return 'Landing Page Development';
      case 'design': return 'Branding & Design';
      case 'video': return 'Video & AI Ads';
      default: return 'Web & Digital';
    }
  };

  const resetForm = () => {
    setTitle('');
    setClient('');
    setDescription('');
    setLiveUrl('');
    setChallenge('');
    setSolution('');
    setResults('');
    setUploadedFileName(null);
    setPreviewError(false);
    setVideoUrlInput('');
    clearSelectedVideo();
    setVideoPosterUrl('');
    setVideoPosterName(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !description.trim()) {
      setFormError('Please fill in the Project Title and Short Summary Description.');
      return;
    }

    if (mediaType === 'video' && !selectedVideoFile && !videoUrlInput.trim()) {
      setFormError('Please browse a video file from your device or paste a video URL (YouTube, Vimeo, Drive, or MP4).');
      return;
    }

    setIsSaving(true);
    try {
      const projectId = `proj-${Date.now()}`;
      let finalVideoUrl: string | undefined;
      let finalImageUrl = imageUrl.trim() || DEFAULT_IMAGE;
      let finalVideoFileName: string | undefined;

      if (mediaType === 'video') {
        if (selectedVideoFile) {
          finalVideoUrl = await saveVideoToIDB(`video-${projectId}`, selectedVideoFile);
          finalVideoFileName = selectedVideoFile.name;
          finalImageUrl = videoPosterUrl || DEFAULT_IMAGE;
        } else {
          finalVideoUrl = videoUrlInput.trim();
          const parsed = parseVideoSource(finalVideoUrl);
          if (videoPosterUrl) {
            finalImageUrl = videoPosterUrl;
          } else if (parsed.kind === 'youtube') {
            finalImageUrl = parsed.thumbnailUrl;
          } else {
            finalImageUrl = DEFAULT_IMAGE;
          }
        }
      }

      const newProject: Project = {
        id: projectId,
        title: title.trim(),
        category,
        categoryLabel: getCategoryLabel(category),
        description: description.trim(),
        imageUrl: finalImageUrl,
        mediaType,
        videoUrl: finalVideoUrl,
        videoFileName: finalVideoFileName,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        client: client.trim() || 'Confidential Client',
        year: year.trim() || String(new Date().getFullYear()),
        liveUrl: liveUrl.trim() || undefined,
        caseStudy: {
          challenge:
            challenge.trim() ||
            (mediaType === 'video'
              ? 'Client needed an engaging, high-retention video showcase to capture audience attention and drive conversions.'
              : 'Client needed a modern digital solution to boost online conversions and brand visibility.'),
          solution:
            solution.trim() ||
            (mediaType === 'video'
              ? 'Produced a polished video asset combining AI visual generation, crisp pacing, and conversion-focused storytelling.'
              : 'Engineered a tailored, high-performance website with clean UI architecture and fast loading times.'),
          results:
            results.trim() ||
            (mediaType === 'video'
              ? 'Delivered higher engagement, stronger brand recall, and increased click-through rates.'
              : 'Achieved high organic traffic and increased client inquiries.'),
          toolsUsed: toolsInput.split(',').map((t) => t.trim()).filter(Boolean),
        },
      };

      onAddProject(newProject);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Failed to save project:', err);
      setFormError('Could not save the video in browser storage. Try a smaller video file or paste a YouTube/Vimeo/Drive URL.');
    } finally {
      setIsSaving(false);
    }
  };

  const activeVideoPreviewSrc = videoPreviewObjectUrl || videoUrlInput.trim();
  const parsedVideoInput = videoUrlInput.trim() ? parseVideoSource(videoUrlInput.trim()) : null;
  const activePosterPreview =
    videoPosterUrl ||
    (parsedVideoInput?.kind === 'youtube' ? parsedVideoInput.thumbnailUrl : undefined);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8EAF0] dark:border-[#2D3748]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8500]" />
              <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider">
                Portfolio Management
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#171923] dark:text-white mt-1">
              {mediaType === 'video' ? 'Add New Video Project' : 'Add New Project'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline Error Message */}
        {formError && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Media Type Switcher: Image vs Video */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Project Media Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-[#E8EAF0] dark:border-[#2D3748]">
              <button
                type="button"
                onClick={() => switchMediaType('image')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  mediaType === 'image'
                    ? 'bg-white dark:bg-[#1A1D27] text-[#FF8500] shadow-sm border border-orange-200 dark:border-orange-500/30'
                    : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image Project</span>
              </button>

              <button
                type="button"
                onClick={() => switchMediaType('video')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  mediaType === 'video'
                    ? 'bg-gradient-to-r from-[#FF8500] to-[#FFAB45] text-white shadow-sm'
                    : 'text-[#606575] dark:text-[#9EA3B0] hover:text-[#171923] dark:hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Project</span>
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder={
                  mediaType === 'video'
                    ? 'e.g. AI Product Commercial — Luxury Skincare'
                    : 'e.g. Lumina — Organic Cosmetics Store'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              >
                <option value="video">Video & AI Ads</option>
                <option value="wordpress">WordPress & WooCommerce</option>
                <option value="ai">AI & Automation</option>
                <option value="landing">Landing Page Development</option>
                <option value="design">Branding & Design</option>
              </select>
            </div>
          </div>

          {/* Client & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Client / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Lumina Health Co."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Year
              </label>
              <input
                type="text"
                placeholder="2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Short Summary Description *
            </label>
            <textarea
              required
              rows={2}
              placeholder="A brief overview of the project and key highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] resize-none"
            />
          </div>

          {/* MEDIA SECTION: VIDEO OR IMAGE */}
          {mediaType === 'video' ? (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-[#171923] dark:text-white flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#FF8500]" />
                  <span>Project Video (Browse from Device or Paste Link)</span>
                </label>
                <span className="text-[10px] text-[#606575] dark:text-[#9EA3B0]">
                  MP4, WebM, YouTube, Vimeo, Drive
                </span>
              </div>

              {/* Hidden Video File Input */}
              <input
                type="file"
                ref={videoFileInputRef}
                accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                onChange={handleBrowseVideo}
                className="hidden"
              />

              {/* Video URL input + Browse Video button */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Paste YouTube, Vimeo, Google Drive, or .mp4 URL..."
                    value={
                      selectedVideoFile
                        ? `Uploaded Video: ${selectedVideoFile.name}`
                        : videoUrlInput
                    }
                    readOnly={Boolean(selectedVideoFile)}
                    onChange={(e) => {
                      setFormError(null);
                      setVideoUrlInput(e.target.value);
                    }}
                    className="w-full pl-8 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => videoFileInputRef.current?.click()}
                  disabled={isProcessingVideo}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-60"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>{isProcessingVideo ? 'Loading...' : 'Browse Video'}</span>
                </button>
              </div>

              {/* Uploaded video file badge */}
              {selectedVideoFile && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      Selected: <strong>{selectedVideoFile.name}</strong> (
                      {(selectedVideoFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={clearSelectedVideo}
                    className="text-[10px] font-semibold underline hover:text-emerald-900 dark:hover:text-white ml-2 shrink-0 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Optional Custom Thumbnail / Poster Picker */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <input
                  type="file"
                  ref={videoPosterInputRef}
                  accept="image/*"
                  onChange={handleBrowseVideoPoster}
                  className="hidden"
                />
                <span className="text-[11px] text-[#606575] dark:text-[#9EA3B0]">
                  {videoPosterName
                    ? `Custom thumbnail: ${videoPosterName}`
                    : selectedVideoFile
                    ? 'Auto-thumbnail captured from video (optional custom cover):'
                    : 'Optional cover thumbnail image:'}
                </span>
                <div className="flex items-center gap-2">
                  {videoPosterName && (
                    <button
                      type="button"
                      onClick={() => {
                        setVideoPosterName(null);
                        setVideoPosterUrl('');
                      }}
                      className="text-[11px] text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => videoPosterInputRef.current?.click()}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-[#171923] dark:text-white hover:border-[#FF8500] transition-colors cursor-pointer"
                  >
                    Upload Thumbnail
                  </button>
                </div>
              </div>

              {/* Live Video Preview */}
              {activeVideoPreviewSrc ? (
                <div className="mt-2 rounded-xl overflow-hidden aspect-video bg-black border border-slate-200 dark:border-slate-700">
                  <ProjectVideoPlayer
                    videoUrl={activeVideoPreviewSrc}
                    posterUrl={activePosterPreview}
                    title={title || 'Video Preview'}
                  />
                </div>
              ) : (
                <div className="mt-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-5 text-center space-y-1.5">
                  <Video className="w-7 h-7 text-[#FF8500] mx-auto opacity-80" />
                  <p className="text-xs font-medium text-[#171923] dark:text-white">
                    Upload a video file or paste a YouTube / Vimeo / Google Drive link
                  </p>
                  <p className="text-[11px] text-[#606575] dark:text-[#9EA3B0]">
                    Supports local MP4/WebM/MOV files (up to {MAX_VIDEO_SIZE_MB}MB) & instant video embeds
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Project Image (Browse from Device or Paste URL)
                </label>
                <span className="text-[10px] text-[#606575] dark:text-[#9EA3B0]">
                  Preview available below
                </span>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleBrowseImage}
                className="hidden"
              />

              {/* URL Input + Browse Button */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  placeholder="/assets/aistudio/... or https://..."
                  value={
                    imageUrl.startsWith('data:image/')
                      ? uploadedFileName
                        ? `Uploaded: ${uploadedFileName}`
                        : 'Uploaded Image Ready'
                      : imageUrl
                  }
                  readOnly={imageUrl.startsWith('data:image/')}
                  onChange={(e) => {
                    setUploadedFileName(null);
                    setPreviewError(false);
                    setImageUrl(e.target.value);
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-60"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>{isUploading ? 'Loading...' : 'Browse Image'}</span>
                </button>
              </div>

              {uploadedFileName && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      Selected: <strong>{uploadedFileName}</strong>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileName(null);
                      setPreviewError(false);
                      setImageUrl(DEFAULT_IMAGE);
                    }}
                    className="text-[10px] font-semibold underline hover:text-emerald-900 dark:hover:text-white ml-2 shrink-0 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Quick Pick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-medium text-[#606575] dark:text-[#9EA3B0] mr-1">
                  Quick Presets:
                </span>
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUploadedFileName(null);
                      setPreviewError(false);
                      setImageUrl(preset.url);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      imageUrl === preset.url
                        ? 'bg-orange-500/10 text-[#FF8500] border-orange-300 font-semibold'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Live Image Thumbnail Preview */}
              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden aspect-[16/9] max-h-40 bg-slate-200 dark:bg-slate-700 relative group">
                  {previewError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-xs text-[#606575] dark:text-[#9EA3B0] gap-1 p-4 text-center">
                      <ImageIcon className="w-6 h-6 opacity-50" />
                      <span>
                        Preview unavailable for this URL. Click &quot;Browse Image&quot; to upload
                        from your device.
                      </span>
                    </div>
                  ) : (
                    <img
                      key={imageUrl}
                      src={imageUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover object-top"
                      onError={() => setPreviewError(true)}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tags & Live URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="WooCommerce, Elementor, SEO"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Live URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs sm:text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>
          </div>

          {/* Case Study Details Section */}
          <div className="space-y-3 pt-2 border-t border-[#E8EAF0] dark:border-[#2D3748]">
            <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider block">
              Case Study Modal Details
            </span>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                The Challenge
              </label>
              <input
                type="text"
                placeholder={
                  mediaType === 'video'
                    ? 'Client needed a high-converting AI promo video...'
                    : 'Client needed a high-speed eCommerce platform...'
                }
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                Our Solution
              </label>
              <input
                type="text"
                placeholder={
                  mediaType === 'video'
                    ? 'Generated cinematic AI visuals, voiceover, and motion edits...'
                    : 'Engineered custom WordPress architecture and schema markup...'
                }
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Key Result
                </label>
                <input
                  type="text"
                  placeholder={
                    mediaType === 'video'
                      ? '3.5x ad engagement & higher ROAS'
                      : '+140% sales & 98 PageSpeed'
                  }
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                  Tools Used (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="WordPress, WooCommerce, Elementor"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-xs text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading || isProcessingVideo}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {mediaType === 'video' ? (
                <Video className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>
                {isSaving
                  ? 'Saving...'
                  : mediaType === 'video'
                  ? 'Add Video to Portfolio'
                  : 'Add to Portfolio'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
