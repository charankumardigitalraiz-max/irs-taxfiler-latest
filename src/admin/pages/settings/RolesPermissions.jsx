import { useState, useEffect, useRef } from 'react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';
import { useToast } from '../../hooks/useToast';
import roleService from '../../services/roleService';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  LayoutDashboard,
  Users,
  FileText,
  PhoneCall,
  FolderOpen,
  Mail,
  History,
  LifeBuoy,
  Tag,
  Share2,
  Settings as SettingsIcon,
  ShieldCheck,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PERMISSIONS } from '../../utils/permissions';

// Define categories based on PERMISSIONS constant
const permissionCategories = {
  Dashboard: {
    label: 'Dashboard',
    permissions: [PERMISSIONS.VIEW_DASHBOARD]
  },
  Users: {
    label: 'Users',
    permissions: [
      PERMISSIONS.VIEW_UNVERIFIED_USERS,
      PERMISSIONS.VIEW_VERIFIED_USERS,
      PERMISSIONS.VIEW_REGISTERED_USERS
    ]
  },
  Forms: {
    label: 'Forms',
    permissions: [
      PERMISSIONS.VIEW_OPT_OUT_FORMS,
      PERMISSIONS.VIEW_CONNECT_EXPERT_FORMS,
      PERMISSIONS.VIEW_CONTACT_FORMS,
      PERMISSIONS.VIEW_REFER_EARN_FORMS
    ]
  },
  'Free to Call': {
    label: 'Free to Call',
    permissions: [PERMISSIONS.VIEW_MEETINGS]
  },
  Documents: {
    label: 'Documents',
    permissions: [PERMISSIONS.VIEW_DOCUMENTS]
  },
  Email: {
    label: 'Email',
    permissions: [PERMISSIONS.VIEW_EMAIL]
  },
  'Audit Logs': {
    label: 'Audit Logs',
    permissions: [PERMISSIONS.VIEW_AUDIT_LOGS]
  },
  Support: {
    label: 'Support',
    permissions: [PERMISSIONS.VIEW_SUPPORT]
  },
  Coupons: {
    label: 'Coupons',
    permissions: [PERMISSIONS.VIEW_COUPONS]
  },
  Referrals: {
    label: 'Referrals',
    permissions: [PERMISSIONS.VIEW_REFERRALS]
  },
  Settings: {
    label: 'Settings',
    permissions: [
      PERMISSIONS.VIEW_STAFF_MANAGEMENT,
      PERMISSIONS.VIEW_ROLES_PERMISSIONS,
      PERMISSIONS.VIEW_CONTENT_SETTINGS
    ]
  }
};

const categoryIcons = {
  Dashboard: LayoutDashboard,
  Users: Users,
  Forms: FileText,
  'Free to Call': PhoneCall,
  Documents: FolderOpen,
  Email: Mail,
  'Audit Logs': History,
  Support: LifeBuoy,
  Coupons: Tag,
  Referrals: Share2,
  Settings: SettingsIcon,
};

