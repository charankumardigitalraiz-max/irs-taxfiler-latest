import React, { useState, useEffect, useRef } from 'react';
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
  Home,
  Users,
  FileText,
  Save,
  X,
  Trash2,
  Edit,
  Plus,
  Check,
  Globe,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import PageLoader from '../components/common/PageLoader';
import { userService } from '../services/userService';
import { documentService } from '../services/documentService';
import { getDocumentUrl } from '../utils/documentUrl';
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
      blue: isActive ? 'bg-[#127EAB] text-white' : 'bg-[#E9F7FA] text-[#127EAB]',
      purple: isActive ? 'bg-teal text-white' : 'bg-background-aqua text-teal',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600',
      red: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600',
      teal: isActive ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600',
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return <PageLoader variant="account" />;
  }

  return (
    <div className="space-y-4 irs-page-enter">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
        <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight">Account Information</h2>
        <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
          Complete your account information to proceed with tax filing. All information is securely stored.
        </p>
      </div>

      {/* Note: Default items-stretch gives the left column full height of the right form so lg:sticky works natively */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Navigation — Fixed 260px width on desktop so tab labels never truncate */}
        <div className="w-full lg:w-[260px] shrink-0">
          <Card padding="none" className="lg:sticky lg:top-20 p-2.5">
            <h3 className="px-2 text-[11px] font-semibold text-[#6F7F8E] uppercase tracking-wider mb-2.5">
              Information Sections
            </h3>
            <div className="space-y-1.5">
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
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md border transition-colors duration-150 text-left ${isDisabled
                      ? 'bg-slate-50 border-transparent text-slate-400 cursor-not-allowed opacity-60'
                      : isActive
                        ? `${getColorClasses(section.color, true)} border-transparent shadow-sm cursor-pointer`
                        : 'bg-[#F8FBFD] border-transparent text-[#1F4264] hover:bg-[#E9F7FA]/70 hover:border-[#127EAB]/20 cursor-pointer'
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-150 ${isActive
                        ? 'bg-white/20 text-white'
                        : getColorClasses(section.color, false)
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block text-[13px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-[#1F4264]'
                          }`}
                      >
                        {section.id}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 transition-opacity duration-150 ${isActive ? 'opacity-90 text-white' : 'opacity-0'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 pt-4 px-1 border-t border-[#E6F0F5]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1F4264]">Progress</span>
                <span className="text-xs font-semibold text-[#127EAB]">
                  {completedSections.length}/{sections.length}
                </span>
              </div>
              <div className="w-full bg-[#E6F0F5] rounded-full h-2 mb-2 overflow-hidden">
                {completedSections.length === sections.length ? (
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: '100%' }}
                  />
                ) : (
                  <div
                    className="bg-gradient-to-r from-[#1F4264] to-[#127EAB] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
                  />
                )}
              </div>
              {completedSections.length === sections.length ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>All Information Complete</span>
                </div>
              ) : (
                <p className="text-[11.5px] text-[#6F7F8E] font-medium">
                  {completedSections.length === 0
                    ? 'Start filling your information'
                    : `${completedSections.length} of ${sections.length} sections completed`}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
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
      <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="w-9 h-9 rounded-md bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center shrink-0">
          <UserCircle className="h-5 w-5 text-[#127EAB]" />
        </div>
        <div>
          <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
            Taxpayer Profile
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
            Enter your personal information and filing status
          </p>
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
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
      <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="w-9 h-9 rounded-md bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center shrink-0">
          <Users className="h-5 w-5 text-[#127EAB]" />
        </div>
        <div>
          <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
            Spouse Details
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
            Enter your spouse's personal information
          </p>
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
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#ECFDF5] border border-[#059669]/20 flex items-center justify-center shrink-0">
            <UserCircle className="h-5 w-5 text-[#059669]" />
          </div>
          <div>
            <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
              Dependent Details
            </h2>
            <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
              Add information for your dependents
            </p>
          </div>
        </div>
        <Button onClick={addDependent} variant="success" size="sm" leftIcon={<Users className="w-4 h-4" />}>
          Add Dependent
        </Button>
      </div>

      <div className="space-y-4">
        {dependents.map((dependent, index) => (
          <div key={index} className="p-6 border-2 border-gray-200 rounded-md bg-gradient-to-br from-gray-50 to-white hover:border-primary-300 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Dependent {index + 1}</h3>
              </div>
              {dependents.length > 1 && (
                <button
                  onClick={() => removeDependent(index)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md font-medium transition-colors"
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
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
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
  const [zipError, setZipError] = useState('');
  const [editZipErrors, setEditZipErrors] = useState({});
  const { showSuccess, showError } = useToast();

  // Validates US ZIP code (5 digits or 5+4 e.g. 12345-6789) or PIN code (6 digits e.g. 500081)
  const isValidZipCode = (code) => {
    if (!code) return false;
    const trimmed = String(code).trim();
    return /^(\d{5}(-\d{4})?|\d{6})$/.test(trimmed);
  };

  // Helper to check if an address object actually has user-entered values (ignores default { country: 'USA' })
  const hasRealAddressData = (addr) => {
    if (!addr || typeof addr !== 'object') return false;
    return Boolean(
      (addr.street && addr.street.trim()) ||
      (addr.city && addr.city.trim()) ||
      (addr.state && addr.state.trim()) ||
      (addr.zipCode && addr.zipCode.trim())
    );
  };

  // Only load addresses from userData on initial mount, not on every userData change
  useEffect(() => {
    if (userData && isInitialLoad) {
      // Only load on initial mount
      setIsInitialLoad(false);

      const validArrayAddresses = Array.isArray(userData.addresses)
        ? userData.addresses.filter(hasRealAddressData)
        : [];

      // Check if userData has real addresses array or real single address
      if (validArrayAddresses.length > 0) {
        setAddresses(validArrayAddresses.map(addr => ({
          street: addr.street || '',
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zipCode || '',
          country: addr.country || 'USA',
          addressType: addr.addressType || 'current',
          isPrimary: addr.isPrimary || false,
        })));
      } else if (hasRealAddressData(userData.address)) {
        // Single address (backward compatibility) - only when real address data exists
        setAddresses([{
          street: userData.address.street || '',
          city: userData.address.city || '',
          state: userData.address.state || '',
          zipCode: userData.address.zipCode || '',
          country: userData.address.country || 'USA',
          addressType: 'current',
          isPrimary: true,
        }]);
      } else {
        // No real addresses saved yet
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
    setZipError('');
    setEditZipErrors({});
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
    setZipError('');
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

  // Centralized address persistence helper that synchronizes with the backend database
  const persistAddresses = async (targetAddresses, successMsg = 'Address saved successfully!') => {
    // Sanitize and filter addresses
    const validAddresses = (targetAddresses || [])
      .filter(addr => addr && typeof addr === 'object')
      .map(addr => ({
        street: (addr.street || '').trim(),
        city: (addr.city || '').trim(),
        state: (addr.state || '').trim(),
        zipCode: (addr.zipCode || '').trim(),
        country: addr.country || 'USA',
        addressType: addr.addressType || 'current',
        isPrimary: Boolean(addr.isPrimary),
      }))
      .filter(addr => addr.street || addr.city || addr.state || addr.zipCode);

    // If there is at least one address, ensure exactly one is marked as primary
    if (validAddresses.length > 0) {
      const hasPrimary = validAddresses.some(a => a.isPrimary);
      if (!hasPrimary) {
        validAddresses[0].isPrimary = true;
      }
    }

    try {
      setSaving(true);
      const primaryAddress = validAddresses.find(a => a.isPrimary) || (validAddresses.length > 0 ? validAddresses[0] : null);
      const updateData = {
        addresses: validAddresses,
        address: primaryAddress,
      };

      const res = await userService.updateProfile(updateData);
      if (res && res.success) {
        const returnedAddresses = Array.isArray(res.data?.addresses) && res.data.addresses.length > 0
          ? res.data.addresses.map(addr => ({
            street: addr.street || '',
            city: addr.city || '',
            state: addr.state || '',
            zipCode: addr.zipCode || '',
            country: addr.country || 'USA',
            addressType: addr.addressType || 'current',
            isPrimary: Boolean(addr.isPrimary),
          }))
          : validAddresses;

        setAddresses(returnedAddresses);
        if (setUserData && res.data) {
          setUserData(prev => ({
            ...prev,
            ...res.data,
            addresses: returnedAddresses,
            address: primaryAddress,
          }));
        }
        if (successMsg) {
          showSuccess(successMsg);
        }
        return { success: true, data: res.data };
      } else {
        const errMsg = res?.message || 'Failed to save address.';
        showError(errMsg);
        return { success: false, message: errMsg };
      }
    } catch (error) {
      console.error('Error saving address to backend:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to save address. Please try again.';
      showError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNew = async () => {
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
      setZipError('ZIP / PIN code is required');
      showError('ZIP / PIN code is required');
      return;
    }
    if (!isValidZipCode(newAddress.zipCode)) {
      setZipError('Please enter a valid 5-digit ZIP code or 6-digit PIN code');
      showError('Please enter a valid 5-digit ZIP code or 6-digit PIN code');
      return;
    }

    const trimmedZip = newAddress.zipCode.trim();
    const updatedAddresses = [...addresses];
    const isFirstAddress = updatedAddresses.length === 0;
    const shouldBePrimary = isFirstAddress || Boolean(newAddress.isPrimary);

    if (shouldBePrimary) {
      updatedAddresses.forEach(addr => { addr.isPrimary = false; });
    }

    const createdAddress = {
      street: newAddress.street.trim(),
      city: newAddress.city.trim(),
      state: newAddress.state.trim(),
      zipCode: trimmedZip,
      country: newAddress.country || 'USA',
      addressType: newAddress.addressType || 'current',
      isPrimary: shouldBePrimary,
    };

    const targetAddresses = [...updatedAddresses, createdAddress];
    const result = await persistAddresses(targetAddresses, 'Address added and saved successfully!');

    if (result.success) {
      setShowAddForm(false);
      setZipError('');
      setNewAddress({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        addressType: 'current',
        isPrimary: false,
      });
    }
  };

  const handleUpdateAddress = async (index) => {
    const addr = addresses[index];
    if (addr) {
      if (!addr.street || !addr.street.trim()) {
        showError('Street Address is required');
        return;
      }
      if (!addr.city || !addr.city.trim()) {
        showError('City is required');
        return;
      }
      if (!addr.state || !addr.state.trim()) {
        showError('State is required');
        return;
      }
      if (!addr.zipCode || !addr.zipCode.trim()) {
        setEditZipErrors(prev => ({ ...prev, [index]: 'ZIP / PIN code is required' }));
        showError('ZIP / PIN code is required');
        return;
      }
      if (!isValidZipCode(addr.zipCode)) {
        setEditZipErrors(prev => ({ ...prev, [index]: 'Please enter a valid 5-digit ZIP code or 6-digit PIN code' }));
        showError('Please enter a valid 5-digit ZIP code or 6-digit PIN code');
        return;
      }
    }

    const result = await persistAddresses(addresses, 'Address updated successfully!');
    if (result.success) {
      setEditZipErrors(prev => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
      setEditingIndex(null);
    }
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

  const handleDelete = async (index) => {
    const addressToDelete = addresses[index];
    const confirmMessage = `Are you sure you want to delete this address?\n\n${addressToDelete.street}\n${addressToDelete.city}, ${addressToDelete.state} ${addressToDelete.zipCode}`;

    if (window.confirm(confirmMessage)) {
      const updated = addresses.filter((_, i) => i !== index);
      // If we removed the primary address, make the first one primary
      if (addresses[index]?.isPrimary && updated.length > 0) {
        updated[0].isPrimary = true;
      }
      const result = await persistAddresses(updated, 'Address deleted successfully!');
      if (result.success && editingIndex === index) {
        setEditingIndex(null);
      }
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

  const handleSetAsDefault = async (index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      isPrimary: i === index,
    }));
    await persistAddresses(updated, 'Default address updated successfully!');
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
        showError(`Address ${displayIndex}: ZIP / PIN code is required`);
        return;
      }
      if (!isValidZipCode(addr.zipCode)) {
        showError(`Address ${displayIndex}: Please enter a valid 5-digit ZIP code or 6-digit PIN code`);
        return;
      }
    }

    const result = await persistAddresses(validAddresses, `Successfully saved ${validAddresses.length} address(es)!`);
    if (result.success && onSaveSuccess) {
      onSaveSuccess(result.data);
    }
  };

  const getAddressTypeLabel = (type) => {
    const labels = {
      current: 'Current Address',
      previous: 'Previous Address',
      mailing: 'Mailing Address',
      business: 'Business Address',
      other: 'Other Address',
    };
    return labels[type] || 'Address';
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'current':
        return <Home className="w-4 h-4" />;
      case 'mailing':
        return <Mail className="w-4 h-4" />;
      case 'business':
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#FEF4F2] border border-[#EE6450]/20 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-[#EE6450]" />
          </div>
          <div>
            <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
              Saved Addresses
            </h2>
            <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
              Manage your current and mailing addresses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {addresses.length > 0 && (
            <Button
              onClick={handleDeleteAll}
              variant="secondary"
              size="sm"
              disabled={saving}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300"
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Delete All
            </Button>
          )}
          <Button onClick={handleAddNew} variant="success" size="sm" disabled={saving} leftIcon={<Plus className="w-4 h-4" />}>
            Add New Address
          </Button>
        </div>
      </div>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`relative rounded-xl transition-all duration-150 flex flex-col justify-between ${address.isPrimary
                  ? 'border-2 border-[#127EAB] bg-white shadow-xs'
                  : 'border border-gray-200 bg-white hover:border-gray-300 shadow-xs'
                }`}
            >
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  {/* Header Row: Type Icon + Labels + Default Pill */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${address.isPrimary
                            ? 'bg-[#EAF5FA] text-[#127EAB]'
                            : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        {getAddressIcon(address.addressType)}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {getAddressTypeLabel(address.addressType)}
                      </h4>
                    </div>

                    {address.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Default
                      </span>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="text-sm text-gray-600 space-y-1 mb-4 pl-0.5">
                    <p className="font-medium text-gray-900 leading-snug break-words">
                      {address.street || 'No street address provided'}
                    </p>
                    <p className="leading-relaxed text-gray-600">
                      {address.city || 'N/A'}, {address.state || 'N/A'} {address.zipCode || ''}
                    </p>
                    {address.country && address.country !== 'USA' && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 pt-0.5">
                        <Globe className="w-3.5 h-3.5 text-gray-400" />
                        <span>{address.country}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                  <div>
                    {!address.isPrimary && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleSetAsDefault(index)}
                        className="text-xs font-medium text-[#127EAB] hover:text-[#0E6083] hover:underline transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Set as default
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleEdit(index)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                      title="Edit address"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleDelete(index)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No Addresses Saved Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4 font-normal">
            Add your primary residential or mailing address to ensure accurate tax filing.
          </p>
          <Button onClick={handleAddNew} variant="success" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Address Now
          </Button>
        </div>
      )}

      {/* Add New Address Modal */}
      <Modal
        isOpen={showAddForm}
        onClose={handleCancelEdit}
        title="Add New Address"
        description="Enter your address details for tax filing and IRS correspondence"
        icon={<MapPin className="w-5 h-5 text-[#127EAB]" />}
        size="lg"
      >
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
            label="ZIP / PIN Code"
            required
            maxLength={10}
            value={newAddress.zipCode}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d-]/g, '').slice(0, 10);
              handleNewAddressChange('zipCode', val);
              if (zipError && isValidZipCode(val)) {
                setZipError('');
              }
            }}
            onBlur={() => {
              if (newAddress.zipCode && !isValidZipCode(newAddress.zipCode)) {
                setZipError('Enter a valid 5-digit ZIP or 6-digit PIN');
              } else {
                setZipError('');
              }
            }}
            error={zipError}
            placeholder="e.g. 12345 or 500081"
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
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white"
            >
              <option value="current">Current Address</option>
              <option value="previous">Previous Address</option>
              <option value="mailing">Mailing Address</option>
              <option value="business">Business Address</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center pt-2 md:col-span-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={newAddress.isPrimary || addresses.length === 0}
                onChange={(e) => handleNewAddressChange('isPrimary', e.target.checked)}
                disabled={addresses.length === 0}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-[#127EAB] disabled:opacity-50 cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-700">
                Set as Default Address {addresses.length === 0 && '(First address is default)'}
              </span>
            </label>
          </div>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSaveNew} disabled={saving} leftIcon={<Plus className="w-4 h-4" />}>
            {saving ? 'Adding...' : 'Add Address'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Address Modal */}
      {editingIndex !== null && addresses[editingIndex] && (
        <Modal
          isOpen={true}
          onClose={handleCancelEdit}
          title="Edit Address"
          description="Update your address details below"
          icon={<Edit className="w-5 h-5 text-[#127EAB]" />}
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                required
                value={addresses[editingIndex].street}
                onChange={(e) => handleAddressChange(editingIndex, 'street', e.target.value)}
                placeholder="Enter street address"
              />
            </div>
            <Input
              label="City"
              required
              value={addresses[editingIndex].city}
              onChange={(e) => handleAddressChange(editingIndex, 'city', e.target.value)}
              placeholder="Enter city"
            />
            <Input
              label="State"
              required
              value={addresses[editingIndex].state}
              onChange={(e) => handleAddressChange(editingIndex, 'state', e.target.value)}
              placeholder="Enter state"
            />
            <Input
              label="ZIP / PIN Code"
              required
              maxLength={10}
              value={addresses[editingIndex].zipCode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d-]/g, '').slice(0, 10);
                handleAddressChange(editingIndex, 'zipCode', val);
                if (editZipErrors[editingIndex] && isValidZipCode(val)) {
                  setEditZipErrors(prev => ({ ...prev, [editingIndex]: '' }));
                }
              }}
              onBlur={() => {
                if (addresses[editingIndex].zipCode && !isValidZipCode(addresses[editingIndex].zipCode)) {
                  setEditZipErrors(prev => ({ ...prev, [editingIndex]: 'Enter a valid 5-digit ZIP or 6-digit PIN' }));
                } else {
                  setEditZipErrors(prev => ({ ...prev, [editingIndex]: '' }));
                }
              }}
              error={editZipErrors[editingIndex]}
              placeholder="e.g. 12345 or 500081"
            />
            <Input
              label="Country"
              value={addresses[editingIndex].country}
              onChange={(e) => handleAddressChange(editingIndex, 'country', e.target.value)}
              placeholder="Enter country"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <select
                value={addresses[editingIndex].addressType}
                onChange={(e) => handleAddressChange(editingIndex, 'addressType', e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent bg-white transition-colors"
              >
                <option value="current">Current Address</option>
                <option value="previous">Previous Address</option>
                <option value="mailing">Mailing Address</option>
                <option value="business">Business Address</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-center pt-2 md:col-span-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addresses[editingIndex].isPrimary}
                  onChange={(e) => handleAddressChange(editingIndex, 'isPrimary', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-[#127EAB] focus:ring-2 transition-colors cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Set as Default Address
                </span>
              </label>
            </div>
          </div>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEdit} disabled={saving}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => handleUpdateAddress(editingIndex)}
              leftIcon={<Save className="w-4 h-4" />}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Modal>
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
  const [errors, setErrors] = useState({});
  const { showSuccess, showError } = useToast();

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Format phone number and strictly prevent invalid characters or entering beyond maximum digits
  const formatPhoneInput = (val) => {
    if (!val) return '';
    const trimmed = val.trimStart();
    const hasPlus = trimmed.startsWith('+');
    // Extract only digits and strictly limit to 15 digits (E.164 max limit)
    const digits = val.replace(/\D/g, '').slice(0, 15);

    if (!digits) {
      return hasPlus ? '+' : '';
    }

    if (hasPlus) {
      if (digits.startsWith('1')) {
        const us = digits.slice(1, 11); // max 10 US digits
        if (us.length === 0) return '+1 ';
        if (us.length <= 3) return `+1 (${us}`;
        if (us.length <= 6) return `+1 (${us.slice(0, 3)}) ${us.slice(3)}`;
        return `+1 (${us.slice(0, 3)}) ${us.slice(3, 6)}-${us.slice(6)}`;
      }
      if (digits.length <= 3) return `+${digits}`;
      if (digits.length <= 7) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 12) return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
      return `+${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    }

    if (digits.length <= 10) {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    if (digits.length === 11 && digits.startsWith('1')) {
      const us = digits.slice(1);
      return `+1 (${us.slice(0, 3)}) ${us.slice(3, 6)}-${us.slice(6)}`;
    }

    return digits;
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email || '',
        mobileNumber: formatPhoneInput(userData.mobileNumber || ''),
        alternateEmail: userData.alternateEmail || '',
        alternatePhone: formatPhoneInput(userData.alternatePhone || ''),
      });
    }
  }, [userData]);

  const validateField = (field, value, currentFormData = formData) => {
    const trimmed = (value || '').trim();

    if (field === 'mobileNumber') {
      if (!trimmed) {
        return 'Phone Number is required';
      }
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 10) {
        return 'Please enter a valid phone number (at least 10 digits)';
      }
      return '';
    }

    if (field === 'alternateEmail') {
      if (!trimmed) return '';
      if (!EMAIL_REGEX.test(trimmed)) {
        return 'Please enter a valid email address';
      }
      if (currentFormData.email && trimmed.toLowerCase() === currentFormData.email.trim().toLowerCase()) {
        return 'Alternate email cannot be the same as primary email';
      }
      return '';
    }

    if (field === 'alternatePhone') {
      if (!trimmed) return '';
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 10) {
        return 'Please enter a valid phone number (at least 10 digits)';
      }
      const primaryDigits = (currentFormData.mobileNumber || '').replace(/\D/g, '');
      if (primaryDigits && digits === primaryDigits) {
        return 'Alternate phone cannot be the same as primary phone';
      }
      return '';
    }

    return '';
  };

  const validateAll = () => {
    const newErrors = {};

    const mobileErr = validateField('mobileNumber', formData.mobileNumber);
    if (mobileErr) newErrors.mobileNumber = mobileErr;

    const altEmailErr = validateField('alternateEmail', formData.alternateEmail);
    if (altEmailErr) newErrors.alternateEmail = altEmailErr;

    const altPhoneErr = validateField('alternatePhone', formData.alternatePhone);
    if (altPhoneErr) newErrors.alternatePhone = altPhoneErr;

    setErrors(newErrors);
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhoneChange = (field, rawValue) => {
    // Strictly format and limit digits - wrong characters are filtered automatically
    const formatted = formatPhoneInput(rawValue);
    handleFieldChange(field, formatted);
  };

  const handleBlur = (field) => {
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleSave = async () => {
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showError(firstError);
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        mobileNumber: formData.mobileNumber.trim(),
        alternateEmail: formData.alternateEmail.trim(),
        alternatePhone: formData.alternatePhone.trim(),
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
      <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="w-9 h-9 rounded-md bg-[#EEF2FF] border border-[#4F46E5]/20 flex items-center justify-center shrink-0">
          <Mail className="h-5 w-5 text-[#4F46E5]" />
        </div>
        <div>
          <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
            Contact Information
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
            Update your email and phone contact details
          </p>
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
          helperText="Primary email linked to your account"
        />
        <Input
          label="Phone Number"
          type="tel"
          required
          maxLength={18}
          value={formData.mobileNumber}
          onChange={(e) => handlePhoneChange('mobileNumber', e.target.value)}
          onBlur={() => handleBlur('mobileNumber')}
          error={errors.mobileNumber}
          placeholder="+1 (415) 223-1315"
          helperText="Format: (415) 223-1315 or +1 (415) 223-1315"
        />
        <Input
          label="Alternate Email"
          type="email"
          value={formData.alternateEmail}
          onChange={(e) => handleFieldChange('alternateEmail', e.target.value)}
          onBlur={() => handleBlur('alternateEmail')}
          error={errors.alternateEmail}
          placeholder="alternate.email@example.com"
          helperText="Optional backup email for tax updates"
        />
        <Input
          label="Alternate Phone"
          type="tel"
          maxLength={18}
          value={formData.alternatePhone}
          onChange={(e) => handlePhoneChange('alternatePhone', e.target.value)}
          onBlur={() => handleBlur('alternatePhone')}
          error={errors.alternatePhone}
          placeholder="+1 (415) 223-1315"
          helperText="Optional secondary contact number"
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
    existingDocument: '',
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (userData) {
      setFormData({
        licenseNumber: userData.identityVerification?.licenseNumber || '',
        stateOfIssue: userData.identityVerification?.stateOfIssue || '',
        expirationDate: userData.identityVerification?.expirationDate ? new Date(userData.identityVerification.expirationDate).toISOString().split('T')[0] : '',
        licenseDocument: null,
        existingDocument: userData.identityVerification?.licenseDocument || '',
      });
    }
  }, [userData]);

  const validateField = (field, value) => {
    if (field === 'licenseDocument') {
      if (!formData.licenseDocument && !formData.existingDocument) {
        return "Driver's License document is required";
      }
      return '';
    }

    const trimmed = typeof value === 'string' ? value.trim() : (value ? String(value).trim() : '');

    if (field === 'licenseNumber') {
      if (!trimmed) return "Driver's License Number is required";
      if (trimmed.length < 4) return "License Number must be at least 4 characters";
      return '';
    }

    if (field === 'stateOfIssue') {
      if (!trimmed) return 'State of Issue is required';
      if (trimmed.length < 2) return 'Please enter a valid state (e.g. CA, NY)';
      return '';
    }

    if (field === 'expirationDate') {
      if (!trimmed) return 'Expiration Date is required';
      return '';
    }

    return '';
  };

  const validateAll = () => {
    const newErrors = {};
    const licErr = validateField('licenseNumber', formData.licenseNumber);
    if (licErr) newErrors.licenseNumber = licErr;

    const stateErr = validateField('stateOfIssue', formData.stateOfIssue);
    if (stateErr) newErrors.stateOfIssue = stateErr;

    const expErr = validateField('expirationDate', formData.expirationDate);
    if (expErr) newErrors.expirationDate = expErr;

    const docErr = validateField('licenseDocument', formData.licenseDocument);
    if (docErr) newErrors.licenseDocument = docErr;

    setErrors(newErrors);
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('File size must be less than 5MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
        showError('Please select a valid image (PNG, JPG, WEBP) or PDF file');
        return;
      }
      setFormData((prev) => ({ ...prev, licenseDocument: file }));
      if (errors.licenseDocument) {
        setErrors((prev) => ({ ...prev, licenseDocument: '' }));
      }
    }
  };

  const handleSave = async () => {
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showError(firstError);
      return;
    }

    try {
      setSaving(true);
      setUploading(true);

      let uploadedDocPath = formData.existingDocument || '';

      // Upload file to document service if a new file was chosen
      if (formData.licenseDocument) {
        try {
          const uploadRes = await documentService.uploadDocument({
            documentType: 'DRIVER_LICENSE',
            file: formData.licenseDocument,
          });

          if (uploadRes && uploadRes.success) {
            uploadedDocPath = uploadRes.data?.filePath || uploadRes.data?.url || uploadedDocPath;
          } else {
            throw new Error(uploadRes?.message || 'Failed to upload document');
          }
        } catch (uploadErr) {
          console.error('Failed to upload driver license document:', uploadErr);
          showError('Failed to upload driver license document. Please try again.');
          setSaving(false);
          setUploading(false);
          return;
        }
      }

      // Update user profile with text info and uploaded document path
      const updateData = {
        identityVerification: {
          licenseNumber: formData.licenseNumber.trim(),
          stateOfIssue: formData.stateOfIssue.trim(),
          expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
          licenseDocument: uploadedDocPath || undefined,
        },
      };

      const res = await userService.updateProfile(updateData);
      if (res.success) {
        showSuccess('Identity verification saved successfully!');
        setUserData(res.data);
        setFormData((prev) => ({
          ...prev,
          existingDocument: res.data?.identityVerification?.licenseDocument || uploadedDocPath,
          licenseDocument: null,
        }));
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (onSaveSuccess) onSaveSuccess(res.data);
      } else {
        showError(res.message || 'Failed to save identity verification.');
      }
    } catch (error) {
      console.error('Failed to save identity verification:', error);
      showError('Failed to save identity verification. Please try again.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="w-9 h-9 rounded-md bg-[#FEF4F2] border border-[#EE6450]/20 flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-[#EE6450]" />
        </div>
        <div>
          <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
            Identity Verification
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
            Upload your driver's license for identity verification
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Input
          label="Driver's License Number"
          required
          value={formData.licenseNumber}
          onChange={(e) => handleFieldChange('licenseNumber', e.target.value.toUpperCase())}
          onBlur={() => handleBlur('licenseNumber')}
          error={errors.licenseNumber}
          placeholder="Enter license number"
          helperText="Alphanumeric driver's license or state ID number"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="State of Issue"
            required
            value={formData.stateOfIssue}
            onChange={(e) => handleFieldChange('stateOfIssue', e.target.value.toUpperCase())}
            onBlur={() => handleBlur('stateOfIssue')}
            error={errors.stateOfIssue}
            placeholder="e.g., CA, TX, NY"
            helperText="2-letter state code or issuing state"
          />
          <Input
            label="Expiration Date"
            type="date"
            required
            value={formData.expirationDate}
            onChange={(e) => handleFieldChange('expirationDate', e.target.value)}
            onBlur={() => handleBlur('expirationDate')}
            error={errors.expirationDate}
          />
        </div>

        {/* Upload Driver's License Document */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#1F4264]">
            Upload Driver's License <span className="text-[#EE6450]">*</span>
          </label>

          {/* Currently Uploaded Document Banner */}
          {formData.existingDocument && !formData.licenseDocument && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-emerald-900 truncate">
                    Driver's License Attached
                  </p>
                  <p className="text-xs text-emerald-700">
                    Document is securely uploaded and linked to your profile
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={getDocumentUrl(formData.existingDocument)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-300 rounded-md shadow-2xs hover:bg-emerald-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View
                </a>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#127EAB] hover:text-[#0E668B] bg-white border border-[#127EAB]/30 rounded-md shadow-2xs hover:bg-[#EAF5FA] transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Replace
                </button>
              </div>
            </div>
          )}

          {/* Newly Selected File Banner */}
          {formData.licenseDocument && (
            <div className="p-4 bg-[#EAF5FA] border border-[#127EAB]/30 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-[#127EAB] flex items-center justify-center shrink-0 text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1F4264] truncate">
                    {formData.licenseDocument.name}
                  </p>
                  <p className="text-xs text-[#5A6E82]">
                    {(formData.licenseDocument.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload on save
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, licenseDocument: null }));
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-white transition-colors cursor-pointer"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dropzone / Upload Box */}
          {(!formData.existingDocument || formData.licenseDocument) && !formData.licenseDocument && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 bg-slate-50/80 hover:bg-slate-50 rounded-lg border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                errors.licenseDocument
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-300 hover:border-[#127EAB]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#EAF5FA] text-[#127EAB] flex items-center justify-center mb-2.5">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#1F4264]">
                Click to browse or drag & drop driver's license
              </p>
              <p className="text-xs text-[#6F7F8E] mt-1">
                PNG, JPG, WEBP, or PDF up to 5MB
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {errors.licenseDocument && (
            <p className="mt-1 text-xs text-rose-600">{errors.licenseDocument}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} disabled={saving || uploading} leftIcon={<Save className="w-4 h-4" />}>
          {saving || uploading ? 'Uploading & Saving...' : 'Save & Continue'}
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
  const [errors, setErrors] = useState({});
  const [showAccountNumber, setShowAccountNumber] = useState(false);
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

  const validateField = (field, value) => {
    const trimmed = (value || '').trim();

    if (field === 'bankName') {
      if (!trimmed) return 'Bank Name is required';
      if (trimmed.length < 2) return 'Bank Name must be at least 2 characters';
      return '';
    }

    if (field === 'accountType') {
      if (!trimmed) return 'Please select an account type';
      return '';
    }

    if (field === 'accountNumber') {
      if (!trimmed) return 'Account Number is required';
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 4) return 'Account number must be between 4 and 17 digits';
      return '';
    }

    if (field === 'routingNumber') {
      if (!trimmed) return 'Routing Number is required';
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length !== 9) return 'Routing number must be exactly 9 digits';
      return '';
    }

    if (field === 'accountHolderName') {
      if (!trimmed) return 'Account Holder Name is required';
      if (trimmed.length < 2) return 'Account Holder Name must be at least 2 characters';
      return '';
    }

    return '';
  };

  const validateAll = () => {
    const newErrors = {};
    ['bankName', 'accountType', 'accountNumber', 'routingNumber', 'accountHolderName'].forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleSave = async () => {
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showError(firstError);
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        bankDetails: {
          bankName: formData.bankName.trim(),
          accountType: formData.accountType,
          accountNumber: formData.accountNumber.trim(),
          routingNumber: formData.routingNumber.trim(),
          accountHolderName: formData.accountHolderName.trim(),
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
      <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
        <div className="w-9 h-9 rounded-md bg-[#E9F7FA] border border-[#127EAB]/20 flex items-center justify-center shrink-0">
          <Building className="h-5 w-5 text-[#127EAB]" />
        </div>
        <div>
          <h2 className="text-[17px] sm:text-lg font-medium text-[#1F4264] tracking-tight leading-snug">
            Bank Details
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal mt-0.5">
            Banking information for tax refund direct deposit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Bank Name"
          required
          value={formData.bankName}
          onChange={(e) => handleFieldChange('bankName', e.target.value)}
          onBlur={() => handleBlur('bankName')}
          error={errors.bankName}
          placeholder="e.g., Chase, Bank of America"
          helperText="Official bank or financial institution name"
        />

        <div>
          <label className="block text-sm font-medium text-[#1F4264] mb-1">
            Account Type <span className="text-[#EE6450]">*</span>
          </label>
          <select
            value={formData.accountType}
            onChange={(e) => handleFieldChange('accountType', e.target.value)}
            onBlur={() => handleBlur('accountType')}
            className={`w-full px-3.5 py-2.5 text-sm text-[#1F4264] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-all bg-white cursor-pointer ${
              errors.accountType ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'border-[#CCDCE1]'
            }`}
          >
            <option value="">Select account type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
          {errors.accountType ? (
            <p className="mt-1 text-xs text-rose-600">{errors.accountType}</p>
          ) : (
            <p className="mt-1 text-xs text-[#6F7F8E]">Type of bank account for deposit</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-[#1F4264]">
              Account Number <span className="text-[#EE6450]">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#127EAB] hover:text-[#0E668B] transition-colors cursor-pointer"
            >
              {showAccountNumber ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          <Input
            type={showAccountNumber ? 'text' : 'password'}
            required
            maxLength={17}
            value={formData.accountNumber}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/\D/g, '').slice(0, 17);
              handleFieldChange('accountNumber', sanitized);
            }}
            onBlur={() => handleBlur('accountNumber')}
            error={errors.accountNumber}
            placeholder="Enter account number"
            helperText="4 to 17 digits numeric account number"
          />
        </div>

        <Input
          label="Routing Number"
          type="text"
          required
          maxLength={9}
          value={formData.routingNumber}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/\D/g, '').slice(0, 9);
            handleFieldChange('routingNumber', sanitized);
          }}
          onBlur={() => handleBlur('routingNumber')}
          error={errors.routingNumber}
          placeholder="9-digit routing number"
          helperText="9-digit ABA routing transit number"
        />

        <div className="md:col-span-2">
          <Input
            label="Account Holder Name"
            required
            value={formData.accountHolderName}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/[^a-zA-Z\s.'-]/g, '');
              handleFieldChange('accountHolderName', sanitized);
            }}
            onBlur={() => handleBlur('accountHolderName')}
            error={errors.accountHolderName}
            placeholder="Enter account holder name"
            helperText="Name exactly as it appears on bank records"
          />
        </div>
      </div>

      <div className="p-5 bg-gradient-to-br from-[#EFF9FB] to-[#E9F7FA] rounded-md border border-[#127EAB]/25">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-[#127EAB] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#1F4264] mb-1">Secure & Encrypted</p>
            <p className="text-xs text-[#1F4264] leading-relaxed">
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
            if (userData) {
              setFormData({
                bankName: userData.bankDetails?.bankName || '',
                accountType: userData.bankDetails?.accountType || '',
                accountNumber: userData.bankDetails?.accountNumber || '',
                routingNumber: userData.bankDetails?.routingNumber || '',
                accountHolderName: userData.bankDetails?.accountHolderName || '',
              });
            }
            setErrors({});
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
