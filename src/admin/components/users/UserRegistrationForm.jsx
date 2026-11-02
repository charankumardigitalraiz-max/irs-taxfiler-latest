import { useState } from 'react';
import { Phone, Save, UserCheck, Mail, Calendar, MapPin, Building, Baby, Users, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';

const UserRegistrationForm = ({
  user,
  userType,
  onCallClient,
  onSubmitToRegister,
  onSendOTP,
  onVerifyOTP,
  onDeleteUser,
}) => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    ssn: user?.ssn || '',
    dob: user?.dob || '',
    occupation: user?.occupation || '',
    filingStatus: user?.filingStatus || '',

    // Spouse Info
    spouseFirstName: user?.spouseFirstName || '',
    spouseLastName: user?.spouseLastName || '',
    spouseMiddleName: user?.spouseMiddleName || '',
    spouseSSN: user?.spouseSSN || '',
    spouseDOB: user?.spouseDOB || '',
    spouseOccupation: user?.spouseOccupation || '',
    spouseEmail: user?.spouseEmail || '',
    spousePhone: user?.spousePhone || '',

    // Dependents
    dependents: user?.dependents || [],

    // Bank Details
    bankName: user?.bankName || '',
    accountType: user?.accountType || '',
    routingNumber: user?.routingNumber || '',
    accountNumber: user?.accountNumber || '',

    // Address
    street: user?.street || '',
    apartment: user?.apartment || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'USA',
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const filingStatuses = [
    { value: '', label: 'Select Status' },
    { value: 'SINGLE', label: 'Single' },
    { value: 'MARRIED_FILING_JOINTLY', label: 'Married Filing Jointly' },
    { value: 'MARRIED_FILING_SEPARATELY', label: 'Married Filing Separately' },
    { value: 'HEAD_OF_HOUSEHOLD', label: 'Head of Household' },
    { value: 'QUALIFYING_WIDOW', label: 'Qualifying Widow(er)' },
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

  const accountTypes = [
    { value: '', label: 'Select Type' },
    { value: 'CHECKING', label: 'Checking' },
    { value: 'SAVINGS', label: 'Savings' },
  ];

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: UserCheck },
    { id: 'spouse', label: 'Spouse Info', icon: Users },
    { id: 'dependents', label: 'Dependents', icon: Baby },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'bank', label: 'Bank Details', icon: Building },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addDependent = () => {
    setFormData((prev) => ({
      ...prev,
      dependents: [
        ...prev.dependents,
        { id: Date.now(), firstName: '', lastName: '', ssn: '', dob: '', relationship: '' }
      ]
    }));
  };

  const removeDependent = (id) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.filter((d) => d.id !== id)
    }));
  };

  const updateDependent = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      )
    }));
  };

  const handleCallClient = () => {
    if (onCallClient) {
      onCallClient(user?.phone || user?.email);
    } else if (user?.phone) {
      window.location.href = `tel:${user.phone}`;
    }
  };

  const handleSendOtpClick = async () => {
    if (!onSendOTP) return;
    const targetEmail = formData.email || user?.email;
    if (!targetEmail) {
      showError('Email is required to send OTP');
      return;
    }
    await onSendOTP(targetEmail);
  };

  const handleVerifyOtpClick = async () => {
    if (!onVerifyOTP) return;
    const targetEmail = formData.email || user?.email;
    if (!targetEmail) {
      showError('Email is required to verify OTP');
      return;
    }
    if (!otp.trim()) {
      showError('Please enter the OTP');
      return;
    }
    setIsVerifyingOtp(true);
    try {
      await onVerifyOTP(targetEmail, otp.trim());
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmitToRegister = async () => {
    setIsSubmitting(true);
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        showError('Please fill in all required fields (First Name, Last Name, Email, Phone)');
        setIsSubmitting(false);
        return;
      }

      if (onSubmitToRegister) {
        await onSubmitToRegister({ ...formData, userId: user?.id });
      } else {
        // Default behavior - just log for now
        console.log('Submitting to register:', formData);
        showSuccess('User registration submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      showError('Error submitting registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Middle Name
        </label>
        <input
          type="text"
          value={formData.middleName}
          onChange={(e) => handleChange('middleName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter middle name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter last name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SSN
        </label>
        <input
          type="text"
          value={formData.ssn}
          onChange={(e) => handleChange('ssn', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="XXX-XX-XXXX"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => handleChange('dob', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          value={formData.occupation}
          onChange={(e) => handleChange('occupation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter occupation"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filing Status
        </label>
        <select
          value={formData.filingStatus}
          onChange={(e) => handleChange('filingStatus', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {filingStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderSpouseInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse First Name
        </label>
        <input
          type="text"
          value={formData.spouseFirstName}
          onChange={(e) => handleChange('spouseFirstName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse first name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Middle Name
        </label>
        <input
          type="text"
          value={formData.spouseMiddleName}
          onChange={(e) => handleChange('spouseMiddleName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse middle name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Last Name
        </label>
        <input
          type="text"
          value={formData.spouseLastName}
          onChange={(e) => handleChange('spouseLastName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse last name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse SSN
        </label>
        <input
          type="text"
          value={formData.spouseSSN}
          onChange={(e) => handleChange('spouseSSN', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="XXX-XX-XXXX"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Date of Birth
        </label>
        <input
          type="date"
          value={formData.spouseDOB}
          onChange={(e) => handleChange('spouseDOB', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Occupation
        </label>
        <input
          type="text"
          value={formData.spouseOccupation}
          onChange={(e) => handleChange('spouseOccupation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse occupation"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Email
        </label>
        <input
          type="email"
          value={formData.spouseEmail}
          onChange={(e) => handleChange('spouseEmail', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Phone
        </label>
        <input
          type="tel"
          value={formData.spousePhone}
          onChange={(e) => handleChange('spousePhone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter spouse phone"
        />
      </div>
    </div>
  );

  const renderDependents = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Add dependent information</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={addDependent}
        >
          Add Dependent
        </Button>
      </div>
      {formData.dependents.map((dependent, index) => (
        <div key={dependent.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Dependent {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeDependent(dependent.id)}
            >
              Remove
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={dependent.firstName}
              onChange={(e) => updateDependent(dependent.id, 'firstName', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="First Name"
            />
            <input
              type="text"
              value={dependent.lastName}
              onChange={(e) => updateDependent(dependent.id, 'lastName', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Last Name"
            />
            <input
              type="text"
              value={dependent.ssn}
              onChange={(e) => updateDependent(dependent.id, 'ssn', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="SSN"
            />
            <input
              type="date"
              value={dependent.dob}
              onChange={(e) => updateDependent(dependent.id, 'dob', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Date of Birth"
            />
            <input
              type="text"
              value={dependent.relationship}
              onChange={(e) => updateDependent(dependent.id, 'relationship', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Relationship"
            />
          </div>
        </div>
      ))}
      {formData.dependents.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No dependents added. Click "Add Dependent" to add one.
        </p>
      )}
    </div>
  );

  const renderAddress = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => handleChange('street', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter country"
        />
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bank Name
        </label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => handleChange('bankName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter bank name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={formData.accountType}
          onChange={(e) => handleChange('accountType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {accountTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Routing Number
        </label>
        <input
          type="text"
          value={formData.routingNumber}
          onChange={(e) => handleChange('routingNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter routing number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Number
        </label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => handleChange('accountNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter account number"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* User Info Header */}
      <Card padding="lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user?.fullName || user?.email || 'User Registration'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {userType === 'verified'
                ? 'User verified OTP but not registered. Complete registration details below.'
                : 'User sent OTP but not verified. Call client, send OTP, enter OTP here and then complete registration.'}
            </p>
            {/* OTP Input - only needed for unverified users */}
            {userType === 'unverified' && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter OTP"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVerifyOtpClick}
                  isLoading={isVerifyingOtp}
                >
                  Verify OTP
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {user?.phone && (
              <Button
                variant="secondary"
                leftIcon={<Phone className="w-4 h-4" />}
                onClick={handleCallClient}
              >
                Call Client
              </Button>
            )}
            {(formData.email || user?.email) && (
              <Button
                variant="secondary"
                leftIcon={<Mail className="w-4 h-4" />}
                onClick={() => {
                  const targetEmail = formData.email || user?.email;
                  if (targetEmail) {
                    window.location.href = `mailto:${targetEmail}`;
                  }
                }}
              >
                Email
              </Button>
            )}
            {userType === 'unverified' && (
              <Button
                variant="outline"
                leftIcon={<Mail className="w-4 h-4" />}
                onClick={handleSendOtpClick}
              >
                Send OTP to User
              </Button>
            )}
            {onDeleteUser && (
              <Button
                variant="danger"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => onDeleteUser(user?.id)}
              >
                Delete User
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Form Sections */}
      <Card padding="lg">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registration Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter all required information from the client to complete registration
          </p>
        </div>
        <div>
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="min-h-[400px]">
            {activeSection === 'personal' && renderPersonalInfo()}
            {activeSection === 'spouse' && renderSpouseInfo()}
            {activeSection === 'dependents' && renderDependents()}
            {activeSection === 'address' && renderAddress()}
            {activeSection === 'bank' && renderBankDetails()}
          </div>

          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <Button
              leftIcon={<UserCheck className="w-4 h-4" />}
              onClick={handleSubmitToRegister}
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to Register'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserRegistrationForm;

