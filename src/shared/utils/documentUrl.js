import { baseUrl } from '../../baseurl';

/**
 * Clean baseUrl by removing any trailing slashes
 */
const cleanBaseUrl = (baseUrl || '').replace(/\/+$/, '');

/**
 * Comprehensive Document & Image URL Resolver
 * Handles:
 * - Full external URLs (Cloudinary, S3, CDN, https://...)
 * - Local relative paths with leading slash ("/uploads/file.png")
 * - Local relative paths without leading slash ("uploads/file.png")
 * - Windows-style backslash paths ("\\uploads\\file.png" or "uploads\\file.png")
 * - Full URLs pointing to localhost when accessed from LAN/IP (remaps to active baseUrl)
 * - Raw File / Blob objects (creates object URL)
 * - Complete document objects containing { filePath, fileName, mimeType, ... }
 *
 * @param {string|object} pathOrDoc - File path, full URL, or Document object
 * @param {string|null} fallback - Optional fallback URL if resolution fails
 * @returns {string|null} Fully resolved URL or fallback
 */
export const getDocumentUrl = (pathOrDoc, fallback = null) => {
  if (!pathOrDoc) return fallback;

  let raw = '';

  // 1. If an object is passed, extract the URL / path field
  if (typeof pathOrDoc === 'object') {
    // If it's a local File/Blob directly
    if (pathOrDoc instanceof File || pathOrDoc instanceof Blob) {
      return URL.createObjectURL(pathOrDoc);
    }
    // If it's an object wrapping a File/Blob (e.g. { file: File })
    if (pathOrDoc.file instanceof File || pathOrDoc.file instanceof Blob) {
      return URL.createObjectURL(pathOrDoc.file);
    }

    raw =
      pathOrDoc.filePath ||
      pathOrDoc.url ||
      pathOrDoc.fileUrl ||
      pathOrDoc.path ||
      pathOrDoc.downloadUrl ||
      '';
  } else if (typeof pathOrDoc === 'string') {
    raw = pathOrDoc;
  }

  raw = String(raw).trim();
  if (!raw) return fallback;

  // 2. Blob or Data URLs (data:image/..., blob:http...)
  if (raw.startsWith('blob:') || raw.startsWith('data:')) {
    return raw;
  }

  // 3. Normalize all Windows backslashes to forward slashes
  let normalized = raw.replace(/\\+/g, '/');

  // 4. Handle full HTTP/HTTPS URLs
  if (/^https?:\/\//i.test(normalized)) {
    // If the URL has localhost/127.0.0.1 and our active baseUrl is a LAN IP or domain,
    // remap localhost /uploads path to the active baseUrl
    try {
      const parsed = new URL(normalized);
      if (
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') &&
        cleanBaseUrl &&
        !cleanBaseUrl.includes('localhost') &&
        !cleanBaseUrl.includes('127.0.0.1')
      ) {
        return `${cleanBaseUrl}${parsed.pathname}${parsed.search}`;
      }
    } catch (_) {
      // Ignore URL parsing errors, return normalized
    }
    return normalized;
  }

  // 5. Ensure path is formatted correctly:
  // - If it's a raw filename with no slash (e.g. "document-123.png"), place it under /uploads/
  // - If it's already a relative path (e.g. "uploads/..." or "/uploads/..."), ensure leading slash
  if (!normalized.includes('/')) {
    normalized = `/uploads/${normalized}`;
  } else if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  // 6. Prepend active backend baseUrl
  return cleanBaseUrl ? `${cleanBaseUrl}${normalized}` : normalized;
};

/**
 * Image URL resolver (alias of getDocumentUrl with image fallback support)
 */
export const getImageUrl = (pathOrDoc, fallback = null) => {
  return getDocumentUrl(pathOrDoc, fallback);
};

/**
 * Extract clean display name from a document object or path
 */
export const getDocumentName = (pathOrDoc, fallback = 'Document') => {
  if (!pathOrDoc) return fallback;

  if (typeof pathOrDoc === 'object') {
    const candidate =
      pathOrDoc.fileName ||
      pathOrDoc.name ||
      pathOrDoc.displayName ||
      pathOrDoc.originalName ||
      pathOrDoc.reportName ||
      pathOrDoc.title;
    if (candidate && typeof candidate === 'string') return candidate.trim();

    // Fall back to filePath if available
    const pathCandidate = pathOrDoc.filePath || pathOrDoc.url || pathOrDoc.path;
    if (pathCandidate && typeof pathCandidate === 'string') {
      const cleanPath = pathCandidate.replace(/\\+/g, '/').split('?')[0];
      const segment = cleanPath.split('/').pop();
      if (segment) return segment;
    }
  } else if (typeof pathOrDoc === 'string') {
    const cleanPath = pathOrDoc.replace(/\\+/g, '/').split('?')[0];
    const segment = cleanPath.split('/').pop();
    if (segment) return segment;
  }

  return fallback;
};

/**
 * Extract file extension in lowercase without dot
 */
export const getDocumentExtension = (pathOrDoc) => {
  const name = getDocumentName(pathOrDoc, '');
  if (!name || !name.includes('.')) return '';
  return name.split('.').pop().toLowerCase();
};

/**
 * Check if the document/path represents an image
 */
export const isImageUrl = (pathOrDoc) => {
  if (!pathOrDoc) return false;

  if (typeof pathOrDoc === 'object') {
    if (pathOrDoc.mimeType?.startsWith('image/') || pathOrDoc.type?.startsWith('image/')) {
      return true;
    }
  }

  const ext = getDocumentExtension(pathOrDoc);
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp', 'ico', 'tiff'].includes(ext);
};

/**
 * Check if the document/path represents a PDF
 */
export const isPdfUrl = (pathOrDoc) => {
  if (!pathOrDoc) return false;

  if (typeof pathOrDoc === 'object') {
    if (pathOrDoc.mimeType === 'application/pdf' || pathOrDoc.type === 'application/pdf') {
      return true;
    }
  }

  const ext = getDocumentExtension(pathOrDoc);
  return ext === 'pdf';
};

/**
 * Complete document metadata resolver
 * Returns unified info for DocumentViewerModal, cards, and previews
 */
export const resolveDocumentInfo = (pathOrDoc, fallbackTitle = 'Document') => {
  if (!pathOrDoc) {
    return {
      url: null,
      name: fallbackTitle,
      ext: '',
      isImage: false,
      isPdf: false,
      size: null,
      mimeType: '',
      raw: null,
    };
  }

  const url = getDocumentUrl(pathOrDoc);
  const name = getDocumentName(pathOrDoc, fallbackTitle);
  const ext = getDocumentExtension(pathOrDoc);
  const isImage = isImageUrl(pathOrDoc);
  const isPdf = isPdfUrl(pathOrDoc);
  const size = typeof pathOrDoc === 'object' ? (pathOrDoc.fileSize || pathOrDoc.size || null) : null;
  const mimeType =
    typeof pathOrDoc === 'object' ? (pathOrDoc.mimeType || pathOrDoc.type || '') : '';

  return {
    url,
    name,
    ext,
    isImage,
    isPdf,
    size,
    mimeType,
    raw: pathOrDoc,
  };
};

export default {
  getDocumentUrl,
  getImageUrl,
  getDocumentName,
  getDocumentExtension,
  isImageUrl,
  isPdfUrl,
  resolveDocumentInfo,
};
