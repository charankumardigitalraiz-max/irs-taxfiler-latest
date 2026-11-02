import { useState } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const TaxSummaryForm = ({ initialData, onSave, onSubmit, disabled = false }) => {
  const [formData, setFormData] = useState({
    // Federal
    federalDueRefund: initialData?.federalDueRefund || '',
    federalAmount: initialData?.federalAmount || 0,
    
    // State entries (dynamic)
    stateEntries: initialData?.stateEntries || [
      { id: 1, state: '', dueRefund: '', amount: 0 }
    ],
    
    // City entries (dynamic)
    cityEntries: initialData?.cityEntries || [
      { id: 1, city: '', dueRefund: '', amount: 0 }
    ],
    
    // Charges
    federal: initialData?.federal || 0,
    state: initialData?.state || 0,
    city: initialData?.city || 0,
    foreignTaxCredit: initialData?.foreignTaxCredit || 0,
    stockTransactions: initialData?.stockTransactions || 0,
    rentalIncome: initialData?.rentalIncome || 0,
    scheduleA: initialData?.scheduleA || 0,
    interestDividend: initialData?.interestDividend || 0,
    businessIncome: initialData?.businessIncome || 0,
    partnershipIncome: initialData?.partnershipIncome || 0,
    itinServices: initialData?.itinServices || 0,
    fbarFatca: initialData?.fbarFatca || 0,
    othersSpecific: initialData?.othersSpecific || 0,
    others: initialData?.others || 0,
    feePayable: initialData?.feePayable || 0,
    
    // Totals
    discount: initialData?.discount || 0,
    totalPayAmount: initialData?.totalPayAmount || 0,
  });

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

  const dueRefundOptions = [
    { value: '', label: 'Select' },
    { value: 'DUE', label: 'Due' },
    { value: 'REFUND', label: 'Refund' },
    { value: 'ZERO', label: 'Zero' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Recalculate total
      updated.totalPayAmount = calculateTotal(updated);
      return updated;
    });
  };

  const calculateTotal = (data) => {
    const charges = [
      'federal', 'state', 'city', 'foreignTaxCredit', 'stockTransactions',
      'rentalIncome', 'scheduleA', 'interestDividend', 'businessIncome',
      'partnershipIncome', 'itinServices', 'fbarFatca', 'othersSpecific',
      'others', 'feePayable'
    ];
    const total = charges.reduce((sum, key) => sum + (parseFloat(data[key]) || 0), 0);
    return total - (parseFloat(data.discount) || 0);
  };

  // State entries
  const addStateEntry = () => {
    setFormData((prev) => ({
      ...prev,
      stateEntries: [
        ...prev.stateEntries,
        { id: Date.now(), state: '', dueRefund: '', amount: 0 }
      ]
    }));
  };

  const removeStateEntry = (id) => {
    setFormData((prev) => ({
      ...prev,
      stateEntries: prev.stateEntries.filter((e) => e.id !== id)
    }));
  };

  const updateStateEntry = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      stateEntries: prev.stateEntries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      )
    }));
  };

  // City entries
  const addCityEntry = () => {
    setFormData((prev) => ({
      ...prev,
      cityEntries: [
        ...prev.cityEntries,
        { id: Date.now(), city: '', dueRefund: '', amount: 0 }
      ]
    }));
  };

  const removeCityEntry = (id) => {
    setFormData((prev) => ({
      ...prev,
      cityEntries: prev.cityEntries.filter((e) => e.id !== id)
    }));
  };

  const updateCityEntry = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      cityEntries: prev.cityEntries.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleReset = () => {
    setFormData({
      federalDueRefund: '',
      federalAmount: 0,
      stateEntries: [{ id: 1, state: '', dueRefund: '', amount: 0 }],
      cityEntries: [{ id: 1, city: '', dueRefund: '', amount: 0 }],
      federal: 0,
      state: 0,
      city: 0,
      foreignTaxCredit: 0,
      stockTransactions: 0,
      rentalIncome: 0,
      scheduleA: 0,
      interestDividend: 0,
      businessIncome: 0,
      partnershipIncome: 0,
      itinServices: 0,
      fbarFatca: 0,
      othersSpecific: 0,
      others: 0,
      feePayable: 0,
      discount: 0,
      totalPayAmount: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Federal Due/Refund */}
      <Card>
        <Card.Header>
          <Card.Title>Federal Tax</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="label">FEDERAL Due/Refund</label>
              <select
                value={formData.federalDueRefund}
                onChange={(e) => handleChange('federalDueRefund', e.target.value)}
                className="input"
                disabled={disabled}
              >
                {dueRefundOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Amount</label>
              <input
                type="number"
                value={formData.federalAmount}
                onChange={(e) => handleChange('federalAmount', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* State Entries */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>State Tax</Card.Title>
            {!disabled && (
              <Button type="button" size="sm" onClick={addStateEntry} leftIcon={<Plus className="w-4 h-4" />}>
                Add State
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            {formData.stateEntries.map((entry, index) => (
              <div key={entry.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="label">State</label>
                  <select
                    value={entry.state}
                    onChange={(e) => updateStateEntry(entry.id, 'state', e.target.value)}
                    className="input"
                    disabled={disabled}
                  >
                    <option value="">Select state</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Due/Refund</label>
                  <select
                    value={entry.dueRefund}
                    onChange={(e) => updateStateEntry(entry.id, 'dueRefund', e.target.value)}
                    className="input"
                    disabled={disabled}
                  >
                    {dueRefundOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Amount</label>
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => updateStateEntry(entry.id, 'amount', e.target.value)}
                    className="input"
                    placeholder="0"
                    disabled={disabled}
                  />
                </div>
                <div>
                  {!disabled && formData.stateEntries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => removeStateEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* City Entries */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>City Tax</Card.Title>
            {!disabled && (
              <Button type="button" size="sm" onClick={addCityEntry} leftIcon={<Plus className="w-4 h-4" />}>
                Add City
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            {formData.cityEntries.map((entry) => (
              <div key={entry.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    value={entry.city}
                    onChange={(e) => updateCityEntry(entry.id, 'city', e.target.value)}
                    className="input"
                    placeholder="Select city"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label className="label">Due/Refund</label>
                  <select
                    value={entry.dueRefund}
                    onChange={(e) => updateCityEntry(entry.id, 'dueRefund', e.target.value)}
                    className="input"
                    disabled={disabled}
                  >
                    {dueRefundOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Amount</label>
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => updateCityEntry(entry.id, 'amount', e.target.value)}
                    className="input"
                    placeholder="0"
                    disabled={disabled}
                  />
                </div>
                <div>
                  {!disabled && formData.cityEntries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => removeCityEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Charges */}
      <Card>
        <Card.Header>
          <Card.Title>Charges</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="label">FEDERAL</label>
              <input
                type="number"
                value={formData.federal}
                onChange={(e) => handleChange('federal', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">STATE</label>
              <input
                type="number"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">CITY</label>
              <input
                type="number"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">FOREIGN TAX CREDIT</label>
              <input
                type="number"
                value={formData.foreignTaxCredit}
                onChange={(e) => handleChange('foreignTaxCredit', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">STOCK TRANSACTIONS (SCH – D)</label>
              <input
                type="number"
                value={formData.stockTransactions}
                onChange={(e) => handleChange('stockTransactions', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">RENTAL INCOME (SCH – E)</label>
              <input
                type="number"
                value={formData.rentalIncome}
                onChange={(e) => handleChange('rentalIncome', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">SCHEDULE A (ITEMIZED DEDUCTIONS)</label>
              <input
                type="number"
                value={formData.scheduleA}
                onChange={(e) => handleChange('scheduleA', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">INTEREST & DIVIDEND INCOME (SCH -B)</label>
              <input
                type="number"
                value={formData.interestDividend}
                onChange={(e) => handleChange('interestDividend', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">BUSINESS INCOME (SCH – C)</label>
              <input
                type="number"
                value={formData.businessIncome}
                onChange={(e) => handleChange('businessIncome', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">PARTNERSHIP INCOME (SCH – K1)</label>
              <input
                type="number"
                value={formData.partnershipIncome}
                onChange={(e) => handleChange('partnershipIncome', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">ITIN SERVICES</label>
              <input
                type="number"
                value={formData.itinServices}
                onChange={(e) => handleChange('itinServices', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">FBAR/FATCA</label>
              <input
                type="number"
                value={formData.fbarFatca}
                onChange={(e) => handleChange('fbarFatca', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">Others Specific</label>
              <input
                type="number"
                value={formData.othersSpecific}
                onChange={(e) => handleChange('othersSpecific', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">Others</label>
              <input
                type="number"
                value={formData.others}
                onChange={(e) => handleChange('others', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">FEE PAYABLE</label>
              <input
                type="number"
                value={formData.feePayable}
                onChange={(e) => handleChange('feePayable', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Totals */}
      <Card>
        <Card.Header>
          <Card.Title>Totals</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="label">Discount</label>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
                className="input"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label className="label">Total Pay Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.totalPayAmount}
                  className="input pl-9 bg-gray-100 font-bold text-lg"
                  readOnly
                />
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={disabled}>
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset} disabled={disabled}>
              Reset
            </Button>
            <Button type="button" variant="secondary" onClick={() => onSave?.(formData)} disabled={disabled}>
              Save Draft
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default TaxSummaryForm;

