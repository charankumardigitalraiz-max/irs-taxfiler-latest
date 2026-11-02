import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  Tag,
  Calendar,
  User,
  Users,
  Shield,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { format } from 'date-fns';
import { couponService } from '../../services/couponService';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [validForFilter, setValidForFilter] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchaseAmount: '',
    maxDiscountAmount: '',
    validFor: 'user',
    selectionType: 'all', // 'all', 'single', 'multiple'
    selectedUserIds: [],
    selectedEmployeeIds: [],
    usageLimit: '',
    startDate: '',
    endDate: '',
  });

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showEmployeeSearch, setShowEmployeeSearch] = useState(false);
  const userSearchRef = useRef(null);
  const employeeSearchRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { showError, showSuccess } = useToast();

  // Close search dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userSearchRef.current && !userSearchRef.current.contains(event.target)) {
        setShowUserSearch(false);
      }
      if (employeeSearchRef.current && !employeeSearchRef.current.contains(event.target)) {
        setShowEmployeeSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load coupons and users/employees
  useEffect(() => {
    const loadData = async () => {
      try {
        const [couponRes, userRes, employeeRes] = await Promise.all([
          couponService.getCoupons(),
          userService.getUsers({ userType: 'registered' }),
          userService.getUsers({ role: 'admin' }),
        ]);

        if (couponRes.success) {
          setCoupons(couponRes.data || []);
        } else {
          showError(couponRes.message || 'Failed to load coupons.');
        }

        if (userRes.success) {
          setUsers(userRes.data || []);
        }
        if (employeeRes.success) {
          setEmployees(employeeRes.data || []);
        }
      } catch (error) {
        console.error('Error loading coupons data:', error);
        showError('Error loading coupons. Please try again.');
      }
    };
    loadData();
    // We only want to run this once on mount; toast functions are stable from the store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      !searchTerm ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (coupon.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || coupon.status === statusFilter;
    const matchesValidFor = !validForFilter || coupon.validFor === validForFilter;
    return matchesSearch && matchesStatus && matchesValidFor;
  });

  const filteredUsers = users.filter((user) =>
    !userSearchTerm ||
    user.fullName?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredEmployees = employees.filter((employee) =>
    !employeeSearchTerm ||
    employee.fullName?.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'expired':
        return 'gray';
      case 'inactive':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getValidForColor = (validFor) => {
    switch (validFor) {
      case 'user':
        return 'blue';
      case 'employee':
        return 'purple';
      case 'admin':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const isCouponExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const getValidForLabel = () => {
    if (formData.validFor === 'admin') {
      return 'Admins Only';
    }
    if (formData.selectionType === 'all') {
      return formData.validFor === 'user' ? 'All Users' : 'All Employees';
    }
    if (formData.selectionType === 'single') {
      if (formData.validFor === 'user' && formData.selectedUserIds.length === 1) {
        const user = users.find((u) => u._id === formData.selectedUserIds[0]);
        return user ? user.fullName : 'Single User';
      }
      if (formData.validFor === 'employee' && formData.selectedEmployeeIds.length === 1) {
        const emp = employees.find((e) => e._id === formData.selectedEmployeeIds[0]);
        return emp ? emp.fullName : 'Single Employee';
      }
    }
    if (formData.selectionType === 'multiple') {
      if (formData.validFor === 'user') {
        return `${formData.selectedUserIds.length} Users`;
      }
      if (formData.validFor === 'employee') {
        return `${formData.selectedEmployeeIds.length} Employees`;
      }
    }
    return 'All Users';
  };

  const handleCreateCoupon = async () => {
    if (
      !formData.code ||
      !formData.description ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      showError('Please fill in all required fields.');
      return;
    }

    try {
      const payload = {
        code: formData.code,
        name: formData.description,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        validFor: formData.validFor,
        selectionType: formData.selectionType,
        selectedUserIds: formData.selectedUserIds,
        selectedEmployeeIds: formData.selectedEmployeeIds,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      const res = await couponService.createCoupon(payload);
      if (res.success) {
        showSuccess('Coupon created successfully.');
        const listRes = await couponService.getCoupons();
        if (listRes.success) {
          setCoupons(listRes.data || []);
        }
        setShowCreateModal(false);
      } else {
        showError(res.message || 'Failed to create coupon.');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      showError('Error creating coupon. Please try again.');
    }
  };

  const handleCreate = () => {
    // Delegate to API-backed creator
    handleCreateCoupon();
  };

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      minPurchaseAmount: coupon.minPurchaseAmount.toString(),
      maxDiscountAmount: coupon.maxDiscountAmount?.toString() || '',
      validFor: coupon.validFor,
      specificEmployeeId: '',
      usageLimit: coupon.usageLimit?.toString() || '',
      startDate: coupon.startDate,
      endDate: coupon.endDate,
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === selectedCoupon.id
          ? {
              ...coupon,
              ...formData,
              discountValue: parseFloat(formData.discountValue),
              minPurchaseAmount: parseFloat(formData.minPurchaseAmount) || 0,
              maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
              usageLimit: parseInt(formData.usageLimit) || null,
              status: isCouponExpired(formData.endDate) ? 'expired' : 'active',
              validForLabel:
                formData.validFor === 'user'
                  ? 'All Users'
                  : formData.validFor === 'employee'
                  ? formData.specificEmployeeId
                    ? mockEmployees.find((e) => e.id === formData.specificEmployeeId)?.fullName || 'Specific Employee'
                    : 'All Employees'
                  : 'Admins Only',
            }
          : coupon
      )
    );
    setShowEditModal(false);
    setSelectedCoupon(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchaseAmount: '',
      maxDiscountAmount: '',
      validFor: 'user',
      selectionType: 'all',
      selectedUserIds: [],
      selectedEmployeeIds: [],
      usageLimit: '',
      startDate: '',
      endDate: '',
    });
    setUserSearchTerm('');
    setEmployeeSearchTerm('');
    setShowUserSearch(false);
    setShowEmployeeSearch(false);
  };

  const toggleUserSelection = (userId) => {
    setFormData((prev) => {
      const currentIds = prev.selectedUserIds || [];
      const isSelected = currentIds.includes(userId);
      if (prev.selectionType === 'single') {
        return { ...prev, selectedUserIds: isSelected ? [] : [userId] };
      }
      return {
        ...prev,
        selectedUserIds: isSelected
          ? currentIds.filter((id) => id !== userId)
          : [...currentIds, userId],
      };
    });
  };

  const toggleEmployeeSelection = (employeeId) => {
    setFormData((prev) => {
      const currentIds = prev.selectedEmployeeIds || [];
      const isSelected = currentIds.includes(employeeId);
      if (prev.selectionType === 'single') {
        return { ...prev, selectedEmployeeIds: isSelected ? [] : [employeeId] };
      }
      return {
        ...prev,
        selectedEmployeeIds: isSelected
          ? currentIds.filter((id) => id !== employeeId)
          : [...currentIds, employeeId],
      };
    });
  };

  const handleSelectAllUsers = () => {
    if (formData.selectionType === 'multiple') {
      const allUserIds = filteredUsers.map((user) => user.id);
      const allSelected = allUserIds.every((id) => formData.selectedUserIds?.includes(id));
      
      if (allSelected) {
        // Deselect all filtered users
        setFormData((prev) => ({
          ...prev,
          selectedUserIds: prev.selectedUserIds?.filter((id) => !allUserIds.includes(id)) || [],
        }));
      } else {
        // Select all filtered users
        setFormData((prev) => ({
          ...prev,
          selectedUserIds: [...new Set([...(prev.selectedUserIds || []), ...allUserIds])],
        }));
      }
    }
  };

  const handleSelectAllEmployees = () => {
    if (formData.selectionType === 'multiple') {
      const allEmployeeIds = filteredEmployees.map((employee) => employee.id);
      const allSelected = allEmployeeIds.every((id) => formData.selectedEmployeeIds?.includes(id));
      
      if (allSelected) {
        // Deselect all filtered employees
        setFormData((prev) => ({
          ...prev,
          selectedEmployeeIds: prev.selectedEmployeeIds?.filter((id) => !allEmployeeIds.includes(id)) || [],
        }));
      } else {
        // Select all filtered employees
        setFormData((prev) => ({
          ...prev,
          selectedEmployeeIds: [...new Set([...(prev.selectedEmployeeIds || []), ...allEmployeeIds])],
        }));
      }
    }
  };

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === 'active').length,
    expired: coupons.filter((c) => c.status === 'expired').length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
  };

  return (
    <div>
      <Header
        title="Coupons"
        subtitle="Create and manage discount coupons"
        actions={
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
            }}
          >
            Create Coupon
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Coupons</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Expired</p>
            <p className="text-2xl font-bold text-gray-600">{stats.expired}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Usage</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalUsage}</p>
          </Card>
        </div>

        {/* Coupons List */}
        <Card padding="none">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by code or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="inactive">Inactive</option>
              </select>
              
              {/* Valid For Filter */}
              <select
                value={validForFilter}
                onChange={(e) => setValidForFilter(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Types</option>
                <option value="user">Users</option>
                <option value="employee">Employees</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          {/* Coupons Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Coupon Code</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Discount</th>
                  <th className="table-header">Valid For</th>
                  <th className="table-header">Usage</th>
                  <th className="table-header">Validity</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCoupons.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="table-cell text-center py-8 text-gray-500">
                      No coupons found
                    </td>
                  </tr>
                ) : (
                  filteredCoupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary-600" />
                          <span className="font-mono font-semibold text-gray-900">{coupon.code}</span>
                          <button
                            onClick={() => handleCopyCode(coupon.code)}
                            className="text-gray-400 hover:text-primary-600"
                            title="Copy code"
                          >
                            {copiedCode === coupon.code ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="text-gray-700">{coupon.description}</span>
                      </td>
                      <td className="table-cell">
                        <div>
                          <span className="font-semibold text-gray-900">
                            {coupon.discountType === 'percentage'
                              ? `${coupon.discountValue}%`
                              : `$${coupon.discountValue}`}
                          </span>
                          {coupon.minPurchaseAmount > 0 && (
                            <p className="text-xs text-gray-500">
                              Min: ${coupon.minPurchaseAmount}
                            </p>
                          )}
                          {coupon.maxDiscountAmount && (
                            <p className="text-xs text-gray-500">
                              Max: ${coupon.maxDiscountAmount}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <Badge color={getValidForColor(coupon.validFor)} size="sm">
                          {coupon.validForLabel}
                        </Badge>
                      </td>
                      <td className="table-cell">
                        <div>
                          <span className="text-gray-900">
                            {coupon.usedCount} / {coupon.usageLimit || '∞'}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(coupon.startDate), 'MMM d, yyyy')} -{' '}
                            {format(new Date(coupon.endDate), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <Badge color={getStatusColor(coupon.status)} size="sm">
                          {coupon.status}
                        </Badge>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(coupon)}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(coupon.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Create Coupon Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Create New Coupon"
        description="Create a discount coupon for users, employees, or admins"
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-4"
        >
          {/* Coupon Code */}
          <div>
            <label className="label">Coupon Code *</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="input flex-1"
                placeholder="WELCOME2024"
                required
              />
              <Button type="button" variant="secondary" onClick={generateCouponCode}>
                Generate
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description *</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input"
              placeholder="Enter coupon description"
              required
            />
          </div>

          {/* Discount Type and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Discount Type *</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="input"
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="label">Discount Value *</label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="input"
                placeholder={formData.discountType === 'percentage' ? '15' : '50'}
                min="0"
                step={formData.discountType === 'percentage' ? '1' : '0.01'}
                required
              />
            </div>
          </div>

          {/* Min Purchase and Max Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Minimum Purchase Amount</label>
              <input
                type="number"
                value={formData.minPurchaseAmount}
                onChange={(e) => setFormData({ ...formData, minPurchaseAmount: e.target.value })}
                className="input"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="label">Max Discount Amount</label>
              <input
                type="number"
                value={formData.maxDiscountAmount}
                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                className="input"
                placeholder="No limit"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for no limit</p>
            </div>
          </div>

          {/* Valid For */}
          <div>
            <label className="label">Valid For *</label>
            <select
              value={formData.validFor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validFor: e.target.value,
                  selectionType: 'all',
                  selectedUserIds: [],
                  selectedEmployeeIds: [],
                })
              }
              className="input"
              required
            >
              <option value="user">Users</option>
              <option value="employee">Employees</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>

          {/* Selection Type (for users and employees) */}
          {(formData.validFor === 'user' || formData.validFor === 'employee') && (
            <div>
              <label className="label">Selection Type *</label>
              <select
                value={formData.selectionType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    selectionType: e.target.value,
                    selectedUserIds: e.target.value === 'all' ? [] : formData.selectedUserIds,
                    selectedEmployeeIds: e.target.value === 'all' ? [] : formData.selectedEmployeeIds,
                  })
                }
                className="input"
                required
              >
                <option value="all">All {formData.validFor === 'user' ? 'Users' : 'Employees'}</option>
                <option value="single">Single {formData.validFor === 'user' ? 'User' : 'Employee'}</option>
                <option value="multiple">Multiple {formData.validFor === 'user' ? 'Users' : 'Employees'}</option>
              </select>
            </div>
          )}

          {/* User Selection */}
          {formData.validFor === 'user' && formData.selectionType !== 'all' && (
            <div>
              <label className="label">
                {formData.selectionType === 'single' ? 'Select User' : 'Select Users'} *
              </label>
              <div className="relative" ref={userSearchRef}>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${formData.selectionType === 'single' ? 'user' : 'users'}...`}
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      onFocus={() => setShowUserSearch(true)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                {showUserSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500">No users found</div>
                    ) : (
                      <>
                        {formData.selectionType === 'multiple' && (
                          <div
                            onClick={handleSelectAllUsers}
                            className="p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-200 bg-gray-50 sticky top-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={
                                    filteredUsers.length > 0 &&
                                    filteredUsers.every((user) =>
                                      formData.selectedUserIds?.includes(user.id)
                                    )
                                  }
                                  onChange={handleSelectAllUsers}
                                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="font-medium text-sm text-gray-900">
                                  Select All ({filteredUsers.length})
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {filteredUsers.map((user) => {
                        const isSelected = formData.selectedUserIds?.includes(user.id);
                        return (
                          <div
                            key={user.id}
                            onClick={() => {
                              toggleUserSelection(user.id);
                              if (formData.selectionType === 'single') {
                                setShowUserSearch(false);
                                setUserSearchTerm('');
                              }
                            }}
                            className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                              isSelected ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{user.fullName}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400 font-mono">{user.id}</p>
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </>
                    )}
                  </div>
                )}
                {/* Selected Users Display */}
                {formData.selectedUserIds && formData.selectedUserIds.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.selectedUserIds.map((userId) => {
                      const user = mockUsers.find((u) => u.id === userId);
                      if (!user) return null;
                      return (
                        <Badge
                          key={userId}
                          color="blue"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          {user.fullName}
                          <button
                            onClick={() => toggleUserSelection(userId)}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Employee Selection */}
          {formData.validFor === 'employee' && formData.selectionType !== 'all' && (
            <div>
              <label className="label">
                {formData.selectionType === 'single' ? 'Select Employee' : 'Select Employees'} *
              </label>
              <div className="relative" ref={employeeSearchRef}>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${formData.selectionType === 'single' ? 'employee' : 'employees'}...`}
                      value={employeeSearchTerm}
                      onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                      onFocus={() => setShowEmployeeSearch(true)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                {showEmployeeSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredEmployees.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500">No employees found</div>
                    ) : (
                      <>
                        {formData.selectionType === 'multiple' && (
                          <div
                            onClick={handleSelectAllEmployees}
                            className="p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-200 bg-gray-50 sticky top-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={
                                    filteredEmployees.length > 0 &&
                                    filteredEmployees.every((employee) =>
                                      formData.selectedEmployeeIds?.includes(employee.id)
                                    )
                                  }
                                  onChange={handleSelectAllEmployees}
                                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="font-medium text-sm text-gray-900">
                                  Select All ({filteredEmployees.length})
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {filteredEmployees.map((employee) => {
                        const isSelected = formData.selectedEmployeeIds?.includes(employee.id);
                        return (
                          <div
                            key={employee.id}
                            onClick={() => {
                              toggleEmployeeSelection(employee.id);
                              if (formData.selectionType === 'single') {
                                setShowEmployeeSearch(false);
                                setEmployeeSearchTerm('');
                              }
                            }}
                            className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                              isSelected ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{employee.fullName}</p>
                                <p className="text-xs text-gray-500">{employee.email}</p>
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </>
                    )}
                  </div>
                )}
                {/* Selected Employees Display */}
                {formData.selectedEmployeeIds && formData.selectedEmployeeIds.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.selectedEmployeeIds.map((employeeId) => {
                      const employee = mockEmployees.find((e) => e.id === employeeId);
                      if (!employee) return null;
                      return (
                        <Badge
                          key={employeeId}
                          color="purple"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          {employee.fullName}
                          <button
                            onClick={() => toggleEmployeeSelection(employeeId)}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Usage Limit */}
          <div>
            <label className="label">Usage Limit</label>
            <input
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              className="input"
              placeholder="Unlimited"
              min="1"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited usage</p>
          </div>

          {/* Validity Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input"
                required
                min={formData.startDate}
              />
            </div>
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowCreateModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                (formData.validFor === 'user' &&
                  formData.selectionType !== 'all' &&
                  (!formData.selectedUserIds || formData.selectedUserIds.length === 0)) ||
                (formData.validFor === 'employee' &&
                  formData.selectionType !== 'all' &&
                  (!formData.selectedEmployeeIds || formData.selectedEmployeeIds.length === 0))
              }
            >
              Create Coupon
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Edit Coupon Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCoupon(null);
          resetForm();
        }}
        title="Edit Coupon"
        description="Update coupon details"
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-4"
        >
          {/* Same form fields as create, but with existing data */}
          <div>
            <label className="label">Coupon Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Description *</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Discount Type *</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="input"
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="label">Discount Value *</label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Minimum Purchase Amount</label>
              <input
                type="number"
                value={formData.minPurchaseAmount}
                onChange={(e) => setFormData({ ...formData, minPurchaseAmount: e.target.value })}
                className="input"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="label">Max Discount Amount</label>
              <input
                type="number"
                value={formData.maxDiscountAmount}
                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                className="input"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="label">Valid For *</label>
            <select
              value={formData.validFor}
              onChange={(e) => setFormData({ ...formData, validFor: e.target.value, specificEmployeeId: '' })}
              className="input"
              required
            >
              <option value="user">All Users</option>
              <option value="employee">Employees</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>

          {formData.validFor === 'employee' && (
            <div>
              <label className="label">Specific Employee (Optional)</label>
              <select
                value={formData.specificEmployeeId}
                onChange={(e) => setFormData({ ...formData, specificEmployeeId: e.target.value })}
                className="input"
              >
                <option value="">All Employees</option>
                {mockEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName} ({employee.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="label">Usage Limit</label>
            <input
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              className="input"
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input"
                required
                min={formData.startDate}
              />
            </div>
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowEditModal(false);
                setSelectedCoupon(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                (formData.validFor === 'user' &&
                  formData.selectionType !== 'all' &&
                  (!formData.selectedUserIds || formData.selectedUserIds.length === 0)) ||
                (formData.validFor === 'employee' &&
                  formData.selectionType !== 'all' &&
                  (!formData.selectedEmployeeIds || formData.selectedEmployeeIds.length === 0))
              }
            >
              Update Coupon
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Coupons;

