import { format } from 'date-fns';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
} from 'lucide-react';
import { clsx } from 'clsx';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { DOCUMENT_STATUS, DOCUMENT_TYPES } from '../../utils/constants';

const statusConfig = {
  PENDING: { color: 'yellow', icon: Clock },
  APPROVED: { color: 'green', icon: CheckCircle },
  REJECTED: { color: 'red', icon: XCircle },
};

const DocumentList = ({ 
  documents, 
  onApprove, 
  onReject, 
  onDownload, 
  onPreview,
  onDelete,
  showUserColumn = true,
}) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No documents found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-header">Document</th>
            {showUserColumn && <th className="table-header">User</th>}
            <th className="table-header">Type</th>
            <th className="table-header">Status</th>
            <th className="table-header">Uploaded</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => {
            const StatusIcon = statusConfig[doc.status]?.icon || Clock;
            return (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.fileName}</p>
                      <p className="text-xs text-gray-500">
                        {(doc.fileSize / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </td>
                {showUserColumn && (
                  <td className="table-cell">
                    <span className="text-gray-900">{doc.user?.fullName || '-'}</span>
                  </td>
                )}
                <td className="table-cell">
                  <span className="text-gray-600">
                    {DOCUMENT_TYPES[doc.documentType] || doc.documentType}
                  </span>
                </td>
                <td className="table-cell">
                  <Badge color={statusConfig[doc.status]?.color || 'gray'} dot>
                    {doc.status}
                  </Badge>
                  {doc.status === 'REJECTED' && doc.rejectionReason && (
                    <p className="text-xs text-red-600 mt-1">{doc.rejectionReason}</p>
                  )}
                </td>
                <td className="table-cell">
                  <span className="text-gray-500">
                    {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-1">
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
                      onClick={() => onDownload?.(doc)}
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;

