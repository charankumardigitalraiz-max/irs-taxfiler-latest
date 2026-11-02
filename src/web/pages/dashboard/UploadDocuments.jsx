// import FileUpload from '../../components/dashboard/FileUpload';

// const UploadDocuments = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">
//           Upload Documents
//         </h1>
//         <p className="text-gray-600">
//           Upload all required tax documents for your filing. Organize them by category for easier review.
//         </p>
//       </div>
//       <FileUpload />
//     </div>
//   );
// };

// export default UploadDocuments;

import FileUpload from '../../components/dashboard/FileUpload';

const UploadDocuments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Documents
        </h1>
        <p className="text-gray-600">
          Upload all required tax documents for your filing. Organize them by category for easier review.
        </p>
      </div>

      <FileUpload />   {/* Fully dynamic */}
    </div>
  );
};

export default UploadDocuments;
