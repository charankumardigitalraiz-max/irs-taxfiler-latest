import { useState, useEffect } from 'react';
import {
  Send,
  Eye,
  Trash2,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { format } from 'date-fns';

const TaxPreparationPhases = ({
  taxPrep,
  documents = [],
  onSavePhase1,
  onSendSummaryPhase1,
  onClientApprovePhase1,
  onSavePhase2,
  onSendFinalPhase2,
  onClientApproveFinal,
  onLockPreparation,
  currentWorkflowStatus,
  onViewFile,
  onDeleteFile,
}) => {
  const [stdDraft, setStdDraft] = useState([
    { description: 'FEDERAL REFUND', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
  ]);

  const [taxPlanning, setTaxPlanning] = useState([
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
  ]);

  const [benefit, setBenefit] = useState([
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
    { description: '', amount: '' },
  ]);

  useEffect(() => {
    if (taxPrep) {
      if (taxPrep.stdDraft && taxPrep.stdDraft.length > 0) setStdDraft(taxPrep.stdDraft);
      if (taxPrep.taxPlanning && taxPrep.taxPlanning.length > 0) setTaxPlanning(taxPrep.taxPlanning);
      if (taxPrep.benefit && taxPrep.benefit.length > 0) setBenefit(taxPrep.benefit);
    }
  }, [taxPrep]);

  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const updateSection = (setter, index, field, value) => {
    setter(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSectionSubmit = (sectionName, data) => {
    if (onSavePhase1) {
      onSavePhase1({ [sectionName]: data });
    }
  };

  return (
    <div className="space-y-8">
      {/* Three Columns Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* STD DRAFT */}
        <Card className="flex flex-col h-full" padding="none">
          <div className="bg-gray-100 py-3 text-center border-b">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">STD DRAFT</h3>
          </div>
          <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Description</div>
            <div className="w-1/3 px-3 py-2">Refund/(Owe)</div>
          </div>
          <div className="flex-1 divide-y divide-gray-200">
            {stdDraft.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-gray-200">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setStdDraft, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setStdDraft, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-gray-100 font-bold border-t border-gray-300 text-sm">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Total</div>
            <div className="w-1/3 px-3 py-2">{calculateTotal(stdDraft)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-lg">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSectionSubmit('stdDraft', stdDraft)}
            >
              Submit
            </Button>
          </div>
        </Card>

        {/* Tax Planning */}
        <Card className="flex flex-col h-full" padding="none">
          <div className="bg-gray-100 py-3 text-center border-b">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Tax Planning</h3>
          </div>
          <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Description</div>
            <div className="w-1/3 px-3 py-2">Refund</div>
          </div>
          <div className="flex-1 divide-y divide-gray-200 font-sans">
            {taxPlanning.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-gray-200">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setTaxPlanning, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setTaxPlanning, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-gray-100 font-bold border-t border-gray-300 text-sm">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Total</div>
            <div className="w-1/3 px-3 py-2">{calculateTotal(taxPlanning)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-lg">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSectionSubmit('taxPlanning', taxPlanning)}
            >
              Submit
            </Button>
          </div>
        </Card>

        {/* Benefit */}
        <Card className="flex flex-col h-full" padding="none">
          <div className="bg-gray-100 py-3 text-center border-b">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Benefit</h3>
          </div>
          <div className="flex bg-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Description</div>
            <div className="w-1/3 px-3 py-2">Refund</div>
          </div>
          <div className="flex-1 divide-y divide-gray-200 font-sans">
            {benefit.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-gray-200">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setBenefit, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setBenefit, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-gray-100 font-bold border-t border-gray-300 text-sm">
            <div className="w-2/3 px-3 py-2 border-r border-gray-400">Total</div>
            <div className="w-1/3 px-3 py-2">{calculateTotal(benefit)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-lg">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSectionSubmit('benefit', benefit)}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>

      {/* Draft Email Button */}
      <div className="flex justify-start">
        <Button
          variant="primary"
          onClick={onSendSummaryPhase1}
        >
          Draft Email
        </Button>
      </div>

      {/* Uploaded Client Documents Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Uploaded Client Documents</h3>
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#EBF5FF]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">Document Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">Comment</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">View File</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200">Action</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.length > 0 ? documents.map((doc, idx) => (
                <tr key={doc.id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 text-sm text-gray-900 border-r border-gray-200">{idx + 1}</td>
                  <td className="px-4 py-2.5 text-sm text-gray-900 border-r border-gray-200 font-medium">
                    {doc.documentType || 'N/A'}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-600 border-r border-gray-200">
                    {doc.fileName || 'No comment'}
                  </td>
                  <td className="px-4 py-2.5 text-sm border-r border-gray-200">
                    <button
                      onClick={() => onViewFile?.(doc)}
                      className="bg-cyan-400 hover:bg-cyan-500 text-white text-[10px] font-bold py-1 px-2 rounded uppercase transition-colors"
                    >
                      View File
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-sm border-r border-gray-200">
                    <button
                      onClick={() => onDeleteFile?.(doc.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1 px-2 rounded uppercase transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">
                    {doc.createdAt ? format(new Date(doc.createdAt), 'M/d/yyyy h:mm:ss a') : 'N/A'}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-500">
                    No documents uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaxPreparationPhases;
