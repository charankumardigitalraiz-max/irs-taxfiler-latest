import React, { useState, useEffect } from 'react';
import {
  User,
  UserCircle,
  MapPin,
  Mail,
  Shield,
  CreditCard,
  CheckCircle,
  ChevronRight,
  Building,
  Users,
  FileText,
  Save,
  X,
  Trash2,
  Edit,
  Plus,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { userService } from '../services/userService';
import { documentService } from '../services/documentService';
import { useToast } from '../../admin/hooks/useToast';

const AccountInformation = () => {
  const [activeSection, setActiveSection] = useState('Taxpayer Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);
  const { showSuccess, showError } = useToast();

  // Calculate completed sections based on data
  const getCompletedSections = () => {
    if (!userData) return [];
    const completed = [];
    const filingStatus = userData.personalInfo?.filingStatus || '';
    const isSingleFiling = filingStatus === 'single';
    const isMarriedSeparately = filingStatus === 'married-separately';
    // Hide dependents for both "single" and "married-separately" filing statuses
    const shouldHideDependents = isSingleFiling || isMarriedSeparately;

    if (userData.firstName && userData.lastName && userData.personalInfo?.ssn) {
      completed.push('Taxpayer Profile');
    }
    // Only count spouse section if not single filing
    if (!isSingleFiling && userData.spouseInfo?.fullName) {
      completed.push('Spouse Details');
    }
    // Only count dependent section if not single or married-separately filing
    if (!shouldHideDependents && userData.dependents && userData.dependents.length > 0) {
      completed.push('Dependent Details');
    }
    // Check if at least one address is complete
    const hasAddress = (userData.addresses && Array.isArray(userData.addresses) && userData.addresses.length > 0 &&
      userData.addresses.some(addr => addr.street && addr.city)) ||
      (userData.address?.street && userData.address?.city);
    if (hasAddress) {
      completed.push('Address');
    }
    if (userData.email && userData.mobileNumber) {
      completed.push('Contact Information');
    }
    if (userData.bankDetails?.bankName && userData.bankDetails?.accountNumber) {
      completed.push('Bank Details');
    }
    if (userData.identityVerification?.licenseNumber && userData.identityVerification?.stateOfIssue) {
      completed.push('Identity Verification');
    }

    return completed;
  };

  const completedSections = getCompletedSections();

  // Check if personal info (Taxpayer Profile) is completed
  const isPersonalInfoComplete = userData &&
    userData.firstName &&
    userData.firstName.trim().length > 0 &&
    userData.lastName &&
    userData.lastName.trim().length > 0 &&
    userData.personalInfo &&
    userData.personalInfo.ssn &&
    userData.personalInfo.ssn.trim().length > 0;

  // Load user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await userService.getProfile();
        if (res.success && res.data) {
          setUserData(res.data);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        showError('Failed to load account information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Redirect away from Spouse Details or Dependent Details based on filing status
  useEffect(() => {
    if (userData) {
      const filingStatus = userData.personalInfo?.filingStatus || '';
      if (filingStatus === 'single') {
        if (activeSection === 'Spouse Details') {
          setActiveSection('Taxpayer Profile');
          showError('Spouse Details section is not available for Single filing status');
        } else if (activeSection === 'Dependent Details') {
          setActiveSection('Taxpayer Profile');
          showError('Dependent Details section is not available for Single filing status');
        }
      } else if (filingStatus === 'married-separately') {
        if (activeSection === 'Dependent Details') {
          setActiveSection('Taxpayer Profile');
          showError('Dependent Details section is not available for Married Filing Separately status');
        }
      }
    }
  }, [userData, activeSection]);

  // Get filing status from userData
  const filingStatus = userData?.personalInfo?.filingStatus || '';
  const hasFilingStatus = filingStatus && filingStatus.trim() !== '';
  const isSingleFiling = filingStatus === 'single';
  const isMarriedSeparately = filingStatus === 'married-separately';
  // Hide dependents for both "single" and "married-separately" filing statuses
  const shouldHideDependents = isSingleFiling || isMarriedSeparately;

  // Define all sections
  const allSections = [
    {
      id: 'Taxpayer Profile',
      icon: UserCircle,
      description: 'Personal information and filing status',
      color: 'blue',
      alwaysShow: true, // Always show this section
    },
    {
      id: 'Spouse Details',
      icon: Users,
      description: 'Spouse personal information',
      color: 'purple',
      requiresFilingStatus: true, // Only show after filing status is selected
      hideIfSingle: true, // Hide if filing status is "single"
    },
    {
      id: 'Dependent Details',
      icon: UserCircle,
      description: 'Add and manage dependents',
      color: 'green',
      requiresFilingStatus: true, // Only show after filing status is selected
      hideIfSingle: true, // Hide if filing status is "single" or "married-separately"
    },
    {
      id: 'Address',
      icon: MapPin,
      description: 'Current and tax year addresses',
      color: 'orange',
      alwaysShow: true,
    },
    {
      id: 'Contact Information',
      icon: Mail,
      description: 'Email and phone contacts',
      color: 'indigo',
      alwaysShow: true,
    },
    {
      id: 'Identity Verification',
      icon: Shield,
      description: 'Driver\'s license verification',
      color: 'red',
      alwaysShow: true,
    },
    {
      id: 'Bank Details',
      icon: Building,
      description: 'Banking information for refunds',
      color: 'teal',
      alwaysShow: true,
    },
  ];

  // Function to filter sections based on data
  const getFilteredSections = (data) => {
    if (!data) return allSections.filter(s => s.alwaysShow);

    const fStatus = data.personalInfo?.filingStatus || '';
    const hasFS = fStatus && fStatus.trim() !== '';
    const isSingle = fStatus === 'single';
    const isSeparately = fStatus === 'married-separately';
    const hideDeps = isSingle || isSeparately;

    return allSections.filter(section => {
      // Always show sections marked as alwaysShow
      if (section.alwaysShow) return true;

      // For sections that require filing status, only show if filing status is selected
      if (section.requiresFilingStatus && !hasFS) return false;

      // Hide spouse section if filing status is "single"
      if (section.hideIfSingle && section.id === 'Spouse Details' && isSingle) return false;

      // Hide dependent section if filing status is "single" or "married-separately"
      if (section.hideIfSingle && section.id === 'Dependent Details' && hideDeps) return false;

      return true;
    });
  };

  const sections = getFilteredSections(userData);

  // Function to get next section
  const getNextSection = (currentSection, dataOverride = null) => {
    const currentData = dataOverride || userData;
    const currentSections = getFilteredSections(currentData);
    const currentIndex = currentSections.findIndex(s => s.id === currentSection);

    if (currentIndex >= 0 && currentIndex < currentSections.length - 1) {
      return currentSections[currentIndex + 1].id;
    }
    return null; // No next section
  };

  const isCompleted = (section) => completedSections.includes(section);
  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600',
      red: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600',
      teal: isActive ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600',
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading account information...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Account Information</h2>
        <p className="text-sm text-gray-600">
          Complete your account information to proceed with tax filing. All information is securely stored.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Information Sections
              </h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const completed = isCompleted(section.id);

                  // Check if section should be disabled (requires filing status but not selected)
                  const requiresFilingStatus = section.requiresFilingStatus && !hasFilingStatus;
                  const isDisabled = requiresFilingStatus;

                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        if (!isDisabled) {
                          setActiveSection(section.id);
                        } else {
                          // If trying to access spouse/dependent without filing status, show message and redirect
                          showError('Please select your filing status in Taxpayer Profile first');
                          setActiveSection('Taxpayer Profile');
                        }
                      }}
                      disabled={isDisabled}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isDisabled
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                        : isActive
                          ? `${getColorClasses(section.color, true)} shadow-lg transform scale-[1.02]`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                        }`}
                    >
                      <div className={`p-2 rounded-lg ${getColorClasses(section.color, isActive)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                            {section.id}
                          </span>
                          {completed && !isActive && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        {!isActive && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{section.description}</p>
                        )}
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">Progress</span>
                  <span className="text-xs font-semibold text-primary-600">
                    {completedSections.length}/{sections.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  {completedSections.length === sections.length ? (
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
                    />
                  )}
                </div>
                {completedSections.length === sections.length ? (
                  <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>All Information Complete</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {completedSections.length === 0
                        ? 'Start filling your information'
                        : `${completedSections.length} of ${sections.length} sections completed`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card>
            <Card.Content className="p-6">
              {activeSection === 'Taxpayer Profile' && <TaxpayerProfileForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Taxpayer Profile', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Spouse Details' && !isSingleFiling && hasFilingStatus && <SpouseDetailsForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Spouse Details', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Dependent Details' && !shouldHideDependents && hasFilingStatus && <DependentDetailsForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Dependent Details', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Address' && <AddressForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Address', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Contact Information' && <ContactInformationForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Contact Information', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Identity Verification' && <IdentityVerificationForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Identity Verification', updatedData); if (next) setActiveSection(next); }} />}
              {activeSection === 'Bank Details' && <BankDetailsForm userData={userData} setUserData={setUserData} saving={saving} setSaving={setSaving} onSaveSuccess={(updatedData) => { const next = getNextSection('Bank Details', updatedData); if (next) setActiveSection(next); }} />}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Taxpayer Profile Component
const TaxpayerProfileForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    ssn: '',
    dateOfBirth: '',
    filingStatus: '',
    occupation: '',
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        middleName: userData.middleName || '',
        lastName: userData.lastName || '',
        ssn: userData.personalInfo?.ssn || '',
        dateOfBirth: userData.personalInfo?.dateOfBirth ? new Date(userData.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
        filingStatus: userData.personalInfo?.filingStatus || '',
        occupation: userData.personalInfo?.occupation || '',
      });
    }
  }, [userData]);

  const handleSave = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.firstName.trim()) {
      showError('First Name is required');
      return;
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      showError('Last Name is required');
      return;
    }
    if (!formData.ssn || !formData.ssn.trim()) {
      showError('SSN or ITIN is required');
      return;
    }
    if (!formData.dateOfBirth) {
      showError('Date of Birth is required');
      return;
    }
    if (!formData.filingStatus) {
      showError('Filing Status is required');
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        personalInfo: {
          ssn: formData.ssn,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
          filingStatus: formData.filingStatus,
          occupation: formData.occupation,
        },
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Taxpayer profile saved successfully!');
        setUserData(res.data);
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save profile.');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      showError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="p-3 bg-blue-100 rounded-xl">
          <UserCircle className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Taxpayer Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your personal information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="Enter first name"
        />
        <Input
          label="Middle Name"
          value={formData.middleName}
          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
          placeholder="Enter middle name"
        />
        <Input
          label="Last Name"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Enter last name"
        />
        <Input
          label="SSN or ITIN"
          required
          value={formData.ssn}
          onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
          placeholder="SSN: XXX-XX-XXXX or ITIN: 9XX-XX-XXXX"
          maxLength={11}
        />
        <Input
          label="Date of Birth"
          type="date"
          required
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.filingStatus}
            onChange={(e) => setFormData({ ...formData, filingStatus: e.target.value })}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">Select filing status</option>
            <option value="single">Single</option>
            <option value="married-jointly">Married Filing Jointly</option>
            <option value="married-separately">Married Filing Separately</option>
            <option value="head-of-household">Head of Household</option>
            <option value="qualifying-widow">Qualifying Widow(er)</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <Input
            label="Occupation"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            placeholder="Enter your occupation"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

// Spouse Details Component
const SpouseDetailsForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    ssn: '',
    dateOfBirth: '',
    occupation: '',
  });
  const [files, setFiles] = useState({
    passport: null,
    visa: null,
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.spouseInfo?.fullName || '',
        ssn: userData.spouseInfo?.ssn || '',
        dateOfBirth: userData.spouseInfo?.dateOfBirth ? new Date(userData.spouseInfo.dateOfBirth).toISOString().split('T')[0] : '',
        occupation: userData.spouseInfo?.occupation || '',
      });
    }
  }, [userData]);

  const handleFileChange = (field, file) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.fullName.trim()) {
      showError('Spouse Full Name is required');
      return;
    }

    // Documents are optional - no validation needed

    if (!formData.dateOfBirth) {
      showError('Spouse Date of Birth is required');
      return;
    }

    try {
      setSaving(true);

      // Upload documents first if they exist
      if (files.passport) {
        try {
          await documentService.uploadDocument({
            documentType: 'SPOUSE_PASSPORT',
            file: files.passport,
          });
        } catch (error) {
          console.error('Failed to upload passport:', error);
          showError('Failed to upload passport document. Please try again.');
        }
      }

      if (files.visa) {
        try {
          await documentService.uploadDocument({
            documentType: 'SPOUSE_VISA',
            file: files.visa,
          });
        } catch (error) {
          console.error('Failed to upload visa:', error);
          showError('Failed to upload visa document. Please try again.');
        }
      }

      // Save spouse info
      const updateData = {
        spouseInfo: {
          fullName: formData.fullName,
          ssn: formData.ssn,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
          occupation: formData.occupation,
        },
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Spouse details saved successfully!');
        setUserData(res.data);
        // Clear file inputs after successful save
        setFiles({ passport: null, visa: null });
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save spouse details.');
      }
    } catch (error) {
      console.error('Failed to save spouse details:', error);
      showError('Failed to save spouse details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="p-3 bg-purple-100 rounded-xl">
          <Users className="h-7 w-7 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Spouse Details</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your spouse's information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Spouse Full Name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter spouse full name"
          />
        </div>
        <Input
          label="Spouse SSN or ITIN"
          value={formData.ssn}
          onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
          placeholder="SSN: XXX-XX-XXXX or ITIN: 9XX-XX-XXXX"
          maxLength={11}
          helperText={!formData.ssn || !formData.ssn.trim() ? "If spouse doesn't have SSN/ITIN, please upload Passport and Visa copies below" : ""}
        />
        <Input
          label="Spouse Date of Birth"
          type="date"
          required
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
        <div className="md:col-span-2">
          <Input
            label="Spouse Occupation"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            placeholder="Enter spouse occupation"
          />
        </div>
      </div>

      {/* File Upload Section - Show if no SSN/ITIN */}
      {(!formData.ssn || !formData.ssn.trim()) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Documents</h3>
            <p className="text-sm text-gray-600">
              Since spouse doesn't have SSN or ITIN, please upload the following documents:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Copy <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('passport', e.target.files[0])}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
                {files.passport && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <FileText className="w-4 h-4" />
                    <span>{files.passport.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visa Copy <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('visa', e.target.files[0])}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
                {files.visa && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <FileText className="w-4 h-4" />
                    <span>{files.visa.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

// Dependent Details Component
const DependentDetailsForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [dependents, setDependents] = useState([{
    name: '',
    ssn: '',
    relationship: '',
    dateOfBirth: '',
    passport: null,
    visa: null,
    medicalRecord: null,
    schoolRecord: null,
  }]);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData && userData.dependents && userData.dependents.length > 0) {
      setDependents(userData.dependents.map(dep => ({
        name: dep.name || '',
        ssn: dep.ssn || '',
        relationship: dep.relationship || '',
        dateOfBirth: dep.dateOfBirth ? new Date(dep.dateOfBirth).toISOString().split('T')[0] : '',
        passport: null,
        visa: null,
        medicalRecord: null,
        schoolRecord: null,
      })));
    } else {
      setDependents([{
        name: '',
        ssn: '',
        relationship: '',
        dateOfBirth: '',
        passport: null,
        visa: null,
        medicalRecord: null,
        schoolRecord: null,
      }]);
    }
  }, [userData]);

  const addDependent = () => {
    setDependents([...dependents, {
      name: '',
      ssn: '',
      relationship: '',
      dateOfBirth: '',
      passport: null,
      visa: null,
      medicalRecord: null,
      schoolRecord: null,
    }]);
  };

  const removeDependent = (index) => {
    if (dependents.length > 1) {
      setDependents(dependents.filter((_, i) => i !== index));
    } else {
      // If only one dependent, reset it to empty instead of removing
      setDependents([{
        name: '',
        ssn: '',
        relationship: '',
        dateOfBirth: '',
        passport: null,
        visa: null,
        medicalRecord: null,
        schoolRecord: null,
      }]);
    }
  };

  const handleDependentChange = (index, field, value) => {
    const updated = [...dependents];
    updated[index] = { ...updated[index], [field]: value };
    setDependents(updated);
  };

  const handleDependentFileChange = (index, field, file) => {
    const updated = [...dependents];
    updated[index] = { ...updated[index], [field]: file };
    setDependents(updated);
  };

  const handleSave = async () => {
    // Filter out completely empty dependents (all fields empty)
    const validDependents = dependents.filter(dep => {
      const hasAnyData = (dep.name && dep.name.trim()) ||
        (dep.ssn && dep.ssn.trim()) ||
        dep.relationship ||
        dep.dateOfBirth;
      return hasAnyData;
    });

    // If there are dependents with any data, validate all required fields
    if (validDependents.length > 0) {
      for (let i = 0; i < validDependents.length; i++) {
        const dep = validDependents[i];
        const originalIndex = dependents.findIndex(d => d === dep);
        const displayIndex = originalIndex + 1;

        if (!dep.name || !dep.name.trim()) {
          showError(`Dependent ${displayIndex}: Full Name is required`);
          return;
        }
        // Documents are optional - no validation needed for them
        if (!dep.relationship || !dep.relationship.trim()) {
          showError(`Dependent ${displayIndex}: Relationship is required`);
          return;
        }
        if (!dep.dateOfBirth) {
          showError(`Dependent ${displayIndex}: Date of Birth is required`);
          return;
        }
      }
    }

    try {
      setSaving(true);

      // Upload documents for each dependent
      for (let i = 0; i < validDependents.length; i++) {
        const dep = validDependents[i];
        const originalIndex = dependents.findIndex(d => d === dep);
        const depIndex = originalIndex + 1; // 1-based index for documentType

        // Upload passport if exists
        if (dep.passport) {
          try {
            await documentService.uploadDocument({
              documentType: `DEPENDENT_PASSPORT_${depIndex}`,
              file: dep.passport,
            });
          } catch (error) {
            console.error(`Failed to upload passport for dependent ${depIndex}:`, error);
            showError(`Failed to upload passport for dependent ${depIndex}. Please try again.`);
          }
        }

        // Upload visa if exists
        if (dep.visa) {
          try {
            await documentService.uploadDocument({
              documentType: `DEPENDENT_VISA_${depIndex}`,
              file: dep.visa,
            });
          } catch (error) {
            console.error(`Failed to upload visa for dependent ${depIndex}:`, error);
            showError(`Failed to upload visa for dependent ${depIndex}. Please try again.`);
          }
        }

        // Upload medical record if exists
        if (dep.medicalRecord) {
          try {
            await documentService.uploadDocument({
              documentType: `DEPENDENT_MEDICAL_${depIndex}`,
              file: dep.medicalRecord,
            });
          } catch (error) {
            console.error(`Failed to upload medical record for dependent ${depIndex}:`, error);
            showError(`Failed to upload medical record for dependent ${depIndex}. Please try again.`);
          }
        }

        // Upload school record if exists
        if (dep.schoolRecord) {
          try {
            await documentService.uploadDocument({
              documentType: `DEPENDENT_SCHOOL_${depIndex}`,
              file: dep.schoolRecord,
            });
          } catch (error) {
            console.error(`Failed to upload school record for dependent ${depIndex}:`, error);
            showError(`Failed to upload school record for dependent ${depIndex}. Please try again.`);
          }
        }
      }

      // Save dependents info
      const updateData = {
        dependents: validDependents.map(dep => ({
          name: dep.name ? dep.name.trim() : '',
          ssn: dep.ssn ? dep.ssn.trim() : '',
          relationship: dep.relationship ? dep.relationship.trim() : '',
          dateOfBirth: dep.dateOfBirth ? new Date(dep.dateOfBirth) : undefined,
        })).filter(dep => dep.name || dep.ssn || dep.relationship || dep.dateOfBirth), // Double-check to remove any empty ones
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Dependents saved successfully!');
        setUserData(res.data);
        // Clear file inputs after successful save
        setDependents(prev => prev.map(dep => ({
          ...dep,
          passport: null,
          visa: null,
          medicalRecord: null,
          schoolRecord: null,
        })));
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save dependents.');
      }
    } catch (error) {
      console.error('Failed to save dependents:', error);
      showError('Failed to save dependents. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <UserCircle className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dependent Details</h2>
            <p className="text-sm text-gray-500 mt-1">Add information for your dependents</p>
          </div>
        </div>
        <Button onClick={addDependent} variant="success" leftIcon={<Users className="w-4 h-4" />}>
          Add Dependent
        </Button>
      </div>

      <div className="space-y-4">
        {dependents.map((dependent, index) => (
          <div key={index} className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-primary-300 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Dependent {index + 1}</h3>
              </div>
              {dependents.length > 1 && (
                <button
                  onClick={() => removeDependent(index)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={dependent.name}
                onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                placeholder="Enter dependent name"
              />
              <Input
                label="SSN or ITIN"
                value={dependent.ssn}
                onChange={(e) => handleDependentChange(index, 'ssn', e.target.value)}
                placeholder="SSN: XXX-XX-XXXX or ITIN: 9XX-XX-XXXX"
                maxLength={11}
                helperText={!dependent.ssn || !dependent.ssn.trim() ? "If dependent doesn't have SSN/ITIN, you may upload supporting documents below (optional)" : ""}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  value={dependent.relationship}
                  onChange={(e) => handleDependentChange(index, 'relationship', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="">Select relationship</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Stepchild">Stepchild</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                label="Date of Birth"
                type="date"
                required
                value={dependent.dateOfBirth}
                onChange={(e) => handleDependentChange(index, 'dateOfBirth', e.target.value)}
              />
            </div>

            {/* File Upload Section - Show if no SSN/ITIN */}
            {(!dependent.ssn || !dependent.ssn.trim()) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">Supporting Documents (Optional)</h4>
                  <p className="text-sm text-gray-600">
                    If dependent doesn't have SSN or ITIN, you may upload the following supporting documents:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Copy
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleDependentFileChange(index, 'passport', e.target.files[0])}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      />
                      {dependent.passport && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-4 h-4" />
                          <span>{dependent.passport.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visa Copy
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleDependentFileChange(index, 'visa', e.target.files[0])}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      />
                      {dependent.visa && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-4 h-4" />
                          <span>{dependent.visa.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Record
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleDependentFileChange(index, 'medicalRecord', e.target.files[0])}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      />
                      {dependent.medicalRecord && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-4 h-4" />
                          <span>{dependent.medicalRecord.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Record
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleDependentFileChange(index, 'schoolRecord', e.target.files[0])}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      />
                      {dependent.schoolRecord && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-4 h-4" />
                          <span>{dependent.schoolRecord.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

// Address Form Component
const AddressForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    addressType: 'current',
    isPrimary: false,
  });
  const { showSuccess, showError } = useToast();

  // Only load addresses from userData on initial mount, not on every userData change
  useEffect(() => {
    if (userData && isInitialLoad) {
      // Only load on initial mount
      setIsInitialLoad(false);

      // Check if userData has addresses array or single address
      if (userData.addresses && Array.isArray(userData.addresses) && userData.addresses.length > 0) {
        // Multiple addresses
        setAddresses(userData.addresses.map(addr => ({
          street: addr.street || '',
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zipCode || '',
          country: addr.country || 'USA',
          addressType: addr.addressType || 'current',
          isPrimary: addr.isPrimary || false,
        })));
      } else if (userData.address && (!userData.addresses || userData.addresses.length === 0)) {
        // Single address (backward compatibility) - only if no addresses array
        setAddresses([{
          street: userData.address.street || '',
          city: userData.address.city || '',
          state: userData.address.state || '',
          zipCode: userData.address.zipCode || '',
          country: userData.address.country || 'USA',
          addressType: 'current',
          isPrimary: true,
        }]);
      } else if (!userData.address && (!userData.addresses || userData.addresses.length === 0)) {
        // No addresses at all - keep empty array
        setAddresses([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?._id]); // Only run when userData ID changes (initial load)

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setShowAddForm(false);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      addressType: 'current',
      isPrimary: false,
    });
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingIndex(null);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      addressType: 'current',
      isPrimary: addresses.length === 0, // First address is primary
    });
  };

  const handleSaveNew = () => {
    // Validate new address
    if (!newAddress.street || !newAddress.street.trim()) {
      showError('Street Address is required');
      return;
    }
    if (!newAddress.city || !newAddress.city.trim()) {
      showError('City is required');
      return;
    }
    if (!newAddress.state || !newAddress.state.trim()) {
      showError('State is required');
      return;
    }
    if (!newAddress.zipCode || !newAddress.zipCode.trim()) {
      showError('ZIP Code is required');
      return;
    }

    // If setting as primary, unset all others
    const updatedAddresses = [...addresses];
    if (newAddress.isPrimary) {
      updatedAddresses.forEach(addr => addr.isPrimary = false);
    }
    // If it's the first address, make it primary
    if (updatedAddresses.length === 0) {
      newAddress.isPrimary = true;
    }

    setAddresses([...updatedAddresses, { ...newAddress }]);
    setShowAddForm(false);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      addressType: 'current',
      isPrimary: false,
    });
    showSuccess('Address added successfully!');
  };

  const handleUpdateAddress = (index) => {
    // Validation is done in handleSave, but we can add here if needed
    setEditingIndex(null);
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index] = { ...updated[index], [field]: value };

    // If setting as primary, unset all others
    if (field === 'isPrimary' && value === true) {
      updated.forEach((addr, i) => {
        if (i !== index) addr.isPrimary = false;
      });
    }

    setAddresses(updated);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });

    // If setting as primary, unset all others
    if (field === 'isPrimary' && value === true) {
      addresses.forEach(addr => addr.isPrimary = false);
    }
  };

  const handleDelete = (index) => {
    const addressToDelete = addresses[index];
    const confirmMessage = `Are you sure you want to delete this address?\n\n${addressToDelete.street}\n${addressToDelete.city}, ${addressToDelete.state} ${addressToDelete.zipCode}`;

    if (window.confirm(confirmMessage)) {
      const updated = addresses.filter((_, i) => i !== index);
      // If we removed the primary address, make the first one primary
      if (addresses[index].isPrimary && updated.length > 0) {
        updated[0].isPrimary = true;
      }
      setAddresses(updated);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
      showSuccess('Address deleted successfully!');
    }
  };

  const handleDeleteAll = async () => {
    if (addresses.length === 0) {
      showError('No addresses to delete');
      return;
    }

    const confirmMessage = `Are you sure you want to delete all ${addresses.length} address(es)?\n\nThis action cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      try {
        setSaving(true);

        // Update local state immediately
        setAddresses([]);
        setEditingIndex(null);
        setShowAddForm(false);

        // Save empty addresses array to backend
        const updateData = {
          addresses: [],
          address: null, // Clear single address field too
        };

        const res = await userService.updateProfile(updateData);
        if (res.success) {
          // Update userData to reflect the deletion
          if (res.data) {
            setUserData({ ...res.data, addresses: [] });
          }
          showSuccess('All addresses deleted successfully!');
        } else {
          // If save failed, reload addresses from userData
          if (userData?.addresses && Array.isArray(userData.addresses)) {
            setAddresses(userData.addresses.map(addr => ({
              street: addr.street || '',
              city: addr.city || '',
              state: addr.state || '',
              zipCode: addr.zipCode || '',
              country: addr.country || 'USA',
              addressType: addr.addressType || 'current',
              isPrimary: addr.isPrimary || false,
            })));
          }
          showError(res.message || 'Failed to delete addresses.');
        }
      } catch (error) {
        console.error('Failed to delete all addresses:', error);
        // Reload addresses from userData on error
        if (userData?.addresses && Array.isArray(userData.addresses)) {
          setAddresses(userData.addresses.map(addr => ({
            street: addr.street || '',
            city: addr.city || '',
            state: addr.state || '',
            zipCode: addr.zipCode || '',
            country: addr.country || 'USA',
            addressType: addr.addressType || 'current',
            isPrimary: addr.isPrimary || false,
          })));
        }
        showError('Failed to delete addresses. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSetAsDefault = (index) => {
    const updated = [...addresses];
    // Unset all primary flags
    updated.forEach(addr => addr.isPrimary = false);
    // Set selected address as primary
    updated[index].isPrimary = true;
    setAddresses(updated);
    showSuccess('Default address updated successfully!');
  };

  const handleSave = async () => {
    // Filter out completely empty addresses
    const validAddresses = addresses.filter(addr => {
      const hasAnyData = (addr.street && addr.street.trim()) ||
        (addr.city && addr.city.trim()) ||
        (addr.state && addr.state.trim()) ||
        (addr.zipCode && addr.zipCode.trim());
      return hasAnyData;
    });

    if (validAddresses.length === 0) {
      showError('At least one address is required');
      return;
    }

    // Validate all addresses
    for (let i = 0; i < validAddresses.length; i++) {
      const addr = validAddresses[i];
      const displayIndex = i + 1;

      if (!addr.street || !addr.street.trim()) {
        showError(`Address ${displayIndex}: Street Address is required`);
        return;
      }
      if (!addr.city || !addr.city.trim()) {
        showError(`Address ${displayIndex}: City is required`);
        return;
      }
      if (!addr.state || !addr.state.trim()) {
        showError(`Address ${displayIndex}: State is required`);
        return;
      }
      if (!addr.zipCode || !addr.zipCode.trim()) {
        showError(`Address ${displayIndex}: ZIP Code is required`);
        return;
      }
    }

    // Ensure at least one address is marked as primary
    const hasPrimary = validAddresses.some(addr => addr.isPrimary);
    if (!hasPrimary && validAddresses.length > 0) {
      validAddresses[0].isPrimary = true;
    }

    try {
      setSaving(true);
      const updateData = {
        addresses: validAddresses.map(addr => ({
          street: addr.street.trim(),
          city: addr.city.trim(),
          state: addr.state.trim(),
          zipCode: addr.zipCode.trim(),
          country: addr.country || 'USA',
          addressType: addr.addressType || 'current',
          isPrimary: addr.isPrimary || false,
        })),
        // Keep backward compatibility - set primary address as main address
        address: validAddresses.find(addr => addr.isPrimary) || validAddresses[0],
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        // Prepare the saved addresses array
        const savedAddresses = validAddresses.map(addr => ({
          street: addr.street.trim(),
          city: addr.city.trim(),
          state: addr.state.trim(),
          zipCode: addr.zipCode.trim(),
          country: addr.country || 'USA',
          addressType: addr.addressType || 'current',
          isPrimary: addr.isPrimary || false,
        }));

        // Always update local addresses state with what we just saved
        setAddresses(savedAddresses);

        // Update userData, ensuring addresses array is always included
        if (res.data) {
          // Check if backend returned addresses
          if (res.data.addresses && Array.isArray(res.data.addresses) && res.data.addresses.length === savedAddresses.length) {
            // Backend returned all addresses, verify and use them
            const backendAddresses = res.data.addresses.map(addr => ({
              street: addr.street || '',
              city: addr.city || '',
              state: addr.state || '',
              zipCode: addr.zipCode || '',
              country: addr.country || 'USA',
              addressType: addr.addressType || 'current',
              isPrimary: addr.isPrimary || false,
            }));
            // Only use backend addresses if count matches
            if (backendAddresses.length === savedAddresses.length) {
              setAddresses(backendAddresses);
              setUserData({ ...res.data, addresses: backendAddresses });
            } else {
              // Backend returned wrong count, use what we saved
              setUserData({ ...res.data, addresses: savedAddresses });
            }
          } else {
            // Backend didn't return addresses or returned incomplete, use what we saved
            setUserData({ ...res.data, addresses: savedAddresses });
          }
        } else {
          // No data in response, just update addresses
          setUserData({ ...res.data, addresses: savedAddresses });
        }

        showSuccess(`Successfully saved ${savedAddresses.length} address(es)!`);
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save addresses.');
      }
    } catch (error) {
      console.error('Failed to save addresses:', error);
      showError('Failed to save addresses. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getAddressTypeLabel = (type) => {
    const labels = {
      current: 'Current Address',
      previous: 'Previous Address',
      mailing: 'Mailing Address',
      business: 'Business Address',
      other: 'Other',
    };
    return labels[type] || 'Address';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-xl">
            <MapPin className="h-7 w-7 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your delivery addresses</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {addresses.length > 0 && (
            <Button
              onClick={handleDeleteAll}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Delete All
            </Button>
          )}
          <Button onClick={handleAddNew} variant="success" leftIcon={<Plus className="w-4 h-4" />}>
            Add New Address
          </Button>
        </div>
      </div>

      {/* Addresses List */}
      {addresses.length > 0 ? (
        <div className={`grid gap-4 ${editingIndex !== null
          ? 'grid-cols-1'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
          {addresses.map((address, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-all border-2 ${editingIndex === index
                ? 'border-primary-400 bg-primary-50/50 shadow-md md:col-span-2 lg:col-span-3'
                : address.isPrimary
                  ? 'border-primary-500 bg-primary-50/30'
                  : 'border-gray-200 hover:border-primary-300'
                }`}
            >
              {editingIndex === index ? (
                // Edit Form - Full width when editing
                <Card.Content className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Edit className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Edit Address</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Update address details</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleUpdateAddress(index)}
                        leftIcon={<Save className="w-4 h-4" />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Street Address"
                          required
                          value={address.street}
                          onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                          placeholder="Enter street address"
                        />
                      </div>
                      <Input
                        label="City"
                        required
                        value={address.city}
                        onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                        placeholder="Enter city"
                      />
                      <Input
                        label="State"
                        required
                        value={address.state}
                        onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                        placeholder="Enter state"
                      />
                      <Input
                        label="ZIP Code"
                        required
                        value={address.zipCode}
                        onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                        placeholder="Enter ZIP code"
                      />
                      <Input
                        label="Country"
                        value={address.country}
                        onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                        placeholder="Enter country"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Type
                        </label>
                        <select
                          value={address.addressType}
                          onChange={(e) => handleAddressChange(index, 'addressType', e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-colors"
                        >
                          <option value="current">Current Address</option>
                          <option value="previous">Previous Address</option>
                          <option value="mailing">Mailing Address</option>
                          <option value="business">Business Address</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center pt-4 border-t border-gray-200">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={address.isPrimary}
                          onChange={(e) => handleAddressChange(index, 'isPrimary', e.target.checked)}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 transition-colors cursor-pointer"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">Set as Default Address</span>
                          <span className="text-xs text-gray-500">This will be your primary delivery address</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </Card.Content>
              ) : (
                // Display View - Flipkart Style
                <Card.Content className="p-5">
                  {/* Default Badge */}
                  {address.isPrimary && (
                    <div className="absolute top-3 right-3">
                      <Badge color="green" size="sm" className="bg-green-600 text-white">
                        DEFAULT
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Address Type */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                        {getAddressTypeLabel(address.addressType)}
                      </span>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 text-base leading-tight">
                        {address.street || 'No street address'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city || 'N/A'}, {address.state || 'N/A'} {address.zipCode || ''}
                      </p>
                      {address.country && address.country !== 'USA' && (
                        <p className="text-sm text-gray-500">{address.country}</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200">
                      {!address.isPrimary && (
                        <button
                          onClick={() => handleSetAsDefault(index)}
                          className="px-3 py-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded border border-primary-300 transition-colors"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card.Content>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Content className="p-8 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No addresses added yet. Click "Add Address" to get started.</p>
          </Card.Content>
        </Card>
      )}

      {/* Add New Address Form */}
      {showAddForm && (
        <Card className="border-2 border-primary-200 bg-primary-50/30">
          <Card.Content className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  required
                  value={newAddress.street}
                  onChange={(e) => handleNewAddressChange('street', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              <Input
                label="City"
                required
                value={newAddress.city}
                onChange={(e) => handleNewAddressChange('city', e.target.value)}
                placeholder="Enter city"
              />
              <Input
                label="State"
                required
                value={newAddress.state}
                onChange={(e) => handleNewAddressChange('state', e.target.value)}
                placeholder="Enter state"
              />
              <Input
                label="ZIP Code"
                required
                value={newAddress.zipCode}
                onChange={(e) => handleNewAddressChange('zipCode', e.target.value)}
                placeholder="Enter ZIP code"
              />
              <Input
                label="Country"
                value={newAddress.country}
                onChange={(e) => handleNewAddressChange('country', e.target.value)}
                placeholder="Enter country"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <select
                  value={newAddress.addressType}
                  onChange={(e) => handleNewAddressChange('addressType', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="current">Current Address</option>
                  <option value="previous">Previous Address</option>
                  <option value="mailing">Mailing Address</option>
                  <option value="business">Business Address</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newAddress.isPrimary || addresses.length === 0}
                    onChange={(e) => handleNewAddressChange('isPrimary', e.target.checked)}
                    disabled={addresses.length === 0}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Set as Default Address {addresses.length === 0 && '(First address will be default)'}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button onClick={handleSaveNew} leftIcon={<Plus className="w-4 h-4" />}>
                Add Address
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Save All Button */}
      {addresses.length > 0 && (
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

// Contact Information Form Component
const ContactInformationForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    alternateEmail: '',
    alternatePhone: '',
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email || '',
        mobileNumber: userData.mobileNumber || '',
        alternateEmail: userData.alternateEmail || '',
        alternatePhone: userData.alternatePhone || '',
      });
    }
  }, [userData]);

  const handleSave = async () => {
    // Validate required fields
    if (!formData.mobileNumber || !formData.mobileNumber.trim()) {
      showError('Phone Number is required');
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        mobileNumber: formData.mobileNumber,
        alternateEmail: formData.alternateEmail,
        alternatePhone: formData.alternatePhone,
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Contact information saved successfully!');
        setUserData(res.data);
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save contact information.');
      }
    } catch (error) {
      console.error('Failed to save contact information:', error);
      showError('Failed to save contact information. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="p-3 bg-indigo-100 rounded-xl">
          <Mail className="h-7 w-7 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          <p className="text-sm text-gray-500 mt-1">Update your contact details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          required
          value={formData.email}
          disabled
          className="bg-gray-50"
        />
        <Input
          label="Phone Number"
          type="tel"
          required
          value={formData.mobileNumber}
          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
          placeholder="+1 (415) 223-1315"
        />
        <Input
          label="Alternate Email"
          type="email"
          value={formData.alternateEmail}
          onChange={(e) => setFormData({ ...formData, alternateEmail: e.target.value })}
          placeholder="alternate.email@example.com"
        />
        <Input
          label="Alternate Phone"
          type="tel"
          value={formData.alternatePhone}
          onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
          placeholder="+1 (415) 223-1315"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

// Identity Verification Form Component
const IdentityVerificationForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    licenseNumber: '',
    stateOfIssue: '',
    expirationDate: '',
    licenseDocument: null,
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        licenseNumber: userData.identityVerification?.licenseNumber || '',
        stateOfIssue: userData.identityVerification?.stateOfIssue || '',
        expirationDate: userData.identityVerification?.expirationDate ? new Date(userData.identityVerification.expirationDate).toISOString().split('T')[0] : '',
        licenseDocument: null,
      });
    }
  }, [userData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, licenseDocument: file });
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.licenseNumber || !formData.licenseNumber.trim()) {
      showError('Driver\'s License Number is required');
      return;
    }
    if (!formData.stateOfIssue || !formData.stateOfIssue.trim()) {
      showError('State of Issue is required');
      return;
    }
    if (!formData.expirationDate) {
      showError('Expiration Date is required');
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        identityVerification: {
          licenseNumber: formData.licenseNumber,
          stateOfIssue: formData.stateOfIssue,
          expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
          // Note: File upload would need to be handled separately via document upload API
          // For now, we save the text fields
        },
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Identity verification information saved successfully!');
        setUserData(res.data);
        // TODO: Handle file upload separately if needed
        if (formData.licenseDocument) {
          showSuccess('License information saved. Please upload the document separately.');
        }
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save identity verification.');
      }
    } catch (error) {
      console.error('Failed to save identity verification:', error);
      showError('Failed to save identity verification. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="p-3 bg-red-100 rounded-xl">
          <Shield className="h-7 w-7 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
          <p className="text-sm text-gray-500 mt-1">Upload your driver's license for verification</p>
        </div>
      </div>

      <div className="space-y-6">
        <Input
          label="Driver's License Number"
          required
          value={formData.licenseNumber}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          placeholder="Enter license number"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="State of Issue"
            required
            value={formData.stateOfIssue}
            onChange={(e) => setFormData({ ...formData, stateOfIssue: e.target.value })}
            placeholder="Enter state"
          />
          <Input
            label="Expiration Date"
            type="date"
            required
            value={formData.expirationDate}
            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
          />
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Driver's License <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:cursor-pointer file:transition-colors"
            />
          </div>
          {formData.licenseDocument && (
            <p className="mt-2 text-xs text-green-600 font-medium">
              Selected: {formData.licenseDocument.name}
            </p>
          )}
          <p className="mt-3 text-xs text-gray-500">
            Upload a clear image or PDF of your driver's license (Max 5MB)
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

// Bank Details Form Component
const BankDetailsForm = ({ userData, setUserData, saving, setSaving, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountType: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        bankName: userData.bankDetails?.bankName || '',
        accountType: userData.bankDetails?.accountType || '',
        accountNumber: userData.bankDetails?.accountNumber || '',
        routingNumber: userData.bankDetails?.routingNumber || '',
        accountHolderName: userData.bankDetails?.accountHolderName || '',
      });
    }
  }, [userData]);

  const handleSave = async () => {
    // Validate required fields
    if (!formData.bankName || !formData.bankName.trim()) {
      showError('Bank Name is required');
      return;
    }
    if (!formData.accountType) {
      showError('Account Type is required');
      return;
    }
    if (!formData.accountNumber || !formData.accountNumber.trim()) {
      showError('Account Number is required');
      return;
    }
    if (!formData.routingNumber || !formData.routingNumber.trim()) {
      showError('Routing Number is required');
      return;
    }
    if (!formData.accountHolderName || !formData.accountHolderName.trim()) {
      showError('Account Holder Name is required');
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        bankDetails: {
          bankName: formData.bankName,
          accountType: formData.accountType,
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber,
          accountHolderName: formData.accountHolderName,
        },
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Bank details saved successfully!');
        setUserData(res.data);
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save bank details.');
      }
    } catch (error) {
      console.error('Failed to save bank details:', error);
      showError('Failed to save bank details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="p-3 bg-teal-100 rounded-xl">
          <Building className="h-7 w-7 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
          <p className="text-sm text-gray-500 mt-1">Banking information for tax refund direct deposit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Bank Name"
          required
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          placeholder="Enter bank name"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.accountType}
            onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">Select account type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
        </div>
        <Input
          label="Account Number"
          type="password"
          required
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          placeholder="Enter account number"
        />
        <Input
          label="Routing Number"
          required
          value={formData.routingNumber}
          onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
          placeholder="Enter routing number"
        />
        <div className="md:col-span-2">
          <Input
            label="Account Holder Name"
            required
            value={formData.accountHolderName}
            onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
            placeholder="Enter account holder name"
          />
        </div>
      </div>

      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Secure & Encrypted</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              Your bank details are encrypted and securely stored. This information is used exclusively for tax refund direct deposit.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          variant="secondary"
          disabled={saving}
          onClick={() => {
            // Reset form to original userData
            if (userData) {
              setFormData({
                bankName: userData.bankDetails?.bankName || '',
                accountType: userData.bankDetails?.accountType || '',
                accountNumber: userData.bankDetails?.accountNumber || '',
                routingNumber: userData.bankDetails?.routingNumber || '',
                accountHolderName: userData.bankDetails?.accountHolderName || '',
              });
            }
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
          {saving ? 'Saving...' : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
};

export default AccountInformation;
