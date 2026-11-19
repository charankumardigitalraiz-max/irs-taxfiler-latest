import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../common/Button';
import { DOCUMENT_TYPES } from '../../utils/constants';

const DocumentUpload = ({ onUpload, userId }) => {
  const [files, setFiles] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of files) {
        await onUpload({
          file,
          documentType,
          userId,
        });
      }
      setFiles([]);
      setDocumentType('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Document Type</label>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="input"
        >
          <option value="">Select document type...</option>
          {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={clsx(
          'border border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
          isDragging
            ? 'border-[#127EAB] bg-[#E9F7FA] ring-2 ring-[#127EAB]/20'
            : 'border-[#CCDCE1] hover:border-[#127EAB]/50 bg-white'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
        <div className="w-11 h-11 rounded-full bg-[#E9F7FA] border border-[#127EAB]/25 flex items-center justify-center mx-auto mb-3 text-[#127EAB]">
          <Upload className="w-5 h-5 text-[#127EAB]" />
        </div>
        <p className="text-sm font-semibold text-[#1F4264]">
          <span className="text-[#127EAB]">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-[#6F7F8E] mt-1 font-medium">
          PDF, DOC, DOCX, JPG, PNG up to 10MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Selected Files:</p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#F8FBFC] border border-[#DCEAF0] rounded-xl"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#127EAB]" />
                <div>
                  <p className="text-sm font-semibold text-[#1F4264]">{file.name}</p>
                  <p className="text-xs text-[#6F7F8E] font-medium">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 text-[#8BA0B2] hover:text-[#EE6450] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={files.length === 0}
        isLoading={isUploading}
        className="w-full"
      >
        Upload {files.length > 0 ? `${files.length} File(s)` : 'Documents'}
      </Button>
    </div>
  );
};

export default DocumentUpload;

