import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  File,
  Image,
  Download,
  Calendar,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { documentService } from '../services/documentService';
import { baseUrl } from '../../baseurl';

const Documents = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const fileInputRef = useRef(null);
  const replaceInputRefs = useRef({});
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const documentTypes = [
    'W2-Wage Income',
    'Prior year Tax Return Copy',
    '1099-INT - Interest Income',
    '1099-DIV - Dividend Income',
    '1099-G - State Tax Refunds',
    '1099-MISC - Business Income',
    '1099-HC - MA State Health Coverage Document',
    '1099-B - Sale of Shares Statement',
    '1099-R - Retirement Distributions',
    '1098 - Home Mortgage Interest',
    '1098-E - Student Loan Interest',
    '1098-T - Tuition Fees Expenses',
    '1095-A - Health Insurance Market Place',
    'Foreign Income Document',
    'Personal Identification Document of Tax Payer',
    'Others',
  ];

  const personTypes = ['Tax Payer', 'Spouse', 'Both'];

  // Load existing documents from backend on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await documentService.getMyDocuments();
        // Filter out admin-uploaded documents (they're shown in Tax Draft section)
        const clientDocs = (res.data || []).filter(d =>
          d.uploadedBy !== 'admin' && d.uploadedBy !== 'ADMIN'
        );
        const docs = clientDocs.map((d) => ({
          id: d._id,
          file: null,
          name: d.fileName,
          displayName: d.fileName,
          size: d.fileSize || 0,
          type: d.mimeType || '',
          uploadedDate: new Date(d.createdAt).toLocaleDateString(),
          uploadedYear: new Date(d.createdAt).getFullYear(),
          documentType: d.documentType,
          personType: 'Tax Payer',
          category: getCategoryFromType(d.mimeType || ''),
          isNew: false,
          filePath: d.filePath, // Cloudinary URL for download
          uploadedBy: d.uploadedBy || 'client', // Track who uploaded: 'client' or 'admin'
        }));
        setFiles(docs);
      } catch (error) {
        console.error('Failed to load documents', error);
        setToast({
          type: 'error',
          message: 'Failed to load your documents. Please try again.',
        });
      }
    };
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter files by selected year
  const getFilteredFiles = () => {
    if (!selectedYear || selectedYear === 'all') return files;
    return files.filter(f => f.uploadedYear === parseInt(selectedYear));
  };

  // Get available years from documents
  const getAvailableYears = () => {
    const years = [...new Set(files.map(f => f.uploadedYear).filter(Boolean))].sort((a, b) => b - a);
    return years;
  };

  const getDocumentUrl = (filePath) => {
    if (!filePath) return null;
    // Check if it's already a full URL (e.g., Cloudinary URL)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // Otherwise, prepend the base URL for local files
    // If filePath starts with /, it's already a path, just prepend baseUrl
    // If it doesn't start with /, add it
    if (filePath.startsWith('/')) {
      return `${baseUrl}${filePath}`;
    }
    return `${baseUrl}/${filePath}`;
  };

  const handleDownload = async (file) => {
    try {
      if (file.filePath) {
        // Get full URL (handles both Cloudinary and local files)
        const url = getDocumentUrl(file.filePath);
        if (url) {
          // Fetch the file as a blob to handle CORS and ensure download works
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch file');
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          // Create download link
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = file.name || file.displayName || 'document';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Clean up blob URL after a delay
          setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } else {
          setToast({ type: 'error', message: 'File not available for download.' });
        }
      } else if (file.file) {
        // Download local file (not yet uploaded)
        const url = URL.createObjectURL(file.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setToast({ type: 'error', message: 'File not available for download.' });
      }
    } catch (error) {
      console.error('Download error:', error);
      setToast({ type: 'error', message: 'Failed to download file. Please try again.' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const defaultDocType = selectedDocumentType || 'Others';
    const now = new Date();
    const newFiles = Array.from(fileList).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      displayName: file.name,
      size: file.size,
      type: file.type,
      uploadedDate: now.toLocaleDateString(),
      uploadedYear: now.getFullYear(),
      documentType: defaultDocType,
      personType: selectedPerson || 'Tax Payer',
      category: getCategoryFromType(file.type),
      isNew: true,
      uploadedBy: 'client', // Mark as client upload
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    // Reset selections after upload
    setSelectedDocumentType('');
    setSelectedPerson('');
  };

  const getCategoryFromType = (type) => {
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return 'Employment Docs';
    }
    // All other files (images, PDFs, etc.) go to Employment Docs
    return 'Employment Docs';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleViewFile = (file) => {
    try {
      if (file.filePath) {
        // Get full URL (handles both Cloudinary and local files)
        const url = getDocumentUrl(file.filePath);
        if (url) {
          console.log('Opening document URL:', url);
          // For PDFs and images, open directly
          // For other files, try to open in new tab
          const fileExtension = file.name?.split('.').pop()?.toLowerCase();
          const isPdf = fileExtension === 'pdf' || file.type === 'application/pdf';
          const isImage = file.type?.startsWith('image/');

          if (isPdf || isImage) {
            // Open PDFs and images directly in new tab
            window.open(url, '_blank', 'noopener,noreferrer');
          } else {
            // For other files, try to download or open
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } else {
          setToast({ type: 'error', message: 'File not available for viewing.' });
        }
      } else if (file?.file) {
        // View local file
        const url = URL.createObjectURL(file.file);
        window.open(url, '_blank', 'noopener,noreferrer');
        // Optional: revoke after some delay
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } else {
        setToast({ type: 'error', message: 'File not available for viewing.' });
      }
    } catch (e) {
      console.error('Unable to open file preview', e);
      setToast({ type: 'error', message: 'Unable to open file preview. Please try downloading the file instead.' });
    }
  };

  const handleReplaceFile = (id, newFile) => {
    if (!newFile) return;

    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
            ...file,
            file: newFile,
            name: newFile.name,
            displayName: newFile.name,
            size: newFile.size,
            type: newFile.type,
            uploadedDate: new Date().toLocaleDateString(),
            category: getCategoryFromType(newFile.type),
          }
          : file
      )
    );
  };

  const categories = [
    'Employment Docs',
    'Bank Statements',
  ];

  const filteredFiles = getFilteredFiles();
  const groupedFiles = categories.reduce((acc, category) => {
    acc[category] = filteredFiles.filter((file) => file.category === category);
    return acc;
  }, {});

  const newFilesCount = files.filter((f) => f.isNew).length;

  return (
    <div className="space-y-6 relative">
      {/* Simple toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-50">
          <div
            className={`max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm ${toast.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
              }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{toast.message}</p>
              <button
                type="button"
                className="text-xs font-semibold opacity-70 hover:opacity-100"
                onClick={() => setToast(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Hero Header - unique design */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-blue-600 to-sky-500 text-white p-6 shadow-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full border border-white/20" />
          <div className="absolute -right-2 top-4 w-32 h-32 rounded-full border border-white/10" />
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium mb-3">
              <Upload className="w-3 h-3" />
              <span>Step 2 of 3 &mdash; Upload your tax documents</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Securely upload your tax documents
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-xl">
              Drag &amp; drop files, organize them by category, and let our team handle the rest.
              You can come back anytime to add more documents.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right text-xs text-white/80">
              <span>Encryption</span>
              <span className="font-semibold text-white">Bank-level security</span>
              <span className="mt-2">Max file size</span>
              <span className="font-semibold text-white">10 MB per file</span>
            </div>
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white/15 backdrop-blur">
              <FileText className="w-7 h-7 mb-1" />
              <span className="text-[11px] font-medium text-white/90 text-center">
                All docs in one place
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Year Filter */}
      {files.length > 0 && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-semibold text-gray-700">
                Filter by Year:
              </label>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="all">All Years</option>
              {getAvailableYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {/* Document Type Selection */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Document Type (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white hover:border-gray-400"
            >
              <option value="">Select Document Type</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              For
            </label>
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white hover:border-gray-400"
            >
              <option value="">Select Person</option>
              {personTypes.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedDocumentType ? (
          <p className="mt-3 text-sm text-gray-600">
            Selected: <span className="font-medium text-gray-900">{selectedDocumentType}</span>
            {selectedPerson && (
              <span className="ml-2">
                for <span className="font-medium text-gray-900">{selectedPerson}</span>
              </span>
            )}
          </p>
        ) : (
          <p className="mt-3 text-sm text-gray-500 italic">
            No type selected. Document will be uploaded as "Others".
          </p>
        )}
      </Card>

      {/* Upload Area */}
      <Card className={`border-2 border-dashed ${selectedDocumentType ? 'border-primary-500' : 'border-gray-300'
        }`}>
        <div
          className={`relative ${dragActive ? 'border-primary-500 bg-primary-50' : ''
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="text-center py-8">
            <Upload className={`mx-auto h-12 w-12 mb-4 text-primary-600`} />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              {selectedDocumentType ? `Upload ${selectedDocumentType}` : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {selectedDocumentType
                ? 'Select files to upload for this document type'
                : 'Click or drop files here to upload'}
            </p>
            <Button
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              Select Files
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
            </p>
          </div>
        </div>
      </Card>

      {/* Files List */}
      {filteredFiles.length > 0 && (
        <div className="space-y-6">
          {/* Client Uploaded Documents */}
          {(() => {
            const clientFiles = filteredFiles.filter(f => f.uploadedBy === 'client' || !f.uploadedBy);

            if (clientFiles.length > 0) {
              return (
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Documents Uploaded by You ({clientFiles.length}
                      {selectedYear !== 'all' && ` for ${selectedYear}`})
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {clientFiles.map((file) => {
                      const isImage = file.type?.startsWith('image/');
                      const isPdf = file.type === 'application/pdf';
                      const FileIcon = isImage ? Image : isPdf ? File : FileText;

                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.displayName || file.name}
                              </p>
                              <div className="flex items-center gap-4 mt-1 flex-wrap">
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Uploaded: {file.uploadedDate}
                                </p>
                                {file.documentType && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <p className="text-xs font-medium text-primary-600">
                                      {file.documentType}
                                    </p>
                                  </>
                                )}
                                {file.personType && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <p className="text-xs text-gray-500">
                                      {file.personType}
                                    </p>
                                  </>
                                )}
                                {file.isNew && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <p className="text-xs text-amber-600 font-medium">
                                      Not saved yet
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              className="hidden"
                              ref={(el) => {
                                if (el) {
                                  replaceInputRefs.current[file.id] = el;
                                }
                              }}
                              onChange={(e) =>
                                handleReplaceFile(file.id, e.target.files && e.target.files[0])
                              }
                            />
                            {!file.isNew && file.filePath && (
                              <button
                                type="button"
                                onClick={() => handleDownload(file)}
                                className="px-3 py-1.5 text-xs font-medium text-green-700 border border-green-100 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center gap-1"
                                title="Download document"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleViewFile(file)}
                              className="px-3 py-1.5 text-xs font-medium text-primary-700 border border-primary-100 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                            >
                              View
                            </button>
                            {file.isNew && (
                              <button
                                type="button"
                                onClick={() => {
                                  const input = replaceInputRefs.current[file.id];
                                  if (input) {
                                    input.click();
                                  }
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                Edit
                              </button>
                            )}
                            {file.isNew && (
                              <button
                                onClick={() => removeFile(file.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            }
            return null;
          })()}

        </div>
      )}

      {/* Save to backend */}
      {files.length > 0 && (
        <Card>
          <Button
            onClick={async () => {
              const newDocs = files.filter((f) => f.isNew);
              if (newDocs.length === 0) {
                setToast({ type: 'error', message: 'No new documents to save.' });
                return;
              }
              setIsSaving(true);
              try {
                for (const f of newDocs) {
                  const res = await documentService.uploadDocument({
                    documentType: f.documentType,
                    file: f.file,
                  });
                  if (res.success && res.data) {
                    f.isNew = false;
                    f.uploadedDate = new Date(res.data.createdAt).toLocaleDateString();
                    f.uploadedBy = res.data.uploadedBy || 'client';
                    f.filePath = res.data.filePath;
                  }
                }
                setFiles([...files]);
                setToast({
                  type: 'success',
                  message: 'Documents saved successfully. Our team can now see them in the admin panel.',
                });
              } catch (error) {
                console.error('Failed to save documents', error);
                setToast({
                  type: 'error',
                  message: 'Failed to save documents. Please try again.',
                });
              } finally {
                setIsSaving(false);
              }
            }}
            disabled={isSaving || files.every((f) => !f.isNew)}
            className="w-full"
          >
            {isSaving
              ? 'Saving...'
              : files.some((f) => f.isNew)
                ? 'Save new documents'
                : 'All documents are already saved'}
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No files uploaded yet</p>
            <p className="text-sm text-gray-400">
              Start by uploading your tax documents above
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Documents;
