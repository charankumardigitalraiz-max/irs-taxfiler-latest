import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  Eye,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { documentService } from '../services/documentService';
import { baseUrl } from '../../baseurl';
import { useToast } from '../../admin/hooks/useToast';

const FinalReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  useEffect(() => {
    const fetchFinalCopies = async () => {
      try {
        setLoading(true);
        const res = await documentService.getMyDocuments();
        // Filter only admin-uploaded FINAL_COPY documents (uploaded from filing section)
        const finalCopies = (res.data || []).filter(
          doc => {
            const isAdminUpload = doc.uploadedBy === 'admin' || doc.uploadedBy === 'ADMIN';
            const isFinalCopy = doc.documentType === 'FINAL_COPY' || doc.documentType === 'Final Copy';
            return isAdminUpload && isFinalCopy;
          }
        );
        
        // Sort by creation date (newest first)
        finalCopies.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.uploadedAt || 0);
          const dateB = new Date(b.createdAt || b.uploadedAt || 0);
          return dateB - dateA;
        });
        
        const mappedReports = finalCopies.map((doc) => {
          // Handle status case-insensitively
          const status = (doc.status || '').toLowerCase();
          const isCompleted = status === 'approved' || status === 'completed';
          
          return {
            id: doc._id || doc.id,
            taxYear: new Date(doc.createdAt || doc.uploadedAt || Date.now()).getFullYear().toString(),
            type: doc.fileName || doc.name || 'Final Copy',
            status: isCompleted ? 'Completed' : 'Pending',
            filedDate: new Date(doc.createdAt || doc.uploadedAt || Date.now()).toLocaleDateString(),
            downloadUrl: doc.filePath || doc.url,
            filePath: doc.filePath || doc.url,
            fileName: doc.fileName || doc.name,
          };
        });
        setReports(mappedReports);
      } catch (error) {
        console.error('Failed to load final reports', error);
        showError('Failed to load final reports. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchFinalCopies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDownload = async (report) => {
    try {
      if (report.filePath) {
        const url = getDocumentUrl(report.filePath);
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
          a.download = report.fileName || report.type || 'document';
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

  const handleViewFile = (report) => {
    try {
      if (report.filePath) {
        const url = getDocumentUrl(report.filePath);
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Final Reports</h2>
        <p className="text-sm text-gray-600">
          Download your completed tax filing documents and reports.
        </p>
      </div>

      {loading ? (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
              <p className="text-gray-500 mt-4">Loading final reports...</p>
            </div>
          </Card.Content>
        </Card>
      ) : reports.length > 0 ? (
        <Card>
          <Card.Header>
            <Card.Title>Tax Filing Reports</Card.Title>
            <Card.Description>Download your completed tax returns and final copies uploaded by your tax preparer</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tax Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Document Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Uploaded Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            {report.taxYear}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{report.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          color={report.status === 'Completed' ? 'green' : 'yellow'}
                          size="sm"
                        >
                          {report.status === 'Completed' ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {report.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {report.filedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {report.filePath ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleViewFile(report)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="primary"
                              onClick={() => handleDownload(report)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Not Available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>
      ) : (
        <Card>
          <Card.Content>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No final reports available</p>
              <p className="text-sm text-gray-400">
                Final copies uploaded by your tax preparer in the admin panel will appear here.
              </p>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default FinalReports;

