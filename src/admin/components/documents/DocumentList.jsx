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
} from 'lucide-react';
import { clsx } from 'clsx';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
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
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState(null);

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
        No documents found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#E6F0F5]">
        <thead className="bg-[#F8FBFC] border-b border-[#DCEAF0]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Actions</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Document</th>
            {showUserColumn && <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">User</th>}
            <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Uploaded</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#E6F0F5]">
          {documents.map((doc) => {
            const StatusIcon = statusConfig[doc.status]?.icon || Clock;
            return (
              <tr key={doc.id} className="hover:bg-[#F8FBFC] transition-colors">
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        if (!onDownload) return;
                        const success = await onDownload(doc);
                        if (success) setDownloadSuccessDoc(doc);
                      }}
                      title="Download"
                      className="text-[#127EAB] hover:text-[#0E668B] hover:bg-[#E9F7FA]"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    {doc.status === 'PENDING' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-emerald-600 hover:bg-emerald-50"
                          onClick={() => onApprove?.(doc.id)}
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#EE6450] hover:bg-[#FEF4F2]"
                          onClick={() => onReject?.(doc.id)}
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3" >
                    <div className="w-9 h-9 bg-[#E9F7FA] border border-[#127EAB]/20 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#127EAB]" />
                    </div>
                    <div>
                      <p
                        className="font-medium text-xs sm:text-sm text-[#127EAB] cursor-pointer hover:underline"
                        onClick={() => onPreview?.(doc)}
                      >
                        {doc.fileName}
                      </p>
                      <p className="text-[11px] text-[#8BA0B2] font-medium">
                        {(doc.fileSize / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </td>
                {showUserColumn && (
                  <td className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#1F4264]">
                    {doc.user?.fullName || '-'}
                  </td>
                )}
                <td className="px-4 py-3.5 text-xs sm:text-sm text-[#6F7F8E] font-medium">
                  {DOCUMENT_TYPES[doc.documentType] || doc.documentType}
                </td>
                <td className="px-4 py-3.5">
                  <Badge color={statusConfig[doc.status]?.color || 'gray'} dot>
                    {doc.status}
                  </Badge>
                  {doc.status === 'REJECTED' && doc.rejectionReason && (
                    <p className="text-xs text-[#EE6450] mt-1">{doc.rejectionReason}</p>
                  )}
                </td>
                <td className="px-4 py-3.5 text-xs sm:text-sm text-[#6F7F8E] font-medium whitespace-nowrap">
                  {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Download Success Modal */}
      <Modal
        isOpen={!!downloadSuccessDoc}
        onClose={() => setDownloadSuccessDoc(null)}
        title=""
        size="sm"
        showClose={false}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-[#E9F7FA] border border-[#127EAB]/25 rounded-full flex items-center justify-center mx-auto mb-4 text-[#127EAB]">
            <CheckCircle className="w-8 h-8 text-[#127EAB]" />
          </div>
          <h3 className="text-xl font-semibold text-[#1F4264] mb-2">Download Complete!</h3>
          <p className="text-sm text-[#6F7F8E] mb-6">
            The document <span className="font-semibold text-[#1F4264]">{downloadSuccessDoc?.fileName}</span> has been saved to your device.
          </p>
          <Button
            className="w-full justify-center"
            onClick={() => setDownloadSuccessDoc(null)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentList;

