import { useState, useMemo, useEffect } from 'react';
import { Search, Eye, FileText, Mail, Phone } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import UserDocumentsModal from '../../components/documents/UserDocumentsModal';
import DocumentUpload from '../../components/documents/DocumentUpload';
import { documentService } from '../../services/documentService';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';
import { baseUrl as backendBaseUrl } from '../../../baseurl';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserDocumentsModal, setShowUserDocumentsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUploadUserId, setSelectedUploadUserId] = useState('');
  const { showSuccess, showError } = useToast();

  // Load documents and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, userRes] = await Promise.all([
          documentService.getDocuments(),
          userService.getUsers({ userType: 'registered' }),
        ]);

        const docs = (docRes.data || []).map((d) => ({
          id: d._id,
          userId: d.user?.userId || d.user?._id,
          user: {
            fullName: d.user?.fullName || '',
            email: d.user?.email || '',
            phone: d.user?.mobileNumber || '',
          },
          fileName: d.fileName,
          documentType: d.documentType,
          fileSize: d.fileSize || 0,
          status: d.status ? d.status.toUpperCase() : 'PENDING',
          rejectionReason: d.rejectionReason || null,
          createdAt: d.createdAt,
          filePath: d.filePath || '', // Cloudinary URL for preview/download
        }));

        setDocuments(docs);

        const userList = (userRes.data || []).map((u) => ({
          id: u._id,
          fullName: u.fullName || u.email,
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error loading documents:', error);
        showError('Failed to load documents. Please try again.');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group documents by user
  const usersWithDocuments = useMemo(() => {
    const userMap = new Map();
    
    documents.forEach((doc) => {
      const userId = doc.userId;
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          id: userId,
          fullName: doc.user?.fullName || 'Unknown User',
          email: doc.user?.email || '',
          phone: doc.user?.phone || '',
          documents: [],
          totalDocuments: 0,
          pendingDocuments: 0,
          approvedDocuments: 0,
          rejectedDocuments: 0,
        });
      }
      const user = userMap.get(userId);
      user.documents.push(doc);
      user.totalDocuments++;
      if (doc.status === 'PENDING') user.pendingDocuments++;
      if (doc.status === 'APPROVED') user.approvedDocuments++;
      if (doc.status === 'REJECTED') user.rejectedDocuments++;
    });
    
    return Array.from(userMap.values());
  }, [documents]);

  // Filter users by search
  const filteredUsers = usersWithDocuments.filter((user) => {
    const matchesSearch =
      !userSearch ||
      user.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(userSearch.toLowerCase()));
    return matchesSearch;
  });

  const handleViewUserDocuments = (user) => {
    setSelectedUser(user);
    setShowUserDocumentsModal(true);
  };

  const handleApprove = async (id) => {
    try {
      await documentService.updateStatus(id, 'APPROVED', null);
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === id ? { ...doc, status: 'APPROVED', rejectionReason: null } : doc
        )
      );
      showSuccess('Document approved successfully');
    } catch (error) {
      console.error('Error approving document:', error);
      showError('Failed to approve document. Please try again.');
    }
  };

  const handleReject = (id) => {
    setSelectedDocId(id);
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    try {
      await documentService.updateStatus(selectedDocId, 'REJECTED', rejectReason);
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDocId
            ? { ...doc, status: 'REJECTED', rejectionReason: rejectReason }
            : doc
        )
      );
      showSuccess('Document rejected');
      setShowRejectModal(false);
      setSelectedDocId(null);
      setRejectReason('');
    } catch (error) {
      console.error('Error rejecting document:', error);
      showError('Failed to reject document. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await documentService.deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      showSuccess('Document deleted');
    } catch (error) {
      console.error('Error deleting document:', error);
      showError('Failed to delete document. Please try again.');
    }
  };

  const handleUpload = async (data) => {
    try {
      const res = await documentService.createDocument({
        userId: data.userId,
        documentType: data.documentType,
        file: data.file,
      });

      if (res.success && res.data) {
        const d = res.data;
        const newDoc = {
          id: d._id,
          userId: d.user?.userId || d.user?._id || data.userId,
          user: {
            fullName: d.user?.fullName || users.find((u) => u.id === data.userId)?.fullName || '',
            email: d.user?.email || '',
            phone: d.user?.mobileNumber || '',
          },
          fileName: d.fileName,
          documentType: d.documentType,
          fileSize: d.fileSize || 0,
          status: d.status ? d.status.toUpperCase() : 'PENDING',
          rejectionReason: d.rejectionReason || null,
          createdAt: d.createdAt,
          filePath: d.filePath || '', // Cloudinary URL
        };
        setDocuments((prev) => [newDoc, ...prev]);
        showSuccess('Document uploaded successfully');
      } else {
        showError(res.message || 'Failed to upload document');
      }
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading document:', error);
      showError('Failed to upload document. Please try again.');
    }
  };

  const stats = {
    totalUsers: usersWithDocuments.length,
    totalDocuments: documents.length,
    pending: documents.filter((d) => d.status === 'PENDING').length,
    approved: documents.filter((d) => d.status === 'APPROVED').length,
    rejected: documents.filter((d) => d.status === 'REJECTED').length,
  };

  return (
    <div>
      <Header
        title="Documents"
        subtitle="Manage all uploaded documents by user"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Documents</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </Card>
        </div>

        {/* Users List */}
        <Card padding="none">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          {/* User List */}
          <div className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-700">
                            {user.fullName?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-medium text-gray-900">
                              {user.fullName}
                            </p>
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              ID: {user.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {user.email && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </div>
                            )}
                            {user.phone && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Phone className="w-3 h-3" />
                                {user.phone}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {user.totalDocuments} document{user.totalDocuments !== 1 ? 's' : ''}
                              </span>
                            </div>
                            {user.pendingDocuments > 0 && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                                {user.pendingDocuments} pending
                              </span>
                            )}
                            {user.approvedDocuments > 0 && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {user.approvedDocuments} approved
                              </span>
                            )}
                            {user.rejectedDocuments > 0 && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                {user.rejectedDocuments} rejected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUserDocuments(user)}
                        leftIcon={<Eye className="w-4 h-4" />}
                      >
                        View Documents
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
        description="Upload a document on behalf of a user"
        size="md"
      >
        <div className="mb-4">
          <label className="label">Select User *</label>
          <select
            className="input"
            value={selectedUploadUserId}
            onChange={(e) => setSelectedUploadUserId(e.target.value)}
          >
            <option value="">Select user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>
        </div>
        <DocumentUpload
          onUpload={(data) => {
            if (!selectedUploadUserId) {
              showError('Please select a user before uploading.');
              return;
            }
            handleUpload({ ...data, userId: selectedUploadUserId });
          }}
        />
      </Modal>

      {/* User Documents Modal */}
      <UserDocumentsModal
        isOpen={showUserDocumentsModal}
        onClose={() => {
          setShowUserDocumentsModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        documents={selectedUser?.documents || []}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        onDownload={async (doc) => {
          try {
            if (!doc.filePath) {
              showError('No file URL available for this document.');
              return false;
            }
            // If filePath is a relative path, prefix it with backend base URL (without /api)
            let fileUrl = doc.filePath;
            if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
              const apiUrl = backendBaseUrl + '/api';
              // Remove /api from the end if present to get base URL
              const apiBase = apiUrl.replace(/\/api$/, '');
              fileUrl = `${apiBase}${fileUrl}`;
            }
            
            // Fetch the file as a blob to handle CORS and ensure download works
            const response = await fetch(fileUrl);
            if (!response.ok) {
              throw new Error('Failed to fetch file');
            }
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            // Create download link
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = doc.fileName || 'document';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Clean up blob URL after a delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
            return true;
          } catch (error) {
            console.error('Download error:', error);
            showError('Failed to download file. Please try again.');
            return false;
          }
        }}
        onPreview={(doc) => {
          if (!doc.filePath) {
            showError('No file URL available for this document.');
            return;
          }
          // If filePath is a relative path, prefix it with backend base URL (without /api)
          let fileUrl = doc.filePath;
          if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
             const apiUrl = backendBaseUrl + '/api';
            // const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
            // Remove /api from the end if present to get base URL
            const apiBase = apiUrl.replace(/\/api$/, '');
            fileUrl = `${apiBase}${fileUrl}`;
          }
          window.open(fileUrl, '_blank', 'noopener,noreferrer');
        }}
      />

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Document"
        description="Please provide a reason for rejection"
      >
        <textarea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          className="input resize-none"
          rows={4}
          placeholder="Enter rejection reason..."
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmReject} disabled={!rejectReason.trim()}>
            Reject Document
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Documents;