// Helper to get clean labels for the UI
const getPermissionLabel = (perm) => {
  const labels = {
    [PERMISSIONS.VIEW_DASHBOARD]: 'Dashboard',
    [PERMISSIONS.VIEW_UNVERIFIED_USERS]: 'Unverified',
    [PERMISSIONS.VIEW_VERIFIED_USERS]: 'Verified',
    [PERMISSIONS.VIEW_REGISTERED_USERS]: 'Registered',
    [PERMISSIONS.VIEW_OPT_OUT_FORMS]: 'Opt-Out Requests',
    [PERMISSIONS.VIEW_CONNECT_EXPERT_FORMS]: 'Connect Expert',
    [PERMISSIONS.VIEW_CONTACT_FORMS]: 'Contact Messages',
    [PERMISSIONS.VIEW_REFER_EARN_FORMS]: 'Refer & Earn',
    [PERMISSIONS.VIEW_MEETINGS]: 'Free to Call',
    [PERMISSIONS.VIEW_DOCUMENTS]: 'Documents',
    [PERMISSIONS.VIEW_EMAIL]: 'Email',
    [PERMISSIONS.VIEW_AUDIT_LOGS]: 'Audit Logs',
    [PERMISSIONS.VIEW_SUPPORT]: 'Support',
    [PERMISSIONS.VIEW_COUPONS]: 'Coupons',
    [PERMISSIONS.VIEW_REFERRALS]: 'Referrals',
    [PERMISSIONS.VIEW_STAFF_MANAGEMENT]: 'Staff Management',
    [PERMISSIONS.VIEW_ROLES_PERMISSIONS]: 'Roles & Permissions',
    [PERMISSIONS.VIEW_CONTENT_SETTINGS]: 'Content Settings',
  };
  return labels[perm] || perm.split('_').join(' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {}, // Structure: { [permissionKey]: true/false }
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabsRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  const allPermissionsList = Object.values(permissionCategories).flatMap(c => c.permissions);
  const totalEnabledCount = allPermissionsList.filter(p => formData.permissions?.[p]).length;
  const totalAvailableCount = allPermissionsList.length;

  const toggleAllGlobal = (enabled) => {
    setFormData(prev => {
      const newPermissions = { ...prev.permissions };
      allPermissionsList.forEach(perm => {
        newPermissions[perm] = enabled;
      });
      return { ...prev, permissions: newPermissions };
    });
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      showError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSave = async () => {
    try {
      if (!formData.name) {
        showError('Role name is required');
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions
      };

      if (editingRole) {
        await roleService.updateRole(editingRole.id, payload);
        showSuccess('Role updated successfully');
      } else {
        await roleService.createRole(payload);
        showSuccess('Role created successfully');
      }

      fetchRoles();
      setShowModal(false);
      setEditingRole(null);
      setFormData({ name: '', description: '', permissions: {} });
    } catch (error) {
      console.error('Error saving role:', error);
      showError(error.response?.data?.message || 'Failed to save role');
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions || {},
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;

    try {
      await roleService.deleteRole(id);
      showSuccess('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      showError(error.response?.data?.message || 'Failed to delete role');
    }
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const toggleCategoryAll = (categoryKey, enabled) => {
    const categoryPermissions = permissionCategories[categoryKey].permissions;
    setFormData(prev => {
      const newPermissions = { ...prev.permissions };
      categoryPermissions.forEach(perm => {
        newPermissions[perm] = enabled;
      });
      return { ...prev, permissions: newPermissions };
    });
  };

  const isCategoryAllSelected = (categoryKey) => {
    const categoryPermissions = permissionCategories[categoryKey].permissions;
    return categoryPermissions.every(perm => formData.permissions[perm]);
  };

  const columns = [
    { key: 'name', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    {
      key: 'usersCount',
      header: 'Users',
      render: (count) => <Badge color="blue">{count || 0} users</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (status) => (
        <Badge color={status === 'Active' ? 'green' : 'gray'}>
          {status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row)}
            title="Edit Role"
            className="h-8 w-8 !p-0 bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/30 hover:bg-[#127EAB] hover:border-[#127EAB] shadow-2xs transition-all rounded-lg cursor-pointer"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          {row.name !== 'Super Admin' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 !p-0 bg-[#FEF4F2] text-[#EE6450] border border-[#EE6450]/30 hover:bg-[#EE6450] hover:text-white hover:border-[#EE6450] shadow-2xs transition-all rounded-lg cursor-pointer"
              onClick={() => handleDelete(row.id || row._id)}
              title="Delete Role"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Roles & Permissions"
        subtitle="Manage admin roles and their access permissions"
        actions={
          <Button onClick={() => {
            setEditingRole(null);
            setFormData({ name: '', description: '', permissions: {} });
            setShowModal(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        }
      />

      <Card>
        <Card.Content>
          <DataTable
            columns={columns}
            data={roles}
            isLoading={loading}
            emptyMessage="No roles found"
          />
        </Card.Content>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingRole ? 'Edit Role & Permissions' : 'Create New Role'}
        description={
          editingRole
            ? 'Modify role details and fine-tune module-level access permissions'
            : 'Define role information and grant specific access permissions'
        }
        size="xl"
      >
        <div className="space-y-4">
          {/* General Information Section */}
          <div className="bg-[#F8FBFC] p-4 sm:p-5 rounded-2xl border border-[#DCEAF0] shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#127EAB]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4264]">
                Role Information
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F4264] mb-1.5">
                  Role Name <span className="text-[#EE6450]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2] shadow-2xs transition-all hover:border-[#127EAB]/40"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Senior Tax Advisor, Manager"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F4264] mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2] shadow-2xs transition-all hover:border-[#127EAB]/40"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Full access to tax filing forms and review"
                />
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="border border-[#DCEAF0] rounded-2xl overflow-hidden shadow-2xs bg-white">
            {/* Top Bar with Overall Stats and Quick Global Actions */}
            <div className="bg-[#F8FBFC] px-4 sm:px-5 py-3 border-b border-[#E6F0F5] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1F4264]">Module Permissions</h4>
                  <p className="text-[11px] font-medium text-[#6F7F8E]">Assign module-specific read, view, or manage access</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/30">
                  {totalEnabledCount} / {totalAvailableCount} Active
                </span>
                <button
                  type="button"
                  onClick={() => toggleAllGlobal(totalEnabledCount < totalAvailableCount)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${totalEnabledCount === totalAvailableCount
                    ? 'bg-[#FEF4F2] text-[#EE6450] border-[#EE6450]/30 hover:bg-[#EE6450] hover:text-white'
                    : 'bg-white text-[#1F4264] border-[#CCDCE1] hover:border-[#127EAB] hover:text-[#127EAB]'
                    }`}
                >
                  {totalEnabledCount === totalAvailableCount ? 'Reset All' : 'Grant All'}
                </button>
              </div>
            </div>

            {/* Horizontal Scrolling Tabs */}
            <div className="bg-[#F8FBFC] border-b border-[#E6F0F5] px-2 sm:px-3 py-2.5 flex items-center gap-1.5 relative">
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                className="hidden sm:flex p-1.5 rounded-lg text-[#6F7F8E] hover:text-[#1F4264] hover:bg-white border border-transparent hover:border-[#DCEAF0] transition-all cursor-pointer shrink-0"
                title="Scroll Tabs Left"
                aria-label="Scroll tabs left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={tabsRef}
                className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth flex-1 scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {Object.keys(permissionCategories).map(key => {
                  const isActive = activeTab === key;
                  const catPerms = permissionCategories[key].permissions;
                  const activeCount = catPerms.filter(p => formData.permissions[p]).length;
                  const totalCount = catPerms.length;
                  const Icon = categoryIcons[key] || ShieldCheck;

                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1F4264] to-[#127EAB] text-white border-[#127EAB] shadow-xs font-semibold'
                          : 'bg-white text-[#5A6E82] hover:text-[#1F4264] hover:bg-[#F0F6F9] border-[#DCEAF0]'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isActive ? 'text-white' : 'text-[#8BA0B2]'
                        }`}
                      />
                      <span>{permissionCategories[key].label}</span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : activeCount > 0
                            ? 'bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20'
                            : 'bg-[#F0F4F8] text-[#8BA0B2]'
                        }`}
                      >
                        {activeCount}/{totalCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollTabs('right')}
                className="hidden sm:flex p-1.5 rounded-lg text-[#6F7F8E] hover:text-[#1F4264] hover:bg-white border border-transparent hover:border-[#DCEAF0] transition-all cursor-pointer shrink-0"
                title="Scroll Tabs Right"
                aria-label="Scroll tabs right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col min-w-0 bg-white">
              {/* Toolbar */}
              <div className="px-4 sm:px-5 py-3 border-b border-[#E6F0F5] flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2.5">
                  {(() => {
                    const ActiveIcon = categoryIcons[activeTab] || ShieldCheck;
                    return (
                      <div className="p-1.5 rounded-lg bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20">
                        <ActiveIcon className="w-4 h-4" />
                      </div>
                    );
                  })()}
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1F4264]">
                      {permissionCategories[activeTab].label}
                    </h4>
                    <p className="text-[11px] text-[#6F7F8E] font-medium">
                      {permissionCategories[activeTab].permissions.filter(p => formData.permissions[p]).length} of {permissionCategories[activeTab].permissions.length} enabled
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleCategoryAll(activeTab, !isCategoryAllSelected(activeTab))}
                  className={`h-7.5 text-xs px-3 rounded-lg border font-semibold transition-all ${
                    isCategoryAllSelected(activeTab)
                      ? 'bg-[#FEF4F2] text-[#EE6450] border-[#EE6450]/30 hover:bg-[#EE6450] hover:text-white'
                      : 'bg-[#E9F7FA] text-[#127EAB] border-[#127EAB]/30 hover:bg-[#127EAB] hover:text-white'
                  }`}
                >
                  {isCategoryAllSelected(activeTab) ? 'Deselect Category' : 'Select All in Category'}
                </Button>
              </div>

              {/* Grid */}
              <div className="p-4 sm:p-5 overflow-y-auto max-h-[300px] sm:max-h-[350px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {permissionCategories[activeTab].permissions.map(perm => {
                    const isChecked = !!formData.permissions[perm];
                    return (
                      <label
                        key={perm}
                        className={`
                          relative flex items-center gap-3 px-3.5 py-3 border rounded-xl cursor-pointer transition-all duration-200 select-none
                          ${isChecked
                            ? 'border-[#127EAB] bg-[#E9F7FA]/70 ring-1 ring-[#127EAB]/30 shadow-2xs'
                            : 'border-[#E6F0F5] bg-white hover:border-[#CCDCE1] hover:bg-[#F8FBFC]'}
                        `}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => togglePermission(perm)}
                        />
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-[#127EAB] border-[#127EAB] text-white shadow-2xs'
                              : 'bg-white border-[#CCDCE1] text-transparent hover:border-[#127EAB]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-xs sm:text-sm font-semibold block truncate ${
                              isChecked ? 'text-[#1F4264]' : 'text-[#5A6E82]'
                            }`}
                          >
                            {getPermissionLabel(perm)}
                          </span>
                          <span className="text-[11px] text-[#8BA0B2] block truncate">
                            {isChecked ? 'Access granted' : 'No access'}
                          </span>
                        </div>
                        {isChecked && (
                          <span className="w-2 h-2 rounded-full bg-[#127EAB] shrink-0" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E6F0F5]">
            <span className="text-xs text-[#6F7F8E] font-medium hidden sm:inline">
              {totalEnabledCount} permissions granted across {Object.keys(permissionCategories).length} modules
            </span>
            <div className="flex items-center gap-2.5 ml-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="min-w-[110px] px-4 py-2 bg-gradient-to-r from-[#1F4264] to-[#127EAB] hover:from-[#16314A] hover:to-[#0E668B] text-white shadow-xs font-semibold"
              >
                <Check className="w-4 h-4 mr-1.5" />
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RolesPermissions;
