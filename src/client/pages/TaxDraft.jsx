import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Image,
  File,
} from 'lucide-react';
import Card from '../components/common/Card';
import { documentService } from '../services/documentService';
import { userService } from '../services/userService';
import { baseUrl } from '../../baseurl';
import { useToast } from '../../admin/hooks/useToast';

const TaxDraft = () => {
  const [documents, setDocuments] = useState([]);
  const [taxPrep, setTaxPrep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const { showError } = useToast();

  // Load admin-uploaded documents and tax prep data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch documents and profile in parallel
        const [docsRes, profileRes] = await Promise.all([
          documentService.getMyDocuments(),
          userService.getProfile()
        ]);

        // Handle documents
        const adminDocs = (docsRes.data || []).filter(doc => doc.uploadedBy === 'admin');
        const docs = adminDocs.map((d) => ({
          id: d._id,
          name: d.fileName,
          displayName: d.fileName,
          size: d.fileSize || 0,
          type: d.mimeType || '',
          uploadedDate: new Date(d.createdAt).toLocaleDateString(),
          uploadedYear: new Date(d.createdAt).getFullYear(),
          documentType: d.documentType,
          category: getCategoryFromType(d.mimeType || ''),
          filePath: d.filePath,
        }));
        setDocuments(docs);

        // Handle tax preparation data
        if (profileRes.success && profileRes.data.taxPreparation) {
          setTaxPrep(profileRes.data.taxPreparation);
        }
      } catch (error) {
        console.error('Failed to load tax draft data', error);
        showError('Failed to load tax draft data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotal = (data) => {
    if (!data || !Array.isArray(data)) return 0;
    return data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const getCategoryFromType = (type) => {
    if (type.includes('image') || type.includes('pdf')) {
      return 'Personal ID';
    }
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return 'Employment Docs';
    }
    return 'Additional Supporting Docs';
  };

  const getDocumentUrl = (filePath) => {
    if (!filePath) return null;
    // Check if it's already a full URL (e.g., Cloudinary URL)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // Otherwise, prepend the base URL for local files
    if (filePath.startsWith('/')) {
      return `${baseUrl}${filePath}`;
    }
    return `${baseUrl}/${filePath}`;
  };

  const handleDownload = async (file) => {
    try {
      if (file.filePath) {
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
          showError('File not available for download.');
        }
      } else {
        showError('File not available for download.');
      }
    } catch (error) {
      console.error('Download error:', error);
      showError('Failed to download file. Please try again.');
    }
  };

  const handleViewFile = (file) => {
    try {
      if (file.filePath) {
        const url = getDocumentUrl(file.filePath);
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          showError('File not available for viewing.');
        }
      } else {
        showError('File not available for viewing.');
      }
    } catch (e) {
      console.error('Unable to open file preview', e);
      showError('Unable to open file preview. Please try downloading the file instead.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Filter files by selected year
  const getFilteredFiles = () => {
    if (!selectedYear || selectedYear === 'all') return documents;
    return documents.filter(f => f.uploadedYear === parseInt(selectedYear));
  };

  // Get available years from documents
  const getAvailableYears = () => {
    const years = [...new Set(documents.map(f => f.uploadedYear).filter(Boolean))].sort((a, b) => b - a);
    return years;
  };

  const filteredFiles = getFilteredFiles();
  const categories = [
    'Personal ID',
    'Employment Docs',
    'Bank Statements',
    'Additional Supporting Docs',
  ];
  const groupedFiles = categories.reduce((acc, category) => {
    acc[category] = filteredFiles.filter((file) => file.category === category);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-blue-600 to-sky-500 text-white p-6 shadow-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full border border-white/20" />
          <div className="absolute -right-2 top-4 w-32 h-32 rounded-full border border-white/10" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium mb-3">
            <FileText className="w-3 h-3" />
            <span>Tax Draft Documents</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Tax Draft Summary & Documents
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-xl">
            Review your tax calculation summary and draft documents prepared by our team.
          </p>
        </div>
      </div>

      {/* Tax Preparation Summary Tables */}
      {taxPrep && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* STD DRAFT */}
          <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 py-3 text-center border-b">
              <h3 className="text-lg font-bold text-gray-800 uppercase italic">STD DRAFT</h3>
            </div>
            <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
              <div className="w-2/3 px-3 py-2 border-r border-gray-300">Description</div>
              <div className="w-1/3 px-3 py-2">Refund/(Owe)</div>
            </div>
            <div className="flex-1 divide-y divide-gray-200">
              {(taxPrep.stdDraft || []).map((row, idx) => (
                <div key={idx} className="flex">
                  <div className="w-2/3 px-3 py-2 text-sm text-gray-700 border-r border-gray-200 min-h-[40px] flex items-center">
                    {row.description || '-'}
                  </div>
                  <div className="w-1/3 px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                    {row.amount ? `$${row.amount}` : '-'}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex bg-gray-100 font-bold border-t border-gray-200 text-gray-900 text-sm">
              <div className="w-2/3 px-3 py-2 border-r border-gray-300">Total</div>
              <div className="w-1/3 px-3 py-2">${calculateTotal(taxPrep.stdDraft)}</div>
            </div>
          </div>

          {/* Tax Planning */}
          <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 py-3 text-center border-b">
              <h3 className="text-lg font-bold text-gray-800 uppercase italic">Tax Planning</h3>
            </div>
            <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
              <div className="w-2/3 px-3 py-2 border-r border-gray-300">Description</div>
              <div className="w-1/3 px-3 py-2">Refund</div>
            </div>
            <div className="flex-1 divide-y divide-gray-200">
              {(taxPrep.taxPlanning || []).map((row, idx) => (
                <div key={idx} className="flex">
                  <div className="w-2/3 px-3 py-2 text-sm text-gray-700 border-r border-gray-200 min-h-[40px] flex items-center">
                    {row.description || '-'}
                  </div>
                  <div className="w-1/3 px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                    {row.amount ? `$${row.amount}` : '-'}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex bg-gray-100 font-bold border-t border-gray-200 text-gray-900 text-sm">
              <div className="w-2/3 px-3 py-2 border-r border-gray-200">Total</div>
              <div className="w-1/3 px-3 py-2">${calculateTotal(taxPrep.taxPlanning)}</div>
            </div>
          </div>

          {/* Benefit */}
          <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 py-3 text-center border-b">
              <h3 className="text-lg font-bold text-gray-800 uppercase italic">Benefit</h3>
            </div>
            <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
              <div className="w-2/3 px-3 py-2 border-r border-gray-300">Description</div>
              <div className="w-1/3 px-3 py-2">Refund</div>
            </div>
            <div className="flex-1 divide-y divide-gray-200">
              {(taxPrep.benefit || []).map((row, idx) => (
                <div key={idx} className="flex">
                  <div className="w-2/3 px-3 py-2 text-sm text-gray-700 border-r border-gray-200 min-h-[40px] flex items-center">
                    {row.description || '-'}
                  </div>
                  <div className="w-1/3 px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                    {row.amount ? `$${row.amount}` : '-'}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex bg-gray-100 font-bold border-t border-gray-200 text-gray-900 text-sm">
              <div className="w-2/3 px-3 py-2 border-r border-gray-200">Total</div>
              <div className="w-1/3 px-3 py-2">${calculateTotal(taxPrep.benefit)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Year Filter */}
      {documents.length > 0 && (
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

      {/* Documents List */}
      {loading ? (
        <Card>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading documents...</p>
          </div>
        </Card>
      ) : filteredFiles.length > 0 ? (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-1 rounded-full bg-blue-600"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Tax Draft Documents ({filteredFiles.length}
              {selectedYear !== 'all' && ` for ${selectedYear}`})
            </h3>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
              Admin Upload
            </span>
          </div>

          <div className="space-y-6">
            {categories.map((category) => {
              const categoryFiles = groupedFiles[category] || [];
              if (categoryFiles.length === 0) return null;

              return (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {categoryFiles.map((file) => {
                      const isImage = file.type?.startsWith('image/');
                      const isPdf = file.type === 'application/pdf';
                      const FileIcon = isImage ? Image : isPdf ? File : FileText;

                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {file.displayName || file.name}
                                </p>
                                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                                  Admin
                                </span>
                              </div>
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
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.filePath && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleDownload(file)}
                                  className="px-3 py-1.5 text-xs font-medium text-green-700 border border-green-100 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center gap-1"
                                  title="Download document"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleViewFile(file)}
                                  className="px-3 py-1.5 text-xs font-medium text-primary-700 border border-primary-100 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                                >
                                  View
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-12">
            <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No tax draft documents available</p>
            <p className="text-sm text-gray-400">
              Tax draft documents uploaded by your preparer will appear here
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TaxDraft;

