import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileCode,
  File as GenericFileIcon,
  AlertCircle,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { clsx } from 'clsx';
import { baseUrl } from '../../../baseurl';

/**
 * Global Document Viewer Modal
 * Supports inline viewing of PDFs, Images, Text/CSV files, and provides
 * fallbacks with Google Docs Viewer and direct download options.
 */
const DocumentViewerModal = ({
  isOpen,
  onClose,
  file,
  document: docProp,
  title: titleProp,
}) => {
  const activeDoc = file || docProp;

  // Viewer state
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textContent, setTextContent] = useState(null);
  const [textLoading, setTextLoading] = useState(false);
  const containerRef = useRef(null);

  // Helper to format file size
  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes) || bytes === 0) return null;
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Resolve document metadata & URL
  const resolveDocInfo = useCallback(() => {
    if (!activeDoc) return { url: null, name: '', ext: '', size: null, mimeType: '', isLocalBlob: false };

    let url = null;
    let name = '';
    let size = null;
    let mimeType = '';
    let isLocalBlob = false;

    if (typeof activeDoc === 'string') {
      url = activeDoc;
      name = activeDoc.split('/').pop()?.split('?')[0] || 'Document';
    } else {
      name =
        titleProp ||
        activeDoc.name ||
        activeDoc.displayName ||
        activeDoc.originalName ||
        activeDoc.reportName ||
        activeDoc.title ||
        'Document';

      size = activeDoc.size || activeDoc.fileSize || null;
      mimeType = activeDoc.type || activeDoc.contentType || '';

      if (activeDoc.filePath) {
        const p = activeDoc.filePath;
        if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('blob:') || p.startsWith('data:')) {
          url = p;
        } else if (p.startsWith('/')) {
          url = `${baseUrl}${p}`;
        } else {
          url = `${baseUrl}/${p}`;
        }
      } else if (activeDoc.url) {
        url = activeDoc.url;
      } else if (activeDoc.file instanceof Blob || activeDoc.file instanceof File) {
        url = URL.createObjectURL(activeDoc.file);
        isLocalBlob = true;
      }
    }

    // Ensure fallback name has an extension if possible
    const ext = (name.split('.').pop() || '').toLowerCase();

    return { url, name, ext, size, mimeType, isLocalBlob };
  }, [activeDoc, titleProp]);

  const { url: resolvedUrl, name: fileName, ext: fileExt, size: fileSize, mimeType, isLocalBlob } = resolveDocInfo();

  // Document type classifications
  const isPdf = fileExt === 'pdf' || mimeType.includes('pdf');
  const isImage =
    ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp', 'ico'].includes(fileExt) ||
    mimeType.startsWith('image/');
  const isText = ['txt', 'csv', 'json', 'log', 'xml', 'md'].includes(fileExt) || mimeType.startsWith('text/');
  const isOffice = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExt);

  // Reset transforms on document change
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setLoading(true);
      setError(null);
      setTextContent(null);

      // Lock body scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Load text content if applicable
      if (isText && resolvedUrl) {
        setTextLoading(true);
        fetch(resolvedUrl)
          .then((res) => {
            if (!res.ok) throw new Error('Failed to load text preview');
            return res.text();
          })
          .then((text) => {
            setTextContent(text);
            setTextLoading(false);
            setLoading(false);
          })
          .catch((err) => {
            console.warn('Text fetch error, falling back to direct viewer:', err);
            setTextLoading(false);
            setLoading(false);
          });
      }

      return () => {
        document.body.style.overflow = prevOverflow;
        if (isLocalBlob && resolvedUrl) {
          URL.revokeObjectURL(resolvedUrl);
        }
      };
    }
  }, [isOpen, resolvedUrl, isText, isLocalBlob]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Download handler (handles CORS via Blob)
  const handleDownload = async () => {
    if (!resolvedUrl) return;
    try {
      const response = await fetch(resolvedUrl);
      if (!response.ok) throw new Error('Download request failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName || 'document';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Direct anchor fallback
      const a = document.createElement('a');
      a.href = resolvedUrl;
      a.download = fileName || 'document';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (!isOpen || !activeDoc) return null;

  // Format type icon
  const renderTypeIcon = () => {
    if (isPdf) return <FileText className="w-5 h-5 text-[#EE6450]" />;
    if (isImage) return <ImageIcon className="w-5 h-5 text-[#127EAB]" />;
    if (fileExt === 'csv' || fileExt === 'xlsx' || fileExt === 'xls')
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (isText) return <FileCode className="w-5 h-5 text-indigo-600" />;
    return <GenericFileIcon className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1E32]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        ref={containerRef}
        className={clsx(
          'relative w-full bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,35,55,0.4)] border border-[#CCDCE1]/80 flex flex-col overflow-hidden transition-all duration-300 z-10',
          isFullscreen
            ? 'fixed inset-0 w-screen h-screen rounded-none border-0'
            : 'max-w-6xl h-[90vh] max-h-[920px]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E6F0F5] bg-[#F8FBFC] shrink-0">
          {/* File info */}
          <div className="flex items-center gap-3 min-w-0 mr-3">
            <div className="p-2 bg-white rounded-xl border border-[#DCEAF0] shadow-2xs shrink-0">
              {renderTypeIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className="text-sm sm:text-base font-semibold text-[#1F4264] truncate"
                  title={fileName}
                >
                  {fileName}
                </h3>
                {fileExt && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20 shrink-0">
                    {fileExt}
                  </span>
                )}
              </div>
              {fileSize && (
                <p className="text-xs text-[#6F7F8E] mt-0.5">
                  Size: {formatFileSize(fileSize)}
                </p>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Image specific controls */}
            {isImage && (
              <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 bg-white border border-[#DCEAF0] rounded-xl shadow-2xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  className="p-1.5 text-slate-500 hover:text-[#1F4264] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2 py-1 text-xs font-semibold text-slate-600 hover:text-[#127EAB] transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-1.5 text-slate-500 hover:text-[#1F4264] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-1.5 text-slate-500 hover:text-[#1F4264] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Download Button */}
            {resolvedUrl && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-[#DCEAF0] hover:bg-[#E9F7FA] hover:border-[#127EAB]/40 text-[#1F4264] transition-all shadow-2xs cursor-pointer"
                title="Download file"
              >
                <Download className="w-4 h-4 text-[#127EAB]" />
                <span className="hidden md:inline">Download</span>
              </button>
            )}

            {/* Open in New Tab Button */}
            {resolvedUrl && (
              <button
                type="button"
                onClick={() => window.open(resolvedUrl, '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-[#DCEAF0] hover:bg-[#E9F7FA] hover:border-[#127EAB]/40 text-[#1F4264] transition-all shadow-2xs cursor-pointer"
                title="Open in new browser tab"
              >
                <ExternalLink className="w-4 h-4 text-[#127EAB]" />
                <span className="hidden lg:inline">New Tab</span>
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-[#1F4264] hover:bg-[#E9F7FA] rounded-xl transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-[#EE6450] hover:bg-[#FEF4F2] rounded-xl transition-colors cursor-pointer ml-1"
              title="Close viewer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Content Area */}
        <div className="relative flex-1 w-full bg-[#1A2E44]/5 overflow-auto flex items-center justify-center min-h-[300px]">
          {/* Loading Overlay */}
          {loading && !error && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs">
              <Loader2 className="w-8 h-8 text-[#127EAB] animate-spin mb-2" />
              <p className="text-xs sm:text-sm font-medium text-[#1F4264]">
                Loading document preview...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error ? (
            <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-sm border border-rose-100 m-4">
              <AlertCircle className="w-12 h-12 text-[#EE6450] mx-auto mb-3" />
              <h4 className="text-base font-semibold text-[#1F4264] mb-1">
                Unable to Preview Document
              </h4>
              <p className="text-xs text-[#6F7F8E] mb-5">{error}</p>
              {resolvedUrl && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#127EAB] text-white text-xs font-semibold rounded-xl hover:bg-[#0E668B] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open(resolvedUrl, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Tab
                  </button>
                </div>
              )}
            </div>
          ) : !resolvedUrl ? (
            <div className="text-center p-8">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">
                File not available for viewing.
              </p>
            </div>
          ) : isPdf ? (
            /* PDF Viewer via iframe */
            <div className="w-full h-full relative bg-[#525659]">
              <iframe
                src={`${resolvedUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0 bg-white"
                title={fileName}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError('PDF preview failed to load in browser.');
                }}
              />
            </div>
          ) : isImage ? (
            /* Image Viewer with interactive pan/zoom */
            <div className="w-full h-full overflow-auto flex items-center justify-center p-4 bg-[#0F2236]/90 select-none">
              <img
                src={resolvedUrl}
                alt={fileName}
                className="max-w-none transition-transform duration-200 ease-out shadow-2xl rounded-lg pointer-events-auto"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  maxHeight: zoom === 1 ? '80vh' : 'none',
                  maxWidth: zoom === 1 ? '90%' : 'none',
                  objectFit: 'contain',
                }}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError('Failed to load image preview.');
                }}
              />
            </div>
          ) : isText && textContent !== null ? (
            /* Text / CSV Viewer */
            <div className="w-full h-full p-4 sm:p-6 overflow-auto bg-[#F9FBFC]">
              <div className="bg-white p-5 rounded-xl border border-[#CCDCE1] shadow-2xs">
                <pre className="text-xs sm:text-sm font-mono text-[#1F4264] whitespace-pre-wrap break-words leading-relaxed">
                  {textContent}
                </pre>
              </div>
            </div>
          ) : isOffice ? (
            /* Office documents via Google Docs Viewer */
            <div className="w-full h-full relative bg-slate-100 flex flex-col">
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center justify-between shrink-0">
                <span>
                  Office file preview powered by Google Docs Viewer. If it doesn't render, click Download.
                </span>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="font-bold underline ml-2 hover:text-amber-900"
                >
                  Download
                </button>
              </div>
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                  resolvedUrl
                )}&embedded=true`}
                className="w-full flex-1 border-0 bg-white"
                title={fileName}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError('Office document preview is unavailable.');
                }}
              />
            </div>
          ) : (
            /* Fallback generic document preview */
            <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-sm border border-[#DCEAF0] m-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center mx-auto mb-4">
                <GenericFileIcon className="w-8 h-8 text-[#127EAB]" />
              </div>
              <h4 className="text-base font-semibold text-[#1F4264] mb-1">
                {fileName}
              </h4>
              <p className="text-xs text-[#6F7F8E] mb-6">
                Direct in-browser preview is not supported for this file format (.{fileExt || 'file'}).
                You can download it to view on your device.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#127EAB] text-white text-xs font-semibold rounded-xl hover:bg-[#0E668B] shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
