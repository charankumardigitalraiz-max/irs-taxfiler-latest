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
          <div className="bg-[#F8FBFC] py-3 text-center border-b border-[#E6F0F5]">
            <h3 className="text-sm font-semibold text-[#1F4264] uppercase tracking-wider">STD DRAFT</h3>
          </div>
          <div className="flex bg-[#E9F7FA] text-xs font-semibold uppercase tracking-wider text-[#127EAB]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Description</div>
            <div className="w-1/3 px-3 py-2">Refund/(Owe)</div>
          </div>
          <div className="flex-1 divide-y divide-[#E6F0F5]">
            {stdDraft.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-[#E6F0F5]">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setStdDraft, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setStdDraft, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-[#F8FBFC] font-semibold border-t border-[#DCEAF0] text-xs sm:text-sm text-[#1F4264]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Total</div>
            <div className="w-1/3 px-3 py-2 font-bold text-[#127EAB]">{calculateTotal(stdDraft)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-xl border-t border-[#E6F0F5]">
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
          <div className="bg-[#F8FBFC] py-3 text-center border-b border-[#E6F0F5]">
            <h3 className="text-sm font-semibold text-[#1F4264] uppercase tracking-wider">Tax Planning</h3>
          </div>
          <div className="flex bg-[#E9F7FA] text-xs font-semibold uppercase tracking-wider text-[#127EAB]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Description</div>
            <div className="w-1/3 px-3 py-2">Refund</div>
          </div>
          <div className="flex-1 divide-y divide-[#E6F0F5]">
            {taxPlanning.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-[#E6F0F5]">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setTaxPlanning, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setTaxPlanning, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-[#F8FBFC] font-semibold border-t border-[#DCEAF0] text-xs sm:text-sm text-[#1F4264]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Total</div>
            <div className="w-1/3 px-3 py-2 font-bold text-[#127EAB]">{calculateTotal(taxPlanning)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-xl border-t border-[#E6F0F5]">
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
          <div className="bg-[#F8FBFC] py-3 text-center border-b border-[#E6F0F5]">
            <h3 className="text-sm font-semibold text-[#1F4264] uppercase tracking-wider">Benefit</h3>
          </div>
          <div className="flex bg-[#E9F7FA] text-xs font-semibold uppercase tracking-wider text-[#127EAB]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Description</div>
            <div className="w-1/3 px-3 py-2">Refund</div>
          </div>
          <div className="flex-1 divide-y divide-[#E6F0F5]">
            {benefit.map((row, idx) => (
              <div key={idx} className="flex">
                <div className="w-2/3 border-r border-[#E6F0F5]">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => updateSection(setBenefit, idx, 'description', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => updateSection(setBenefit, idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-[#F8FBFC] bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex bg-[#F8FBFC] font-semibold border-t border-[#DCEAF0] text-xs sm:text-sm text-[#1F4264]">
            <div className="w-2/3 px-3 py-2 border-r border-[#DCEAF0]">Total</div>
            <div className="w-1/3 px-3 py-2 font-bold text-[#127EAB]">{calculateTotal(benefit)}</div>
          </div>
          <div className="p-4 flex justify-center bg-white rounded-b-xl border-t border-[#E6F0F5]">
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
        <h3 className="text-base sm:text-lg font-semibold text-[#1F4264] mb-3">Uploaded Client Documents</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow-[0_2px_10px_rgba(31,66,100,0.04)] border border-[#DCEAF0]">
          <table className="min-w-full divide-y divide-[#E6F0F5]">
            <thead className="bg-[#F8FBFC]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider border-r border-[#E6F0F5]">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider border-r border-[#E6F0F5]">Document Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider border-r border-[#E6F0F5]">Comment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider border-r border-[#E6F0F5]">View File</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider border-r border-[#E6F0F5]">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E6F0F5]">
              {documents.length > 0 ? documents.map((doc, idx) => (
                <tr key={doc.id || idx} className="hover:bg-[#F8FBFC] transition-colors">
                  <td className="px-4 py-2.5 text-xs sm:text-sm text-[#1F4264] font-medium border-r border-[#E6F0F5]">{idx + 1}</td>
                  <td className="px-4 py-2.5 text-xs sm:text-sm text-[#1F4264] border-r border-[#E6F0F5] font-semibold">
                    {doc.documentType || 'N/A'}
                  </td>
                  <td className="px-4 py-2.5 text-xs sm:text-sm text-[#6F7F8E] border-r border-[#E6F0F5] font-medium">
                    {doc.fileName || 'No comment'}
                  </td>
                  <td className="px-4 py-2.5 text-sm border-r border-[#E6F0F5]">
                    <button
                      onClick={() => onViewFile?.(doc)}
                      className="bg-[#E9F7FA] hover:bg-[#D5EEF5] text-[#127EAB] border border-[#127EAB]/25 text-[11px] font-semibold py-1 px-2.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View File
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-sm border-r border-[#E6F0F5]">
                    <button
                      onClick={() => onDeleteFile?.(doc.id)}
                      className="text-[#EE6450] hover:bg-[#FEF4F2] text-[11px] font-semibold py-1 px-2.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#8BA0B2] font-medium whitespace-nowrap">
                    {doc.createdAt ? format(new Date(doc.createdAt), 'M/d/yyyy h:mm:ss a') : 'N/A'}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-xs sm:text-sm text-[#6F7F8E] font-medium">
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
