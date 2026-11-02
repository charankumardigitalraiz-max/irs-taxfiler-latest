import { useState, useEffect } from 'react';
import {
  User,
  Users,
  Baby,
  Building,
  MapPin,
  Mail,
  Shield,
  Save,
  Edit2,
  FileText,
  Download,
  Eye,
} from 'lucide-react';
import Button from '../common/Button';
import { baseUrl } from '../../../baseurl';

const UserInfoSidebar = ({ user, onSave, disabled = false, documents = [] }) => {
  // Helper function to get full document URL
  const getDocumentUrl = (filePath) => {
    if (!filePath) return null;
    // If already a full URL, return as is
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // If relative path, prepend base URL
    if (filePath.startsWith('/')) {
      return `${baseUrl}${filePath}`;
    }
    // Otherwise, assume it's a relative path from uploads
    return `${baseUrl}/uploads/${filePath}`;
  };

  // Helper function to handle file download using blob fetch
  const handleDownload = async (filePath, fileName) => {
    try {
      const url = getDocumentUrl(filePath);
      if (!url) {
        console.error('No file URL available');
        return;
      }

      // Fetch the file as a blob to handle CORS and ensure download works
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName || 'document';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up blob URL after a delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    alternateEmail: '',
    alternatePhone: '',
    ssn: '',
    dob: '',
    occupation: '',
    filingStatus: '',

    // Spouse Info
    spouseFullName: '',
    spouseSSN: '',
    spouseDOB: '',
    spouseOccupation: '',

    // Dependents
    dependents: [],

    // Bank Details
    bankName: '',
    accountType: '',
    routingNumber: '',
    accountNumber: '',
    accountHolderName: '',

    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',

    // Identity Verification
    licenseNumber: '',
    stateOfIssue: '',
    expirationDate: '',
  });

  // Update formData when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        // Personal Info
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        middleName: user.middleName || '',
        email: user.email || '',
        phone: user.mobileNumber || '',
        alternateEmail: user.alternateEmail || '',
        alternatePhone: user.alternatePhone || '',
        ssn: user.personalInfo?.ssn || '',
        dob: user.personalInfo?.dateOfBirth ? new Date(user.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
        occupation: user.personalInfo?.occupation || '',
        filingStatus: user.personalInfo?.filingStatus || '',

        // Spouse Info
        spouseFullName: user.spouseInfo?.fullName || '',
        spouseSSN: user.spouseInfo?.ssn || '',
        spouseDOB: user.spouseInfo?.dateOfBirth ? new Date(user.spouseInfo.dateOfBirth).toISOString().split('T')[0] : '',
        spouseOccupation: user.spouseInfo?.occupation || '',

        // Dependents
        dependents: user.dependents || [],

        // Bank Details
        bankName: user.bankDetails?.bankName || '',
        accountType: user.bankDetails?.accountType || '',
        routingNumber: user.bankDetails?.routingNumber || '',
        accountNumber: user.bankDetails?.accountNumber || '',
        accountHolderName: user.bankDetails?.accountHolderName || '',

        // Address
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || 'USA',

        // Identity Verification
        licenseNumber: user.identityVerification?.licenseNumber || '',
        stateOfIssue: user.identityVerification?.stateOfIssue || '',
        expirationDate: user.identityVerification?.expirationDate ? new Date(user.identityVerification.expirationDate).toISOString().split('T')[0] : '',
      });
    }
  }, [user]);

  const sections = [
    { id: 'personal', label: 'Taxpayer Profile', icon: User },
    { id: 'spouse', label: 'Spouse Details', icon: Users },
    { id: 'dependents', label: 'Dependent Details', icon: Baby },
    { id: 'contact', label: 'Contact Information', icon: Mail },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'identity', label: 'Identity Verification', icon: Shield },
    { id: 'bank', label: 'Bank Details', icon: Building },
  ];

  const filingStatuses = [
    { value: '', label: 'Select Status' },
    { value: 'single', label: 'Single' },
    { value: 'married-jointly', label: 'Married Filing Jointly' },
    { value: 'married-separately', label: 'Married Filing Separately' },
    { value: 'head-of-household', label: 'Head of Household' },
    { value: 'qualifying-widow', label: 'Qualifying Widow(er)' },
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
        { _id: Date.now().toString(), name: '', ssn: '', dateOfBirth: '', relationship: '' }
      ]
    }));
  };

  const removeDependent = (id) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.filter((d) => (d._id || d.id) !== id)
    }));
  };

  const updateDependent = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.map((d) =>
        (d._id || d.id) === id ? { ...d, [field]: value } : d
      )
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const inputClass = isEditing ? 'input' : 'input bg-gray-50';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Top Tabs */}
      {/* Top Sections - Grid Layout */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-[1.02]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:bg-primary-50/30'
                  }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-primary-50'}`}>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary-600'}`} />
                </div>
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {sections.find((s) => s.id === activeSection)?.label}
          </h3>
          {!disabled && (
            <Button
              size="sm"
              variant={isEditing ? 'primary' : 'secondary'}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          )}
        </div>

        {/* Personal Info */}
        {activeSection === 'personal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Middle Name</label>
              <input type="text" value={formData.middleName} onChange={(e) => handleChange('middleName', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">SSN</label>
              <input type="text" value={formData.ssn} onChange={(e) => handleChange('ssn', e.target.value)} className={inputClass} placeholder="XXX-XX-XXXX" disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Filing Status</label>
              <select value={formData.filingStatus} onChange={(e) => handleChange('filingStatus', e.target.value)} className={inputClass} disabled={!isEditing}>
                {filingStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Occupation</label>
              <input type="text" value={formData.occupation} onChange={(e) => handleChange('occupation', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
          </div>
        )}

        {/* Spouse Info */}
        {activeSection === 'spouse' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-2">
                <label className="label">Full Name</label>
                <input type="text" value={formData.spouseFullName} onChange={(e) => handleChange('spouseFullName', e.target.value)} className={inputClass} disabled={!isEditing} />
              </div>
              <div>
                <label className="label">SSN</label>
                <input type="text" value={formData.spouseSSN} onChange={(e) => handleChange('spouseSSN', e.target.value)} className={inputClass} placeholder="XXX-XX-XXXX" disabled={!isEditing} />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input type="date" value={formData.spouseDOB} onChange={(e) => handleChange('spouseDOB', e.target.value)} className={inputClass} disabled={!isEditing} />
              </div>
              <div className="col-span-2">
                <label className="label">Occupation</label>
                <input type="text" value={formData.spouseOccupation} onChange={(e) => handleChange('spouseOccupation', e.target.value)} className={inputClass} disabled={!isEditing} />
              </div>
            </div>

            {/* Spouse Documents */}
            {(() => {
              // More flexible filtering - check for various documentType patterns
              const spouseDocuments = documents.filter(doc => {
                if (!doc.documentType) return false;
                const docType = doc.documentType.toUpperCase();
                return docType === 'SPOUSE_PASSPORT' ||
                  docType === 'SPOUSE_VISA' ||
                  docType === 'SPOUSE PASSPORT' ||
                  docType === 'SPOUSE VISA' ||
                  (docType.includes('SPOUSE') && (docType.includes('PASSPORT') || docType.includes('VISA')));
              });

              // Always show documents section if spouse info exists
              if (formData.spouseFullName || spouseDocuments.length > 0) {
                return (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Spouse Documents</h4>
                    <div className="space-y-2">
                      {/* Passport */}
                      {(() => {
                        const passportDoc = spouseDocuments.find(d => {
                          const docType = d.documentType?.toUpperCase() || '';
                          return docType.includes('PASSPORT');
                        });
                        return passportDoc ? (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700">Passport Copy</span>
                              <span className="text-xs text-gray-500">({passportDoc.documentType})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passportDoc?.filePath && (
                                <>
                                  <a
                                    href={getDocumentUrl(passportDoc.filePath)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </a>
                                  <button
                                    onClick={() => handleDownload(passportDoc.filePath, passportDoc.fileName || 'passport')}
                                    className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                    title="Download"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ) : null;
                      })()}

                      {/* Visa */}
                      {(() => {
                        const visaDoc = spouseDocuments.find(d => {
                          const docType = d.documentType?.toUpperCase() || '';
                          return docType.includes('VISA');
                        });
                        return visaDoc ? (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700">Visa Copy</span>
                              <span className="text-xs text-gray-500">({visaDoc.documentType})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {visaDoc?.filePath && (
                                <>
                                  <a
                                    href={getDocumentUrl(visaDoc.filePath)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </a>
                                  <button
                                    onClick={() => handleDownload(visaDoc.filePath, visaDoc.fileName || 'visa')}
                                    className="p-1.5 text-primary-600 hover:bg-primary-50 rounded"
                                    title="Download"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ) : null;
                      })()}

                      {/* Show all spouse documents for debugging */}
                      {spouseDocuments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-300">
                          <p className="text-xs text-gray-500 mb-2">All Spouse Documents ({spouseDocuments.length}):</p>
                          {spouseDocuments.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 mb-1">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-700">{doc.fileName || doc.documentType}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {doc.filePath && (
                                  <>
                                    <a
                                      href={getDocumentUrl(doc.filePath)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="View"
                                    >
                                      <Eye className="w-3 h-3" />
                                    </a>
                                    <button
                                      onClick={() => handleDownload(doc.filePath, doc.fileName || 'document')}
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="Download"
                                    >
                                      <Download className="w-3 h-3" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {spouseDocuments.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-2">No spouse documents found</p>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* Dependents */}
        {activeSection === 'dependents' && (
          <div className="space-y-3">
            {formData.dependents.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No dependents added</p>
            ) : (
              formData.dependents.map((dep, index) => {
                const depId = dep._id || dep.id || index;
                const depDateOfBirth = dep.dateOfBirth ? (typeof dep.dateOfBirth === 'string' ? dep.dateOfBirth.split('T')[0] : new Date(dep.dateOfBirth).toISOString().split('T')[0]) : '';

                // Get documents for this dependent - match by index patterns
                const dependentDocuments = documents.filter(doc => {
                  if (!doc.documentType) return false;
                  const docType = doc.documentType.toUpperCase();
                  const depIndex = index + 1; // 1-based index

                  // Match by exact documentType patterns: DEPENDENT_PASSPORT_1, DEPENDENT_VISA_1, etc.
                  if (docType === `DEPENDENT_PASSPORT_${depIndex}` ||
                    docType === `DEPENDENT_VISA_${depIndex}` ||
                    docType === `DEPENDENT_MEDICAL_${depIndex}` ||
                    docType === `DEPENDENT_SCHOOL_${depIndex}`) {
                    return true;
                  }

                  // Match by patterns with spaces or different separators
                  if (docType.includes(`DEPENDENT`) && docType.includes(`${depIndex}`)) {
                    return true;
                  }

                  // Match by dependentIndex field if available
                  if (doc.dependentIndex !== undefined && doc.dependentIndex === index) {
                    return true;
                  }

                  return false;
                });

                return (
                  <div key={depId} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">Dependent {index + 1}: {dep.name || 'Unnamed'}</span>
                      {isEditing && (
                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 text-xs" onClick={() => removeDependent(depId)}>
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="col-span-2">
                        <label className="label">Full Name</label>
                        <input type="text" value={dep.name || ''} onChange={(e) => updateDependent(depId, 'name', e.target.value)} className={inputClass} disabled={!isEditing} />
                      </div>
                      <div>
                        <label className="label">SSN</label>
                        <input type="text" value={dep.ssn || ''} onChange={(e) => updateDependent(depId, 'ssn', e.target.value)} className={inputClass} placeholder="XXX-XX-XXXX" disabled={!isEditing} />
                      </div>
                      <div>
                        <label className="label">Date of Birth</label>
                        <input type="date" value={depDateOfBirth} onChange={(e) => updateDependent(depId, 'dateOfBirth', e.target.value)} className={inputClass} disabled={!isEditing} />
                      </div>
                      <div className="col-span-2">
                        <label className="label">Relationship</label>
                        <select value={dep.relationship || ''} onChange={(e) => updateDependent(depId, 'relationship', e.target.value)} className={inputClass} disabled={!isEditing}>
                          <option value="">Select</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Stepchild">Stepchild</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Dependent Documents */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">Documents</h5>
                      <div className="space-y-2">
                        {/* Passport */}
                        {(() => {
                          const passportDoc = dependentDocuments.find(d => {
                            const docType = d.documentType?.toUpperCase() || '';
                            return docType.includes('PASSPORT');
                          });
                          return passportDoc ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs text-gray-700">Passport Copy</span>
                                <span className="text-xs text-gray-400">({passportDoc.documentType})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {passportDoc?.filePath && (
                                  <>
                                    <a
                                      href={getDocumentUrl(passportDoc.filePath)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      onClick={() => handleDownload(passportDoc.filePath, passportDoc.fileName || 'passport')}
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="Download"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* Visa */}
                        {(() => {
                          const visaDoc = dependentDocuments.find(d => {
                            const docType = d.documentType?.toUpperCase() || '';
                            return docType.includes('VISA');
                          });
                          return visaDoc ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs text-gray-700">Visa Copy</span>
                                <span className="text-xs text-gray-400">({visaDoc.documentType})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {visaDoc?.filePath && (
                                  <>
                                    <a
                                      href={getDocumentUrl(visaDoc.filePath)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      onClick={() => handleDownload(visaDoc.filePath, visaDoc.fileName || 'visa')}
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="Download"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* Medical Record */}
                        {(() => {
                          const medicalDoc = dependentDocuments.find(d => {
                            const docType = d.documentType?.toUpperCase() || '';
                            return docType.includes('MEDICAL');
                          });
                          return medicalDoc ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs text-gray-700">Medical Record</span>
                                <span className="text-xs text-gray-400">({medicalDoc.documentType})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {medicalDoc?.filePath && (
                                  <>
                                    <a
                                      href={getDocumentUrl(medicalDoc.filePath)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      onClick={() => handleDownload(medicalDoc.filePath, medicalDoc.fileName || 'medical')}
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="Download"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* School Record */}
                        {(() => {
                          const schoolDoc = dependentDocuments.find(d => {
                            const docType = d.documentType?.toUpperCase() || '';
                            return docType.includes('SCHOOL');
                          });
                          return schoolDoc ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs text-gray-700">School Record</span>
                                <span className="text-xs text-gray-400">({schoolDoc.documentType})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {schoolDoc?.filePath && (
                                  <>
                                    <a
                                      href={getDocumentUrl(schoolDoc.filePath)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      onClick={() => handleDownload(schoolDoc.filePath, schoolDoc.fileName || 'school')}
                                      className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                                      title="Download"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* Show all dependent documents for debugging */}
                        {dependentDocuments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">All Documents ({dependentDocuments.length}):</p>
                            {dependentDocuments.map((doc, docIdx) => (
                              <div key={docIdx} className="flex items-center justify-between p-1.5 bg-gray-50 rounded border border-gray-200 mb-1">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-3 h-3 text-gray-500" />
                                  <span className="text-xs text-gray-700">{doc.fileName || doc.documentType}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {doc.filePath && (
                                    <>
                                      <a
                                        href={getDocumentUrl(doc.filePath)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-0.5 text-primary-600 hover:bg-primary-50 rounded"
                                        title="View"
                                      >
                                        <Eye className="w-3 h-3" />
                                      </a>
                                      <button
                                        onClick={() => handleDownload(doc.filePath, doc.fileName || 'document')}
                                        className="p-0.5 text-primary-600 hover:bg-primary-50 rounded"
                                        title="Download"
                                      >
                                        <Download className="w-3 h-3" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {dependentDocuments.length === 0 && (
                          <p className="text-xs text-gray-500 text-center py-1">No documents found for this dependent</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            {isEditing && (
              <Button size="sm" variant="secondary" onClick={addDependent}>+ Add Dependent</Button>
            )}
          </div>
        )}

        {/* Contact Information */}
        {activeSection === 'contact' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={inputClass} disabled />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Alternate Email</label>
              <input type="email" value={formData.alternateEmail} onChange={(e) => handleChange('alternateEmail', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Alternate Phone</label>
              <input type="tel" value={formData.alternatePhone} onChange={(e) => handleChange('alternatePhone', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
          </div>
        )}

        {/* Bank Details */}
        {activeSection === 'bank' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">Bank Name</label>
              <input type="text" value={formData.bankName} onChange={(e) => handleChange('bankName', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Account Type</label>
              <select value={formData.accountType} onChange={(e) => handleChange('accountType', e.target.value)} className={inputClass} disabled={!isEditing}>
                <option value="">Select Type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            <div>
              <label className="label">Routing Number</label>
              <input type="text" value={formData.routingNumber} onChange={(e) => handleChange('routingNumber', e.target.value)} className={inputClass} placeholder="9 digits" disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Account Number</label>
              <input type="text" value={formData.accountNumber} onChange={(e) => handleChange('accountNumber', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div className="col-span-2">
              <label className="label">Account Holder Name</label>
              <input type="text" value={formData.accountHolderName} onChange={(e) => handleChange('accountHolderName', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
          </div>
        )}

        {/* Identity Verification */}
        {activeSection === 'identity' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">Driver's License Number</label>
              <input type="text" value={formData.licenseNumber} onChange={(e) => handleChange('licenseNumber', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">State of Issue</label>
              <input type="text" value={formData.stateOfIssue} onChange={(e) => handleChange('stateOfIssue', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Expiration Date</label>
              <input type="date" value={formData.expirationDate} onChange={(e) => handleChange('expirationDate', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
          </div>
        )}

        {/* Address */}
        {activeSection === 'address' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-2">
              <label className="label">Street Address</label>
              <input type="text" value={formData.street} onChange={(e) => handleChange('street', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">City</label>
              <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
            <div>
              <label className="label">State</label>
              <select value={formData.state} onChange={(e) => handleChange('state', e.target.value)} className={inputClass} disabled={!isEditing}>
                <option value="">Select State</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">ZIP Code</label>
              <input type="text" value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} className={inputClass} placeholder="XXXXX" disabled={!isEditing} />
            </div>
            <div>
              <label className="label">Country</label>
              <input type="text" value={formData.country} onChange={(e) => handleChange('country', e.target.value)} className={inputClass} disabled={!isEditing} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoSidebar;

