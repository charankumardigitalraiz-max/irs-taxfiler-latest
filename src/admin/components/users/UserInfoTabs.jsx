import { useState } from 'react';
import { 
  User, 
  Users, 
  Baby, 
  Building, 
  MapPin,
  Save,
  Edit2,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const UserInfoTabs = ({ user, onSave, disabled = false }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
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
    
    // Dependents (array)
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

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'spouse', label: 'Spouse Info', icon: Users },
    { id: 'dependents', label: 'Dependent Info', icon: Baby },
    { id: 'bank', label: 'Bank Details', icon: Building },
    { id: 'address', label: 'Address', icon: MapPin },
  ];

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

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const inputClass = isEditing ? 'input' : 'input bg-gray-50';

  return (
    <Card>
      <div className="flex">
        {/* Left Sidebar - Vertical Tabs */}
        <div className="w-48 border-r border-gray-200 py-2">
          <nav className="flex flex-col space-y-1 px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side - Form Content */}
        <div className="flex-1 p-4">
          {/* Header with Edit button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h3>
            {!disabled && (
              <Button
                size="sm"
                variant={isEditing ? 'primary' : 'secondary'}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                leftIcon={isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            )}
          </div>

        {/* Personal Info */}
        {activeTab === 'personal' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Middle Name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => handleChange('middleName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">SSN</label>
              <input
                type="text"
                value={formData.ssn}
                onChange={(e) => handleChange('ssn', e.target.value)}
                className={inputClass}
                placeholder="XXX-XX-XXXX"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Filing Status</label>
              <select
                value={formData.filingStatus}
                onChange={(e) => handleChange('filingStatus', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              >
                {filingStatuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Spouse Info */}
        {activeTab === 'spouse' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="label">Spouse First Name</label>
              <input
                type="text"
                value={formData.spouseFirstName}
                onChange={(e) => handleChange('spouseFirstName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Middle Name</label>
              <input
                type="text"
                value={formData.spouseMiddleName}
                onChange={(e) => handleChange('spouseMiddleName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Last Name</label>
              <input
                type="text"
                value={formData.spouseLastName}
                onChange={(e) => handleChange('spouseLastName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse SSN</label>
              <input
                type="text"
                value={formData.spouseSSN}
                onChange={(e) => handleChange('spouseSSN', e.target.value)}
                className={inputClass}
                placeholder="XXX-XX-XXXX"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Date of Birth</label>
              <input
                type="date"
                value={formData.spouseDOB}
                onChange={(e) => handleChange('spouseDOB', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Occupation</label>
              <input
                type="text"
                value={formData.spouseOccupation}
                onChange={(e) => handleChange('spouseOccupation', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Email</label>
              <input
                type="email"
                value={formData.spouseEmail}
                onChange={(e) => handleChange('spouseEmail', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Spouse Phone</label>
              <input
                type="tel"
                value={formData.spousePhone}
                onChange={(e) => handleChange('spousePhone', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
          </div>
        )}

        {/* Dependents */}
        {activeTab === 'dependents' && (
          <div className="space-y-3">
            {formData.dependents.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No dependents added</p>
            ) : (
              formData.dependents.map((dep, index) => (
                <div key={dep.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Dependent {index + 1}</span>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => removeDependent(dep.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        value={dep.firstName}
                        onChange={(e) => updateDependent(dep.id, 'firstName', e.target.value)}
                        className={inputClass}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        value={dep.lastName}
                        onChange={(e) => updateDependent(dep.id, 'lastName', e.target.value)}
                        className={inputClass}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="label">SSN</label>
                      <input
                        type="text"
                        value={dep.ssn}
                        onChange={(e) => updateDependent(dep.id, 'ssn', e.target.value)}
                        className={inputClass}
                        placeholder="XXX-XX-XXXX"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="label">Date of Birth</label>
                      <input
                        type="date"
                        value={dep.dob}
                        onChange={(e) => updateDependent(dep.id, 'dob', e.target.value)}
                        className={inputClass}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="label">Relationship</label>
                      <select
                        value={dep.relationship}
                        onChange={(e) => updateDependent(dep.id, 'relationship', e.target.value)}
                        className={inputClass}
                        disabled={!isEditing}
                      >
                        <option value="">Select</option>
                        <option value="SON">Son</option>
                        <option value="DAUGHTER">Daughter</option>
                        <option value="STEPSON">Stepson</option>
                        <option value="STEPDAUGHTER">Stepdaughter</option>
                        <option value="FOSTER_CHILD">Foster Child</option>
                        <option value="PARENT">Parent</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isEditing && (
              <Button size="sm" variant="secondary" onClick={addDependent}>
                + Add Dependent
              </Button>
            )}
          </div>
        )}

        {/* Bank Details */}
        {activeTab === 'bank' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Account Type</label>
              <select
                value={formData.accountType}
                onChange={(e) => handleChange('accountType', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              >
                <option value="">Select Type</option>
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
              </select>
            </div>
            <div>
              <label className="label">Routing Number</label>
              <input
                type="text"
                value={formData.routingNumber}
                onChange={(e) => handleChange('routingNumber', e.target.value)}
                className={inputClass}
                placeholder="9 digits"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
          </div>
        )}

        {/* Address */}
        {activeTab === 'address' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="label">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Apt/Suite/Unit</label>
              <input
                type="text"
                value={formData.apartment}
                onChange={(e) => handleChange('apartment', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">State</label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className={inputClass}
                placeholder="XXXXX"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
          </div>
        )}
        </div>
      </div>
    </Card>
  );
};

export default UserInfoTabs;

