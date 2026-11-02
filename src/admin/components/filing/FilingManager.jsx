import { useState, useRef } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Upload,
  Printer,
  AlertTriangle,
  X,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { FILING_TYPES, DOCUMENT_TYPES } from '../../utils/constants';

const FilingManager = ({ 
  filing, 
  onSelectType, 
  onSubmitEFiling, 
  onUpdateStatus,
  onCompletePaperFiling,
  userId,
  onUploadFile,
  uploadedFinalCopies = [],
  onRefreshDocuments,
}) => {
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // No filing selected yet
  if (!filing || !filing.filingType) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Select Filing Type</Card.Title>
          <Card.Description>Choose how this tax return will be filed</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onSelectType?.('E_FILING')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">E-Filing</h3>
              <p className="text-sm text-gray-500 mt-1">
                Submit electronically to the IRS. Faster processing and confirmation.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                <li>• Faster processing (24-48 hours)</li>
                <li>• Electronic confirmation</li>
                <li>• Automatic status tracking</li>
              </ul>
            </button>

            <button
              onClick={() => onSelectType?.('PAPER_FILING')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200">
                <Printer className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Paper Filing</h3>
              <p className="text-sm text-gray-500 mt-1">
                Print and mail to the IRS. Traditional filing method.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                <li>• Manual submission required</li>
                <li>• 4-6 weeks processing</li>
                <li>• Client mails documents</li>
              </ul>
            </button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      return;
    }
    
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    
    if (!onUploadFile) {
      console.error('Upload handler is missing');
      return;
    }

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;
    
    try {
      for (const file of selectedFiles) {
        try {
          await onUploadFile({
            file,
            documentType: 'FINAL_COPY',
            userId,
          });
          successCount++;
        } catch (error) {
          console.error('Upload failed for file:', file.name, error);
          errorCount++;
        }
      }
      
      if (successCount > 0) {
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
      
      if (errorCount > 0 && successCount === 0) {
        // All uploads failed - error will be shown by handleDocumentUpload
        console.error('All file uploads failed');
      }
    } catch (error) {
      console.error('Upload process failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // E-Filing selected
  if (filing.filingType === 'E_FILING') {
    return (
      <div className="space-y-6">
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>E-Filing Status</Card.Title>
                <Card.Description>Electronic tax filing submission</Card.Description>
              </div>
              <Badge
                color={
                  filing.acceptanceStatus === 'ACCEPTED'
                    ? 'green'
                    : filing.acceptanceStatus === 'REJECTED'
                    ? 'red'
                    : 'blue'
                }
                size="lg"
              >
                {filing.acceptanceStatus || 'Not Submitted'}
              </Badge>
            </div>
          </Card.Header>
          <Card.Content>
            {!filing.submissionDate ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="font-medium">Ready to Submit</p>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Please verify all information before submitting to the IRS.
                  </p>
                </div>
                <Button onClick={onSubmitEFiling} leftIcon={<Send className="w-4 h-4" />}>
                  Submit E-Filing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(filing.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Confirmation #</p>
                    <p className="font-semibold text-gray-900">
                      {filing.confirmationNumber || 'Pending'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-gray-900">
                      {filing.acceptanceStatus || 'Processing'}
                    </p>
                  </div>
                  {filing.acceptanceDate && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Acceptance Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(filing.acceptanceDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {filing.acceptanceStatus === 'PENDING' && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="success"
                      onClick={() => onUpdateStatus?.('ACCEPTED')}
                      leftIcon={<CheckCircle className="w-4 h-4" />}
                    >
                      Mark Accepted
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onUpdateStatus?.('REJECTED')}
                      leftIcon={<XCircle className="w-4 h-4" />}
                    >
                      Mark Rejected
                    </Button>
                  </div>
                )}

                {filing.acceptanceStatus === 'REJECTED' && filing.rejectionReason && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-medium text-red-700">Rejection Reason:</p>
                    <p className="text-sm text-red-600 mt-1">{filing.rejectionReason}</p>
                  </div>
                )}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* File Upload Section */}
        <Card>
          <Card.Header>
            <Card.Title>Upload Final Copies</Card.Title>
            <Card.Description>
              Upload final tax filing documents. These will be visible to the client in their Final Reports section.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, DOCX, JPG, PNG up to 10MB
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
                isLoading={isUploading}
                leftIcon={<Upload className="w-4 h-4" />}
                className="w-full"
              >
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length > 0 ? `${selectedFiles.length} File(s)` : 'Files'}`}
              </Button>
            </div>
          </Card.Content>
        </Card>

        {/* Uploaded Final Copies List */}
        <Card>
          <Card.Header>
            <Card.Title>Uploaded Final Copies</Card.Title>
            <Card.Description>
              Documents uploaded in this section ({uploadedFinalCopies.length} file{uploadedFinalCopies.length !== 1 ? 's' : ''})
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {uploadedFinalCopies.length > 0 ? (
              <div className="space-y-3">
                {uploadedFinalCopies.map((doc) => {
                  const uploadDate = doc.createdAt 
                    ? new Date(doc.createdAt).toLocaleDateString() 
                    : 'Unknown';
                  const fileSize = doc.fileSize 
                    ? `${(doc.fileSize / 1024).toFixed(1)} KB` 
                    : 'Unknown size';
                  
                  return (
                    <div
                      key={doc._id || doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {doc.fileName || doc.name || 'Unknown file'}
                          </p>
                          <div className="flex items-center gap-4 mt-1 flex-wrap">
                            <p className="text-xs text-gray-500">{fileSize}</p>
                            <p className="text-xs text-gray-500">
                              Uploaded: {uploadDate}
                            </p>
                            <Badge
                              color={
                                doc.status === 'APPROVED' || doc.status === 'approved'
                                  ? 'green'
                                  : doc.status === 'REJECTED' || doc.status === 'rejected'
                                  ? 'red'
                                  : 'yellow'
                              }
                              size="sm"
                            >
                              {doc.status ? doc.status.toUpperCase() : 'PENDING'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm">No final copies uploaded yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Uploaded files will appear here
                </p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }

  // Paper Filing selected
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Paper Filing</Card.Title>
              <Card.Description>Manual tax filing submission</Card.Description>
            </div>
            <Badge
              color={filing.paperFilingConfirmed ? 'green' : 'yellow'}
              size="lg"
            >
              {filing.paperFilingConfirmed ? 'Completed' : 'In Progress'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-6">
            {/* Instructions Checklist */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Paper Filing Steps:</h4>
              <div className="space-y-2">
                {[
                  { step: 1, text: 'Print all tax forms (1040, W-2, etc.)' },
                  { step: 2, text: 'Review and sign all required documents' },
                  { step: 3, text: 'Make copies for your records' },
                  { step: 4, text: 'Mail to appropriate IRS address' },
                  { step: 5, text: 'Keep tracking number for reference' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                      {item.step}
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {!filing.paperFilingConfirmed && (
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  leftIcon={<Printer className="w-4 h-4" />}
                >
                  Print Documents
                </Button>
                <Button
                  variant="success"
                  onClick={onCompletePaperFiling}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  Mark as Completed
                </Button>
              </div>
            )}

            {filing.paperFilingConfirmed && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium">Paper Filing Completed</p>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Completed on {new Date(filing.paperFilingConfirmedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>

      {/* File Upload Section */}
      <Card>
        <Card.Header>
          <Card.Title>Upload Final Copies</Card.Title>
          <Card.Description>
            Upload final tax filing documents. These will be visible to the client in their Final Reports section.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX, JPG, PNG up to 10MB
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
                isLoading={isUploading}
                leftIcon={<Upload className="w-4 h-4" />}
                className="w-full"
              >
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length > 0 ? `${selectedFiles.length} File(s)` : 'Files'}`}
              </Button>
            </div>
          </Card.Content>
        </Card>

        {/* Uploaded Final Copies List */}
        <Card>
          <Card.Header>
            <Card.Title>Uploaded Final Copies</Card.Title>
            <Card.Description>
              Documents uploaded in this section ({uploadedFinalCopies.length} file{uploadedFinalCopies.length !== 1 ? 's' : ''})
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {uploadedFinalCopies.length > 0 ? (
              <div className="space-y-3">
                {uploadedFinalCopies.map((doc) => {
                  const uploadDate = doc.createdAt 
                    ? new Date(doc.createdAt).toLocaleDateString() 
                    : 'Unknown';
                  const fileSize = doc.fileSize 
                    ? `${(doc.fileSize / 1024).toFixed(1)} KB` 
                    : 'Unknown size';
                  
                  return (
                    <div
                      key={doc._id || doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {doc.fileName || doc.name || 'Unknown file'}
                          </p>
                          <div className="flex items-center gap-4 mt-1 flex-wrap">
                            <p className="text-xs text-gray-500">{fileSize}</p>
                            <p className="text-xs text-gray-500">
                              Uploaded: {uploadDate}
                            </p>
                            <Badge
                              color={
                                doc.status === 'APPROVED' || doc.status === 'approved'
                                  ? 'green'
                                  : doc.status === 'REJECTED' || doc.status === 'rejected'
                                  ? 'red'
                                  : 'yellow'
                              }
                              size="sm"
                            >
                              {doc.status ? doc.status.toUpperCase() : 'PENDING'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm">No final copies uploaded yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Uploaded files will appear here
                </p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  };

export default FilingManager;

