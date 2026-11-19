import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Search, Filter, Download, Clock, User, FileText, RefreshCw, Trash2, AlertTriangle, ChevronDown } from 'lucide-react';
import Modal from '../../components/common/Modal';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { auditService } from '../../services/auditService';
import { useToast } from '../../hooks/useToast';

const actionColors = {
  STATUS_CHANGE: 'blue',
  WORKFLOW_OVERRIDE: 'orange',
  DOCUMENT_APPROVED: 'green',
  DOCUMENT_REJECTED: 'red',
  PAYMENT_CONFIRMED: 'green',
  MEETING_SCHEDULED: 'purple',
  TAX_PREP_COMPLETED: 'green',
  E_FILING_SUBMITTED: 'blue',
  USER_ASSIGNED: 'purple',
  LOGIN: 'green',
  UPDATE_PROFILE: 'blue',
  UPDATE_PASSWORD: 'orange',
};

const ACTIONS = Object.keys(actionColors);
const ENTITIES = ['USER', 'DOCUMENT', 'PAYMENT', 'MEETING', 'TAX_PREPARATION', 'FILING', 'AUTH', 'SECURITY'];

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, logId: null, isBulk: false });
  const [selectedLogs, setSelectedLogs] = useState([]);
  const { showError, showSuccess } = useToast();

  const fetchLogs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        searchTerm,
        action: actionFilter,
        entityType: entityFilter,
      };
      const res = await auditService.getLogs(params);
      if (res.success) {
        setLogs(res.data);
        setPagination(res.pagination);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      showError('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, actionFilter, entityFilter, pagination.limit, showError]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (deleteModal.isBulk) {
        await auditService.bulkDeleteLogs(selectedLogs);
        showSuccess('Selected logs deleted successfully');
        setSelectedLogs([]);
      } else {
        await auditService.deleteLog(deleteModal.logId);
        showSuccess('Audit log deleted successfully');
      }
      setDeleteModal({ isOpen: false, logId: null, isBulk: false });
      fetchLogs(pagination.page);
    } catch (error) {
      console.error('Error deleting log:', error);
      showError('Failed to delete audit log');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLogs.length === logs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(logs.map(log => log._id));
    }
  };

  const toggleSelectLog = (id) => {
    setSelectedLogs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs(1);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, actionFilter, entityFilter]);

  return (
    <div>
      <Header
        title="Audit Logs"
        subtitle="Track all administrative actions and changes"
        actions={
          <div className="flex gap-2">
            {selectedLogs.length > 0 && (
              <Button
                variant="danger"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => setDeleteModal({ isOpen: true, logId: null, isBulk: true })}
                disabled={loading}
              >
                Delete Selected ({selectedLogs.length})
              </Button>
            )}
            <Button
              variant="secondary"
              leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
              onClick={() => fetchLogs(1)}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
              Export Logs
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Filters */}
        <Card padding="none">
          <div className="p-4 sm:p-5 border-b border-[#E6F0F5] bg-white flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="relative w-full sm:w-64 md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2]" />
              <input
                type="text"
                placeholder="Search by entity or admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2] transition-all shadow-xs"
              />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
              <div className="relative w-full sm:w-44 shrink-0">
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-9 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] transition-all cursor-pointer appearance-none shadow-xs"
                >
                  <option value="">All Actions</option>
                  {ACTIONS.map((action) => (
                    <option key={action} value={action}>
                      {action.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2] pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-44 shrink-0">
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-9 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] transition-all cursor-pointer appearance-none shadow-xs"
                >
                  <option value="">All Entities</option>
                  {ENTITIES.map((entity) => (
                    <option key={entity} value={entity}>
                      {entity}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Logs List */}
          <div className="divide-y divide-[#E6F0F5] min-h-[400px]">
            {logs.length > 0 && (
              <div className="px-4 py-2.5 bg-[#F8FBFC] border-b border-[#DCEAF0] flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#127EAB] rounded border-[#CCDCE1] focus:ring-[#127EAB] cursor-pointer"
                  checked={logs.length > 0 && selectedLogs.length === logs.length}
                  onChange={toggleSelectAll}
                />
                <span className="text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Select All</span>
              </div>
            )}
            {loading && logs.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-[#6F7F8E]">
                <RefreshCw className="w-8 h-8 animate-spin text-[#127EAB] mr-3" />
                <span>Loading audit logs...</span>
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
                No audit logs found
              </div>
            ) : (
              logs.map((log) => (
                <div key={log._id} className={`p-4 sm:p-5 hover:bg-[#F4F9FB]/60 transition-colors flex items-start gap-3.5 ${loading ? 'opacity-50' : ''}`}>
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-[#127EAB] rounded border-[#CCDCE1] focus:ring-[#127EAB] cursor-pointer"
                    checked={selectedLogs.includes(log._id)}
                    onChange={() => toggleSelectLog(log._id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 flex-1">
                        <div className="w-10 h-10 bg-[#E9F7FA] border border-[#127EAB]/20 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#127EAB]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge color={actionColors[log.action] || 'gray'} size="sm">
                              {log.action?.replace(/_/g, ' ')}
                            </Badge>
                            <span className="text-xs text-[#8BA0B2]">on</span>
                            <Badge color="gray" size="sm">
                              {log.module}
                            </Badge>
                          </div>
                          <p className="font-semibold text-sm sm:text-base text-[#1F4264] mt-1 truncate">
                            {log.entityName || log.details}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, logId: log._id, isBulk: false })}
                        className="p-1.5 text-[#8BA0B2] hover:text-[#EE6450] hover:bg-[#FEF4F2] rounded-md transition-colors cursor-pointer"
                        title="Delete Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Changes */}
                    {(log.oldValues || log.newValues) && (
                      <div className="mt-2 text-sm">
                        {log.oldValues && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">From:</span>
                            <code className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs">
                              {JSON.stringify(log.oldValues)}
                            </code>
                          </div>
                        )}
                        {log.newValues && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500">To:</span>
                            <code className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs">
                              {JSON.stringify(log.newValues)}
                            </code>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {log.adminId?.fullName || 'System'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(log.createdAt), 'MMM d, yyyy h:mm a')}
                      </div>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50/50">
              <div className="text-sm text-gray-500">
                Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                <span className="font-medium">{pagination.pages}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={pagination.page <= 1 || loading}
                  onClick={() => fetchLogs(pagination.page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={pagination.page >= pagination.pages || loading}
                  onClick={() => fetchLogs(pagination.page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, logId: null, isBulk: false })}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-semibold text-lg">Are you sure?</span>
          </div>
          <p className="text-gray-600">
            {deleteModal.isBulk
              ? `You are about to delete ${selectedLogs.length} audit logs. This action cannot be undone.`
              : 'You are about to delete this audit log entry. This action cannot be undone.'}
          </p>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, logId: null, isBulk: false })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={loading}
            >
              {deleteModal.isBulk ? 'Delete Selected' : 'Delete Log'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};


export default AuditLogs;

