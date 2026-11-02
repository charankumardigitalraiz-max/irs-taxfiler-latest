import React, { useState, useEffect } from 'react';
import {
  User,
  UserCircle,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Camera,
  Save,
  X,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { userService } from '../services/userService';
import { getUser, setUser } from '../utils/auth';
import { useToast } from '../../admin/hooks/useToast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editingTab, setEditingTab] = useState(null); // Track which tab is being edited
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    // Personal Info
    dateOfBirth: '',
    ssn: '',
    maritalStatus: '',
    filingStatus: '',
    occupation: '',
    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    // Banking
    bankName: '',
    accountType: '',
    accountNumber: '',
    routingNumber: '',
  });
  const { showSuccess, showError } = useToast();

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'banking', label: 'Banking', icon: CreditCard },
  ];

  // Load user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await userService.getProfile();
        if (res.success && res.data) {
          const user = res.data;
          setFormData({
            firstName: user.firstName || '',
            middleName: user.middleName || '',
            lastName: user.lastName || '',
            fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || '',
            email: user.email || '',
            mobileNumber: user.mobileNumber || '',
            dateOfBirth: user.personalInfo?.dateOfBirth ? new Date(user.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
            ssn: user.personalInfo?.ssn || '',
            maritalStatus: user.personalInfo?.maritalStatus || '',
            filingStatus: user.personalInfo?.filingStatus || '',
            occupation: user.personalInfo?.occupation || '',
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            zipCode: user.address?.zipCode || '',
            country: user.address?.country || 'USA',
            bankName: user.bankDetails?.bankName || '',
            accountType: user.bankDetails?.accountType || '',
            accountNumber: user.bankDetails?.accountNumber || '',
            routingNumber: user.bankDetails?.routingNumber || '',
          });
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        showError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (tabId) => {
    try {
      setSaving(true);
      let updateData = {};

      if (tabId === 'personal') {
        updateData = {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          fullName: `${formData.firstName || ''} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName || ''}`.trim() || formData.fullName,
          personalInfo: {
            dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
            ssn: formData.ssn,
            maritalStatus: formData.maritalStatus,
            filingStatus: formData.filingStatus,
            occupation: formData.occupation,
          },
        };
      } else if (tabId === 'contact') {
        updateData = {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          fullName: `${formData.firstName || ''} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName || ''}`.trim() || formData.fullName,
          mobileNumber: formData.mobileNumber,
        };
      } else if (tabId === 'address') {
        updateData = {
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        };
      } else if (tabId === 'banking') {
        updateData = {
          bankDetails: {
            bankName: formData.bankName,
            accountType: formData.accountType,
            accountNumber: formData.accountNumber,
            routingNumber: formData.routingNumber,
          },
        };
      }

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Profile updated successfully!');
        setEditingTab(null);
        // Update local storage user if contact info changed
        if (tabId === 'contact') {
          const user = getUser();
          if (user) {
            setUser({ 
              ...user, 
              firstName: formData.firstName,
              lastName: formData.lastName,
              fullName: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || formData.fullName,
              mobileNumber: formData.mobileNumber 
            });
          }
        }
      } else {
        showError(res.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      showError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = (tabId) => {
    setEditingTab(null);
    // Reload profile to reset changes
    const loadProfile = async () => {
      try {
        const res = await userService.getProfile();
        if (res.success && res.data) {
          const user = res.data;
          setFormData({
            ...formData,
            ...(tabId === 'personal' ? {
              firstName: user.firstName || '',
              middleName: user.middleName || '',
              lastName: user.lastName || '',
              dateOfBirth: user.personalInfo?.dateOfBirth ? new Date(user.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
              ssn: user.personalInfo?.ssn || '',
              maritalStatus: user.personalInfo?.maritalStatus || '',
              filingStatus: user.personalInfo?.filingStatus || '',
              occupation: user.personalInfo?.occupation || '',
            } : {}),
            ...(tabId === 'contact' ? {
              firstName: user.firstName || '',
              middleName: user.middleName || '',
              lastName: user.lastName || '',
              fullName: user.fullName || '',
              mobileNumber: user.mobileNumber || '',
            } : {}),
            ...(tabId === 'address' ? {
              street: user.address?.street || '',
              city: user.address?.city || '',
              state: user.address?.state || '',
              zipCode: user.address?.zipCode || '',
              country: user.address?.country || 'USA',
            } : {}),
            ...(tabId === 'banking' ? {
              bankName: user.bankDetails?.bankName || '',
              accountType: user.bankDetails?.accountType || '',
              accountNumber: user.bankDetails?.accountNumber || '',
              routingNumber: user.bankDetails?.routingNumber || '',
            } : {}),
          });
        }
      } catch (error) {
        console.error('Failed to reload profile:', error);
      }
    };
    loadProfile();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  const user = getUser();
  const displayName = (formData.firstName && formData.lastName) 
    ? `${formData.firstName} ${formData.lastName}`
    : formData.fullName || user?.fullName || 
    (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '') ||
    user?.email?.split('@')[0] || 'User';
  const nameParts = displayName.split(' ');
  const initials = (formData.firstName && formData.lastName) 
    ? (formData.firstName[0] + formData.lastName[0]).toUpperCase()
    : nameParts.length >= 2 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : displayName.substring(0, 2).toUpperCase();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Profile Settings</h2>
        <p className="text-sm text-gray-600">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Photo & Tabs */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-white">
                    {initials}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500">{formData.email || user?.email || ''}</p>
            </div>
          </Card>

          {/* Tabs */}
          <Card>
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>
                    {tabs.find((t) => t.id === activeTab)?.label || 'Profile Information'}
                  </Card.Title>
                  <Card.Description>
                    {activeTab === 'personal' && 'Update your personal information'}
                    {activeTab === 'contact' && 'Manage your contact details'}
                    {activeTab === 'address' && 'Update your address information'}
                    {activeTab === 'banking' && 'Banking information for refunds'}
                  </Card.Description>
                </div>
                {editingTab !== activeTab && (
                  <Button
                    onClick={() => setEditingTab(activeTab)}
                    variant="secondary"
                    size="sm"
                  >
                    Edit {tabs.find((t) => t.id === activeTab)?.label}
                  </Button>
                )}
              </div>
            </Card.Header>
            <Card.Content>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(activeTab); }} className="space-y-6">
                {activeTab === 'personal' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                    <Input
                      label="Middle Name"
                      name="middleName"
                      type="text"
                      value={formData.middleName}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                    <Input
                      label="SSN"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      placeholder="XXX-XX-XXXX"
                      maxLength="11"
                      required
                    />
                    <Input
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filing Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="filingStatus"
                        value={formData.filingStatus}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select filing status</option>
                        <option value="single">Single</option>
                        <option value="married-jointly">Married Filing Jointly</option>
                        <option value="married-separately">Married Filing Separately</option>
                        <option value="head-of-household">Head of Household</option>
                        <option value="qualifying-widow">Qualifying Widow(er)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marital Status
                      </label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select marital status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        placeholder="Enter your occupation"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={true}
                      className="bg-gray-50"
                    />
                    <Input
                      label="Phone Number"
                      name="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      disabled={editingTab !== activeTab}
                      required
                    />
                  </div>
                )}

                {activeTab === 'address' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Current Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <Input
                            label="Street Address"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            disabled={editingTab !== activeTab}
                            required
                          />
                        </div>
                        <Input
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={editingTab !== activeTab}
                        />
                        <Input
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          disabled={editingTab !== activeTab}
                        />
                        <Input
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          disabled={editingTab !== activeTab}
                        />
                        <Input
                          label="Country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          disabled={editingTab !== activeTab}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'banking' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Bank Name"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Type
                        </label>
                        <select
                          name="accountType"
                          value={formData.accountType}
                          onChange={handleChange}
                          disabled={editingTab !== activeTab}
                          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Select account type</option>
                          <option value="checking">Checking</option>
                          <option value="savings">Savings</option>
                        </select>
                      </div>
                      <Input
                        label="Account Number"
                        name="accountNumber"
                        type="password"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        required
                      />
                      <Input
                        label="Routing Number"
                        name="routingNumber"
                        value={formData.routingNumber}
                        onChange={handleChange}
                        disabled={editingTab !== activeTab}
                        required
                      />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            Secure & Encrypted
                          </p>
                          <p className="text-xs text-blue-800">
                            Your bank details are encrypted and securely stored. This information
                            is used exclusively for tax refund direct deposit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {editingTab === activeTab && (
                  <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleCancel(activeTab)}
                      disabled={saving}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Exit
                    </Button>
                    <Button type="submit" disabled={saving}>
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </form>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
