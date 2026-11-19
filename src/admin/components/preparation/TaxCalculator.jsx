import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const TaxCalculator = ({ initialData, onSave, onSendSummary, isLocked = false }) => {
  const [formData, setFormData] = useState({
    grossIncome: '',
    deductions: '',
    taxPaid: '',
    ...initialData,
  });

  const [calculations, setCalculations] = useState({
    taxableIncome: 0,
    taxLiability: 0,
    refundAmount: 0,
    amountPayable: 0,
    isRefundEligible: false,
  });

  // Simple tax calculation (simplified for demo)
  useEffect(() => {
    const grossIncome = parseFloat(formData.grossIncome) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const taxPaid = parseFloat(formData.taxPaid) || 0;

    const taxableIncome = Math.max(0, grossIncome - deductions);
    
    // Simplified tax brackets
    let taxLiability = 0;
    if (taxableIncome <= 10000) {
      taxLiability = taxableIncome * 0.10;
    } else if (taxableIncome <= 40000) {
      taxLiability = 1000 + (taxableIncome - 10000) * 0.12;
    } else if (taxableIncome <= 85000) {
      taxLiability = 4600 + (taxableIncome - 40000) * 0.22;
    } else {
      taxLiability = 14500 + (taxableIncome - 85000) * 0.24;
    }

    const difference = taxPaid - taxLiability;
    const isRefundEligible = difference > 0;

    setCalculations({
      taxableIncome,
      taxLiability,
      refundAmount: isRefundEligible ? difference : 0,
      amountPayable: !isRefundEligible ? Math.abs(difference) : 0,
      isRefundEligible,
    });
  }, [formData]);

  const handleChange = (field, value) => {
    if (isLocked) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.({
      ...formData,
      ...calculations,
    });
  };

  return (
    <div className="space-y-6">
      {/* Income Section */}
      <Card>
        <Card.Header>
          <Card.Title>Income & Deductions</Card.Title>
          <Card.Description>Enter the client's income and deduction details</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="label">Gross Income ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.grossIncome}
                  onChange={(e) => handleChange('grossIncome', e.target.value)}
                  className="input pl-9"
                  placeholder="0.00"
                  disabled={isLocked}
                />
              </div>
            </div>
            <div>
              <label className="label">Total Deductions ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => handleChange('deductions', e.target.value)}
                  className="input pl-9"
                  placeholder="0.00"
                  disabled={isLocked}
                />
              </div>
            </div>
            <div>
              <label className="label">Tax Already Paid ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.taxPaid}
                  onChange={(e) => handleChange('taxPaid', e.target.value)}
                  className="input pl-9"
                  placeholder="0.00"
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Calculation Results */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Tax Calculation Summary</Card.Title>
              <Card.Description>Calculated based on entered values</Card.Description>
            </div>
            <Badge
              color={calculations.isRefundEligible ? 'green' : 'orange'}
              size="lg"
            >
              {calculations.isRefundEligible ? 'Refund Eligible' : 'Tax Payable'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-[#F8FBFC] border border-[#DCEAF0] rounded-xl">
              <p className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider">Taxable Income</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1F4264] mt-1">
                ${calculations.taxableIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 bg-[#F8FBFC] border border-[#DCEAF0] rounded-xl">
              <p className="text-xs font-semibold text-[#6F7F8E] uppercase tracking-wider">Tax Liability</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1F4264] mt-1">
                ${calculations.taxLiability.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            {calculations.isRefundEligible ? (
              <div className="p-4 bg-[#ECFDF5] rounded-xl border border-[#059669]/20">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#059669]" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#059669]">Refund Amount</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#059669] mt-1">
                  ${calculations.refundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-[#FEF4F2] rounded-xl border border-[#EE6450]/20">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[#EE6450]" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#EE6450]">Amount Payable</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#EE6450] mt-1">
                  ${calculations.amountPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}
            <div className="p-4 bg-[#E9F7FA] rounded-xl border border-[#127EAB]/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#127EAB]">Tax Paid</p>
              <p className="text-xl sm:text-2xl font-bold text-[#127EAB] mt-1">
                ${(parseFloat(formData.taxPaid) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={handleSave} disabled={isLocked}>
              Save Draft
            </Button>
            <Button onClick={onSendSummary} disabled={isLocked}>
              Send Summary to Client
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TaxCalculator;

