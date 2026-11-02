import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';
import { useToast } from '../../hooks/useToast';
import staffService from '../../services/staffService';
import roleService from '../../services/roleService';
import { Plus, Edit2, Trash2, Mail, Phone, Shield, Eye, EyeOff } from 'lucide-react';

const StaffManagement = () => {
    const [staff, setStaff] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const { showSuccess, showError } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        roleId: '',
        status: 'Active',
    });

    const [showPassword, setShowPassword] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [staffData, rolesData] = await Promise.all([
                staffService.getStaff(),
                roleService.getRoles()
            ]);
            setStaff(staffData || []);
            setRoles(rolesData || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            showError('Failed to load staff management data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            if (!formData.name || !formData.email || !formData.roleId || (!editingStaff && !formData.password)) {
                showError('Please fill in all required fields');
                return;
            }

            const payload = { ...formData };
            if (editingStaff && !payload.password) {
                delete payload.password;
            }

            // Map status to isActive boolean for backend
            payload.isActive = payload.status === 'Active';

            if (editingStaff) {
                await staffService.updateStaff(editingStaff.id, payload);
                showSuccess('Staff member updated successfully');
            } else {
                await staffService.createStaff(payload);
                showSuccess('Staff member added successfully');
            }

            fetchData();
            setShowModal(false);
            setEditingStaff(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                roleId: '',
                status: 'Active',
            });
        } catch (error) {
            console.error('Error saving staff:', error);
            showError(error.response?.data?.message || 'Failed to save staff member');
        }
    };

    const handleEdit = (member) => {
        setEditingStaff(member);
        setFormData({
            name: member.name,
            email: member.email,
            phone: member.phone || '',
            password: '',
            roleId: member.role?._id || member.role?.id || member.role, // Handle populated role or ID
            status: member.isActive ? 'Active' : 'Inactive',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;

        try {
            await staffService.deleteStaff(id);
            showSuccess('Staff member deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting staff:', error);
            showError(error.response?.data?.message || 'Failed to delete staff member');
        }
    };

    const columns = [
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone', render: (val) => val || '-' },
        {
            key: 'role',
            header: 'Role',
            render: (role) => (
                <div className="flex items-center gap-2">
                    <Badge color="blue">{role?.name || 'No Role'}</Badge>
                    <Link to="/admin/settings/roles" className="text-primary-600 hover:text-primary-700">
                        <Shield className="h-3.5 w-3.5" />
                    </Link>
                </div>
            )
        },
        {
            key: 'isActive',
            header: 'Status',
            render: (isActive) => (
                <Badge color={isActive ? 'green' : 'gray'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Badge>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(row.id || row._id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <Header
                title="Staff Management"
                subtitle="Manage admin staff members and assign them roles"
                actions={
                    <Button onClick={() => {
                        setEditingStaff(null);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            password: '',
                            roleId: '',
                            status: 'Active',
                        });
                        setShowModal(true);
                    }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Staff
                    </Button>
                }
            />

            <Card>
                <Card.Content>
                    <DataTable
                        columns={columns}
                        data={staff}
                        isLoading={loading}
                        emptyMessage="No staff members found"
                    />
                </Card.Content>
            </Card>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password {editingStaff ? '(Leave empty to keep current)' : '*'}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 pr-10"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">Role *</label>
                            <Link to="/admin/settings/roles" className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                Manage Roles
                            </Link>
                        </div>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={formData.roleId}
                            onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                        >
                            <option value="">Select a role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            {editingStaff ? 'Update Staff' : 'Add Staff'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StaffManagement;
