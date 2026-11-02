// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   CloudArrowUpIcon,
//   XMarkIcon,
//   DocumentIcon,
//   TrashIcon,
// } from '@heroicons/react/24/outline';

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [dragActive, setDragActive] = useState(false);
//   const [selectedDocumentType, setSelectedDocumentType] = useState('');
//   const [selectedPerson, setSelectedPerson] = useState('');
//   const fileInputRef = useRef(null);

//   const documentTypes = [
//     'W2-Wage Income',
//     'Prior year Tax Return Copy',
//     '1099-INT - Interest Income',
//     '1099-DIV - Dividend Income',
//     '1099-G - State Tax Refunds',
//     '1099-MISC - Business Income',
//     '1099-HC - MA State Health Coverage Document',
//     '1099-B - Sale of Shares Statement',
//     '1099-R - Retirement Distributions',
//     '1098 - Home Mortgage Interest',
//     '1098-E - Student Loan Interest',
//     '1098-T - Tuition Fees Expenses',
//     '1095-A - Health Insurance Market Place',
//     'Foreign Income Document',
//     'Personal Identification Document of Tax Payer',
//     'Others',
//   ];

//   const personTypes = ['Tax Payer', 'Spouse', 'Both'];

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleFiles = (fileList) => {
//     if (!selectedDocumentType) {
//       alert('Please select a document type first');
//       return;
//     }
//     const newFiles = Array.from(fileList).map((file) => ({
//       id: Date.now() + Math.random(),
//       file,
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       uploadedDate: new Date().toLocaleDateString(),
//       documentType: selectedDocumentType,
//       personType: selectedPerson || 'Tax Payer',
//       category: getCategoryFromType(file.type),
//     }));
//     setFiles([...files, ...newFiles]);
//     // Reset selections after upload
//     setSelectedDocumentType('');
//     setSelectedPerson('');
//   };

//   const getCategoryFromType = (type) => {
//     if (type.includes('image') || type.includes('pdf')) {
//       if (type.includes('pdf')) return 'Personal ID';
//       return 'Personal ID';
//     }
//     if (type.includes('spreadsheet') || type.includes('excel')) {
//       return 'Employment Docs';
//     }
//     return 'Additional Supporting Docs';
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   const removeFile = (id) => {
//     setFiles(files.filter((file) => file.id !== id));
//   };

//   const categories = [
//     'Personal ID',
//     'Employment Docs',
//     'Bank Statements',
//     'Additional Supporting Docs',
//   ];

//   const groupedFiles = categories.reduce((acc, category) => {
//     acc[category] = files.filter((file) => file.category === category);
//     return acc;
//   }, {});

//   return (
//     <div className="space-y-6">
//       {/* Document Type Selection */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//       >
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Document Type</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Document Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={selectedDocumentType}
//               onChange={(e) => setSelectedDocumentType(e.target.value)}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
//             >
//               <option value="">Select Document Type</option>
//               {documentTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               For
//             </label>
//             <select
//               value={selectedPerson}
//               onChange={(e) => setSelectedPerson(e.target.value)}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
//             >
//               <option value="">Select Person</option>
//               {personTypes.map((person) => (
//                 <option key={person} value={person}>
//                   {person}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {selectedDocumentType && (
//           <p className="mt-3 text-sm text-gray-600">
//             Selected: <span className="font-medium text-gray-900">{selectedDocumentType}</span>
//             {selectedPerson && (
//               <span className="ml-2">
//                 for <span className="font-medium text-gray-900">{selectedPerson}</span>
//               </span>
//             )}
//           </p>
//         )}
//       </motion.div>

//       {/* Upload Area */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className={`bg-white rounded-xl shadow-sm border-2 border-dashed p-8 ${
//           selectedDocumentType ? 'border-primary-blue' : 'border-gray-300'
//         }`}
//       >
//         <div
//           className={`relative ${
//             dragActive ? 'border-primary-blue bg-blue-50' : ''
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleChange}
//             className="hidden"
//             disabled={!selectedDocumentType}
//           />
//           <div className="text-center">
//             <CloudArrowUpIcon className={`mx-auto h-12 w-12 mb-4 ${selectedDocumentType ? 'text-primary-blue' : 'text-gray-400'}`} />
//             <p className="text-lg font-semibold text-gray-900 mb-2">
//               {selectedDocumentType ? `Upload ${selectedDocumentType}` : 'Drag and drop files here'}
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               {selectedDocumentType ? 'Select files to upload for this document type' : 'Please select a document type first'}
//             </p>
//             <button
//               onClick={() => {
//                 if (!selectedDocumentType) {
//                   alert('Please select a document type first');
//                   return;
//                 }
//                 fileInputRef.current?.click();
//               }}
//               disabled={!selectedDocumentType}
//               className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
//                 selectedDocumentType
//                   ? 'bg-primary-blue text-white hover:bg-blue-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Select Files
//             </button>
//             <p className="text-xs text-gray-400 mt-4">
//               Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Files List */}
//       {files.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 mb-6">
//             Uploaded Files ({files.length})
//           </h3>

//           <div className="space-y-6">
//             {categories.map((category) => {
//               const categoryFiles = groupedFiles[category] || [];
//               if (categoryFiles.length === 0) return null;

//               return (
//                 <div key={category}>
//                   <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
//                     {category}
//                   </h4>
//                   <div className="space-y-2">
//                     <AnimatePresence>
//                       {categoryFiles.map((file) => (
//                         <motion.div
//                           key={file.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 20 }}
//                           className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
//                         >
//                           <div className="flex items-center space-x-4 flex-1">
//                             <div className="p-2 bg-blue-100 rounded-lg">
//                               <DocumentIcon className="h-5 w-5 text-blue-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium text-gray-900 truncate">
//                                 {file.name}
//                               </p>
//                               <div className="flex items-center space-x-4 mt-1 flex-wrap">
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   Uploaded: {file.uploadedDate}
//                                 </p>
//                                 {file.documentType && (
//                                   <>
//                                     <span className="text-xs text-gray-400">•</span>
//                                     <p className="text-xs font-medium text-primary-blue">
//                                       {file.documentType}
//                                     </p>
//                                   </>
//                                 )}
//                                 {file.personType && (
//                                   <>
//                                     <span className="text-xs text-gray-400">•</span>
//                                     <p className="text-xs text-gray-500">
//                                       {file.personType}
//                                     </p>
//                                   </>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => removeFile(file.id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             >
//                               <TrashIcon className="h-5 w-5" />
//                             </button>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>
//       )}

//       {/* Empty State */}
//       {files.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
//         >
//           <DocumentIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
//           <p className="text-gray-600 mb-2">No files uploaded yet</p>
//           <p className="text-sm text-gray-400">
//             Start by uploading your tax documents above
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   uploadDocument,
//   getDocuments,
//   deleteDocument,
// } from "../../Redux/Slices/documentSlice";

export default function FileUpload() {
  const dispatch = useDispatch();
  const { documents, loading } = useSelector((state) => state.document);

  // STATE
  const [documentType, setDocumentType] = useState("");
  const [person, setPerson] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // ================= FULL DOCUMENT TYPE LIST ==================
  const documentTypes = [
    "W2-Wage Income",
    "Prior year Tax Return Copy",
    "1099-INT - Interest Income",
    "1099-DIV - Dividend Income",
    "1099-G - State Tax Refunds",
    "1099-MISC - Business Income",
    "1099-HC - MA State Health Coverage Document",
    "1099-B - Sale of Shares Statement",
    "1099-R - Retirement Distributions",
    "1098 - Home Mortgage Interest",
    "1098-E - Student Loan Interest",
    "1098-T - Tuition Fees Expenses",
    "1095-A - Health Insurance Market Place",
    "Foreign Income Document",
    "Personal Identification Document of Tax Payer",
    "Others",
  ];

  // ================= FULL PERSON TYPE LIST ==================
  const personTypes = ["Tax Payer", "Spouse", "Both"];

  const [FileuploadError, setFileuploadError] = useState({});

  const formvalidation = () => {
    const errors = {};
    if (!selectedFile) {
      errors.selectedFile = "Please select a file to upload";
    }

    setFileuploadError(errors);
    return Object.keys(errors).length === 0;
  }

  // LOAD EXISTING DOCUMENTS
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = () => {
    if (!formvalidation()) return;

    const form = new FormData();
    form.append("documentType", documentType || "Others");
    form.append("person", person || "Tax Payer");
    form.append("file", selectedFile);

    dispatch(uploadDocument(form)).then(() => {
      setSelectedFile(null);
    });
  };

  return (
    <div className="space-y-6">

      {/* ================= SELECTION PANEL ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Select Document Type
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Document Type */}
          <div>
            <label className="block text-gray-700 mb-1">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Document Type</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {FileuploadError.documentType && (
              <span className="text-red-500">{FileuploadError.documentType}</span>
            )}
          </div>

          {/* Person */}
          <div>
            <label className="block text-gray-700 mb-1">For</label>
            <select
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Person</option>
              {personTypes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {FileuploadError.person && (
              <span className="text-red-500">{FileuploadError.person}</span>
            )}
          </div>
        </div>
      </div>

      {/* ================= UPLOAD BOX ================= */}
      <div className="bg-white border-2 border-dashed rounded-xl p-10 text-center">
        <div className="text-gray-500">Drag and drop files here</div>
        <div className="text-sm text-gray-400 mb-4">Or select file</div>

        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-6 py-2 bg-gray-200 rounded cursor-pointer text-gray-800"
        >
          Select File
        </label>

        {selectedFile && (
          <div className="mt-3 text-gray-700">
            Selected: <strong>{selectedFile.name}</strong>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {FileuploadError.selectedFile && (
          <span className="text-red-500">{FileuploadError.selectedFile}</span>
        )}
      </div>

      {/* ================= DOCUMENT LIST ================= */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Uploaded Files
        </h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li
                key={doc._id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{doc.fileName}</div>
                  <div className="text-xs text-gray-500">
                    {doc.documentType} — {doc.person}
                  </div>
                </div>

                <button
                  onClick={() => dispatch(deleteDocument(doc._id))}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
