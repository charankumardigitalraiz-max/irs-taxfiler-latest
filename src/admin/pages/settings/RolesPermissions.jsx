import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';
import { useToast } from '../../hooks/useToast';
import roleService from '../../services/roleService';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
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
          <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          {row.name !== 'Super Admin' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(row.id)}
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
        title={editingRole ? 'Edit Role' : 'Create New Role'}
        size="lg"
      >
        <div className="space-y-4">
          {/* General Information Section */}
          <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 flex flex-col gap-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name *</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Manager, Support"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
          </div>

          {/* Permissions Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row h-[450px]">
            {/* Vertical Sidebar Tabs */}
            <div className="w-full md:w-40 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
              {Object.keys(permissionCategories).map(key => {
                const isActive = activeTab === key;
                const catPerms = permissionCategories[key].permissions;
                const activeCount = catPerms.filter(p => formData.permissions[p]).length;
                const totalCount = catPerms.length;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-3 py-3 text-sm font-medium transition-all border-l-4 flex flex-col ${isActive
                      ? 'bg-white border-primary-600 text-primary-700 shadow-sm'
                      : 'border-transparent text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <span>{permissionCategories[key].label}</span>
                    <span className={`text-xs mt-0.5 ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>
                      {activeCount} / {totalCount} enabled
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              {/* Toolbar */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">{permissionCategories[activeTab].label}</h4>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => toggleCategoryAll(activeTab, !isCategoryAllSelected(activeTab))}
                  className={`h-7 text-xs px-3 ${isCategoryAllSelected(activeTab) ? 'bg-primary-50 text-primary-700 border-primary-200' : ''}`}
                >
                  {isCategoryAllSelected(activeTab) ? 'Uncheck All' : 'Check All'}
                </Button>
              </div>

              {/* Grid */}
              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {permissionCategories[activeTab].permissions.map(perm => {
                    const isChecked = !!formData.permissions[perm];
                    return (
                      <label
                        key={perm}
                        className={`
                          relative flex items-center px-3 py-2.5 border rounded-md cursor-pointer transition-all duration-200
                          ${isChecked
                            ? 'border-primary-500 bg-primary-50 shadow-sm ring-1 ring-primary-500/10'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 flex-shrink-0"
                          checked={isChecked}
                          onChange={() => togglePermission(perm)}
                        />
                        <div className="ml-3 min-w-0">
                          <span className={`text-sm font-medium block truncate ${isChecked ? 'text-primary-900' : 'text-gray-700'}`}>
                            {getPermissionLabel(perm)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" className="min-w-[100px]">
              {editingRole ? 'Save' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RolesPermissions;
