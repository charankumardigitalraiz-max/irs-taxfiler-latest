import { motion } from 'framer-motion';
import {
  DocumentArrowDownIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const FinalReports = () => {
  const reports = [
    {
      id: 1,
      taxYear: '2023',
      type: 'Federal Tax Return',
      status: 'Completed',
      filedDate: 'Mar 15, 2024',
      downloadUrl: '#',
    },
    {
      id: 2,
      taxYear: '2023',
      type: 'State Tax Return (NY)',
      status: 'Completed',
      filedDate: 'Mar 15, 2024',
      downloadUrl: '#',
    },
    {
      id: 3,
      taxYear: '2022',
      type: 'Federal Tax Return',
      status: 'Completed',
      filedDate: 'Mar 10, 2023',
      downloadUrl: '#',
    },
    {
      id: 4,
      taxYear: '2024',
      type: 'Federal Tax Return',
      status: 'In Progress',
      filedDate: 'Pending',
      downloadUrl: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Reports</h1>
        <p className="text-gray-600">
          Download your completed tax filing documents and reports.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tax Year
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Filed Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">
                        {report.taxYear}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {report.status === 'Completed' ? (
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ClockIcon className="h-4 w-4 mr-1" />
                      )}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{report.filedDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {report.downloadUrl ? (
                      <button className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Not Available</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reports.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 mb-2">No reports available</p>
          <p className="text-sm text-gray-400">
            Your completed tax filing reports will appear here once filing is complete.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinalReports;

