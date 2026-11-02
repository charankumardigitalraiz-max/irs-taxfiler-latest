import { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Shield,
  Save,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { authService } from '../../services/authService';
import useAuthStore from '../../store/authStore';

const ProfileSettings = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Info
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    position: user?.position || '',
    department: user?.department || '',

    // Address
    street: user?.street || '',
    apartment: user?.apartment || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'USA',

    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        position: user?.position || '',
        department: user?.department || '',
        street: user?.street || '',
        apartment: user?.apartment || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
        country: user?.country || 'USA',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { updateUser } = useAuthStore();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeTab === 'security') {
        const passwordError = validatePassword();
        if (passwordError) {
          showError(passwordError);
          return;
        }
        if (!formData.currentPassword) {
          showError('Current password is required');
          return;
        }

        const res = await authService.updatePassword(
          formData.currentPassword,
          formData.newPassword
        );

        if (res.success) {
          showSuccess('Password updated successfully!');
          setFormData((prev) => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }));
          setIsEditing(false);
        } else {
          showError(res.message || 'Failed to update password');
        }
      } else {
        // Personal or Address
        const dataToUpdate = { ...formData };
        // Remove password fields from profile update
        delete dataToUpdate.currentPassword;
        delete dataToUpdate.newPassword;
        delete dataToUpdate.confirmPassword;

        const res = await authService.updateProfile(dataToUpdate);

        if (res.success) {
          showSuccess(res.message || 'Profile updated successfully!');
          updateUser(res.admin);
          setIsEditing(false);
        } else {
          showError(res.message || 'Failed to update profile');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showError(error.response?.data?.message || 'Error updating profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const validatePassword = () => {
    if (formData.newPassword && formData.newPassword.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const inputClass = isEditing
    ? 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
    : 'w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none';

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter position"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter department"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            value={user?.role?.replace('_', ' ') || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter street address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment/Unit
          </label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => handleChange('apartment', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Apt, Suite, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter ZIP code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className={inputClass}
            disabled={!isEditing}
            placeholder="Enter country"
          />
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => {
    const passwordError = validatePassword();

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Password Requirements</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              className={inputClass}
              disabled={!isEditing}
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              className={inputClass}
              disabled={!isEditing}
              placeholder="Enter new password"
            />
            {passwordError && formData.newPassword && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={inputClass}
              disabled={!isEditing}
              placeholder="Confirm new password"
            />
            {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header
        title="Profile Settings"
        subtitle="Manage your account information and preferences"
      />

      <div className="space-y-6">
        <Card padding="none" className="overflow-hidden">
          {/* Top Tabs */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <nav className="flex overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${isActive
                      ? 'border-primary-500 text-primary-600 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Configure your personal account settings</p>
              </div>
              <div className="flex items-center gap-3">
                {isEditing && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data logic is already in useEffect but reset password fields here
                      setFormData(prev => ({
                        ...prev,
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      }));
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  size="sm"
                  variant={isEditing ? 'primary' : 'secondary'}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  disabled={isSaving}
                  className="shadow-sm"
                >
                  {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl">
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'address' && renderAddress()}
              {activeTab === 'security' && renderSecurity()}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;

