import { useState } from 'react';
import { format } from 'date-fns';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
  X,
} from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { DOCUMENT_TYPES } from '../../utils/constants';

const statusConfig = {
  PENDING: { color: 'yellow', icon: Clock },
  APPROVED: { color: 'green', icon: CheckCircle },
  REJECTED: { color: 'red', icon: XCircle },
};

const UserDocumentsModal = ({ 
  isOpen, 
  onClose, 
  user, 
  documents, 
  onApprove, 
  onReject, 
  onDelete,
  onDownload,
  onPreview,
}) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState(null);

  const filteredDocuments = documents.filter((doc) => {
    return !statusFilter || doc.status === statusFilter;
  });

  const stats = {
    total: documents.length,
    pending: documents.filter((d) => d.status === 'PENDING').length,
    approved: documents.filter((d) => d.status === 'APPROVED').length,
    rejected: documents.filter((d) => d.status === 'REJECTED').length,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Documents - ${user?.fullName || 'User'}`}
      description={`View all documents uploaded by this user`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-lg font-semibold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-500">Approved</p>
            <p className="text-lg font-semibold text-green-600">{stats.approved}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-gray-500">Rejected</p>
            <p className="text-lg font-semibold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Documents List */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No documents found
            </div>
          ) : (
            filteredDocuments.map((doc) => {
              const StatusIcon = statusConfig[doc.status]?.icon || Clock;
              return (
                <div
                  key={doc.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.fileName}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {DOCUMENT_TYPES[doc.documentType] || doc.documentType}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(doc.fileSize / 1024).toFixed(1)} KB
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        {doc.status === 'REJECTED' && doc.rejectionReason && (
                          <p className="text-xs text-red-600 mt-1">{doc.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <Badge color={statusConfig[doc.status]?.color || 'gray'} size="sm" dot>
                        {doc.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {doc.filePath && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onPreview?.(doc)}
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={async () => {
                                if (!onDownload) return;
                                const success = await onDownload(doc);
                                if (success) setDownloadSuccessDoc(doc);
                              }}
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {doc.status === 'PENDING' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-600 hover:bg-green-50"
                              onClick={() => onApprove?.(doc.id)}
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => onReject?.(doc.id)}
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => onDelete?.(doc.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Download Success Modal */}
      <Modal
        isOpen={!!downloadSuccessDoc}
        onClose={() => setDownloadSuccessDoc(null)}
        title=""
        size="sm"
        showClose={false}
      >
        <div className="text-center p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Complete!</h3>
          <p className="text-gray-500 mb-8">
            The document <span className="font-medium text-gray-900">{downloadSuccessDoc?.fileName}</span> has been saved to your device.
          </p>
          <Button
            className="w-full justify-center"
            onClick={() => setDownloadSuccessDoc(null)}
          >
            Awesome!
          </Button>
        </div>
      </Modal>
    </Modal>
  );
};

export default UserDocumentsModal;

