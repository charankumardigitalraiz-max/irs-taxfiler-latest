import { useState, useEffect } from 'react';
import {
  Save,
  Trash2,
  Edit2,
  Calendar,
  Percent,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../../shared/components/common/Input';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../hooks/useToast';

const ADVANCED_FILING_KEY = 'advanced-tax-filing';

const ContentSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [savingAdvanced, setSavingAdvanced] = useState(false);
  const [advancedFiling, setAdvancedFiling] = useState({
    enabled: false,
    startDate: '',
    untilDate: '',
    offerPercentage: '',
  });
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    content: '',
    type: 'terms',
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getAllSettings();
      if (response.success) {
        const allSettings = response.data || [];
        setSettings(allSettings);

        // Load Advanced Tax Filing configuration if saved
        const advSetting = allSettings.find((s) => s.key === ADVANCED_FILING_KEY);
        if (advSetting?.content) {
          try {
            const parsed = JSON.parse(advSetting.content);
            setAdvancedFiling({
              enabled: Boolean(parsed.enabled),
              startDate: parsed.startDate || '',
              untilDate: parsed.untilDate || '',
              offerPercentage:
                parsed.offerPercentage !== undefined && parsed.offerPercentage !== null
                  ? String(parsed.offerPercentage)
                  : '',
            });
          } catch {
            // Keep defaults if content is not JSON
          }
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      showError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAdvancedFiling = async () => {
    if (advancedFiling.enabled) {
      if (!advancedFiling.startDate || !advancedFiling.untilDate) {
        showError('Please select both Start Date and Until Date');
        return;
      }
      if (new Date(advancedFiling.untilDate) < new Date(advancedFiling.startDate)) {
        showError('Until Date must be on or after Start Date');
        return;
      }
      const pct = Number(advancedFiling.offerPercentage);
      if (
        advancedFiling.offerPercentage === '' ||
        Number.isNaN(pct) ||
        pct < 0 ||
        pct > 100
      ) {
        showError('Please enter a valid offer percentage between 0 and 100');
        return;
      }
    }

    try {
      setSavingAdvanced(true);
      const payload = {
        key: ADVANCED_FILING_KEY,
        title: 'Advanced Tax Filing',
        type: 'other',
        content: JSON.stringify({
          enabled: advancedFiling.enabled,
          startDate: advancedFiling.startDate,
          untilDate: advancedFiling.untilDate,
          offerPercentage:
            advancedFiling.offerPercentage === ''
              ? 0
              : Number(advancedFiling.offerPercentage),
        }),
      };

      const response = await settingsService.saveSetting(payload);
      if (response.success) {
        showSuccess(
          advancedFiling.enabled
            ? 'Advanced Tax Filing offer enabled and saved'
            : 'Advanced Tax Filing disabled and saved'
        );
        loadSettings();
      }
    } catch (error) {
      console.error('Failed to save Advanced Tax Filing setting:', error);
      showError(
        error.response?.data?.message || 'Failed to save Advanced Tax Filing setting'
      );
    } finally {
      setSavingAdvanced(false);
    }
  };

  const handleEdit = (setting) => {
    setEditingKey(setting.key);
    setFormData({
      key: setting.key,
      title: setting.title,
      content: setting.content,
      type: setting.type,
    });
  };

  const handleCancel = () => {
    setEditingKey(null);
    setFormData({
      key: '',
      title: '',
      content: '',
      type: 'terms',
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.key || !formData.title || !formData.content) {
        showError('Please fill in all required fields');
        return;
      }

      const response = await settingsService.saveSetting(formData);
      if (response.success) {
        showSuccess('Setting saved successfully');
        handleCancel();
        loadSettings();
      }
    } catch (error) {
      console.error('Failed to save setting:', error);
      showError(error.response?.data?.message || 'Failed to save setting');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this setting?')) {
      return;
    }

    try {
      const response = await settingsService.deleteSetting(id);
      if (response.success) {
        showSuccess('Setting deleted successfully');
        loadSettings();
      }
    } catch (error) {
      console.error('Failed to delete setting:', error);
      showError('Failed to delete setting');
    }
  };

  const settingTypes = [
    { value: 'terms', label: 'Terms & Conditions' },
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'policies', label: 'Policies' },
    { value: 'payment-terms', label: 'Payment Terms' },
    { value: 'other', label: 'Other' },
  ];

  const defaultSettings = [
    { key: 'privacy-policy', title: 'Privacy Policy', type: 'privacy' },
    { key: 'terms-conditions', title: 'Terms & Conditions', type: 'terms' },
    { key: 'payment-terms', title: 'Payment Terms', type: 'payment-terms' },
    { key: 'other-guidelines', title: 'Other Guidelines', type: 'other' },
  ];

  const contentSettingsList = settings.filter(
    (s) => s.key !== ADVANCED_FILING_KEY
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage advanced tax filing offers, terms &amp; conditions, privacy policy, and static content
          </p>
        </div>
      </div>

      {/* Advanced Tax Filing Option (Enable / Disable + Date Range & Offer %) */}
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              {/* <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div> */}
              <div>
                <Card.Title>Advanced Tax Filing Option</Card.Title>
              </div>
            </div>

            {/* Enable / Disable Toggle Switch */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <span
                className={`text-xs font-semibold ${advancedFiling.enabled ? 'text-emerald-700' : 'text-gray-500'
                  }`}
              >
                {advancedFiling.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={advancedFiling.enabled}
                aria-label="Toggle Advanced Tax Filing Option"
                onClick={() =>
                  setAdvancedFiling((prev) => ({
                    ...prev,
                    enabled: !prev.enabled,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 ${advancedFiling.enabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${advancedFiling.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          <div className="space-y-4">
            {advancedFiling.enabled ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={advancedFiling.startDate}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Until Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Until Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={advancedFiling.untilDate}
                        min={advancedFiling.startDate || undefined}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            untilDate: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Offer Percentage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage Offer (%) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={advancedFiling.offerPercentage}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            offerPercentage: e.target.value,
                          }))
                        }
                        placeholder="e.g., 15"
                        className="w-full pl-3.5 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                      <Percent className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Live Summary Preview */}
                {advancedFiling.startDate &&
                  advancedFiling.untilDate &&
                  advancedFiling.offerPercentage !== '' && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-emerald-900">
                      <span className="font-medium">
                        Active Promotion:{' '}
                        <strong className="font-semibold text-emerald-700">
                          {advancedFiling.offerPercentage}% OFF
                        </strong>{' '}
                        on Advanced Tax Filing
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        {advancedFiling.startDate} to {advancedFiling.untilDate}
                      </span>
                    </div>
                  )}
              </>
            ) : (
              <div className="p-3.5 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-xs sm:text-sm text-gray-500">
                Advanced Tax Filing offer is currently disabled. Switch to{' '}
                <span className="font-semibold text-gray-700">Enable</span> above to configure Start Date, Until Date, and Percentage Offer.
              </div>
            )}

            <div className="pt-1">
              <Button
                onClick={handleSaveAdvancedFiling}
                isLoading={savingAdvanced}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Advanced Filing Settings
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Advanced Tax Filing Option (Enable / Disable + Date Range & Offer %) */}
      {/* <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <Card.Title>Advanced Tax Filing Option</Card.Title>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${advancedFiling.enabled
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                  >
                    {advancedFiling.enabled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        Disabled
                      </>
                    )}
                  </span>
                </div>
                <Card.Description className="mt-0.5">
                  Enable or disable early/advanced tax filing window and promotional percentage offer
                </Card.Description>
              </div>
            </div>


            <div className="flex items-center gap-3 self-start sm:self-center">
              <span
                className={`text-xs font-semibold ${advancedFiling.enabled ? 'text-emerald-700' : 'text-gray-500'
                  }`}
              >
                {advancedFiling.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={advancedFiling.enabled}
                aria-label="Toggle Advanced Tax Filing Option"
                onClick={() =>
                  setAdvancedFiling((prev) => ({
                    ...prev,
                    enabled: !prev.enabled,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 ${advancedFiling.enabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${advancedFiling.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          <div className="space-y-4">
            {advancedFiling.enabled ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={advancedFiling.startDate}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                    </div>
                  </div>

     
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Until Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={advancedFiling.untilDate}
                        min={advancedFiling.startDate || undefined}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            untilDate: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage Offer (%) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={advancedFiling.offerPercentage}
                        onChange={(e) =>
                          setAdvancedFiling((prev) => ({
                            ...prev,
                            offerPercentage: e.target.value,
                          }))
                        }
                        placeholder="e.g., 15"
                        className="w-full pl-3.5 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                        required
                      />
                      <Percent className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>


                {advancedFiling.startDate &&
                  advancedFiling.untilDate &&
                  advancedFiling.offerPercentage !== '' && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-emerald-900">
                      <span className="font-medium">
                        Active Promotion:{' '}
                        <strong className="font-semibold text-emerald-700">
                          {advancedFiling.offerPercentage}% OFF
                        </strong>{' '}
                        on Advanced Tax Filing
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        {advancedFiling.startDate} to {advancedFiling.untilDate}
                      </span>
                    </div>
                  )}
              </>
            ) : (
              <div className="p-3.5 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-xs sm:text-sm text-gray-500">
                Advanced Tax Filing offer is currently disabled. Switch to{' '}
                <span className="font-semibold text-gray-700">Enable</span> above to configure Start Date, Until Date, and Percentage Offer.
              </div>
            )}

            <div className="pt-1">
              <Button
                onClick={handleSaveAdvancedFiling}
                isLoading={savingAdvanced}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Advanced Filing Settings
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card> */}

      {/* Add/Edit Form */}
      <Card>
        <Card.Header>
          <Card.Title>
            {editingKey ? 'Edit Setting' : 'Add New Setting'}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key (unique identifier) *
                </label>
                <Input
                  type="text"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value })
                  }
                  placeholder="e.g., privacy-policy"
                  disabled={!!editingKey}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use lowercase with hyphens (e.g., privacy-policy)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {settingTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Privacy Policy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content * (HTML supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter content here. HTML is supported."
                required
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingKey ? 'Update Setting' : 'Save Setting'}
              </Button>
              {editingKey && (
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Quick Add Default Settings */}
      <Card>
        <Card.Header>
          <Card.Title>Quick Add Default Settings</Card.Title>
          <Card.Description>
            Click to quickly add common settings with default keys
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defaultSettings.map((defaultSetting) => {
              const exists = settings.some((s) => s.key === defaultSetting.key);
              return (
                <button
                  key={defaultSetting.key}
                  onClick={() => {
                    if (!exists) {
                      setFormData({
                        key: defaultSetting.key,
                        title: defaultSetting.title,
                        content: '',
                        type: defaultSetting.type,
                      });
                      setEditingKey(null);
                    } else {
                      const existing = settings.find(
                        (s) => s.key === defaultSetting.key
                      );
                      handleEdit(existing);
                    }
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${exists
                    ? 'border-green-300 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {defaultSetting.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Key: {defaultSetting.key}
                      </p>
                    </div>
                    {exists && (
                      <span className="text-xs text-green-600 font-medium">
                        Added
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card.Content>
      </Card>

      {/* Existing Settings List */}
      <Card>
        <Card.Header>
          <Card.Title>Existing Settings</Card.Title>
          <Card.Description>
            Manage all content settings. Click edit to modify.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          {contentSettingsList.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No settings found. Add a new setting above.
            </p>
          ) : (
            <div className="space-y-3">
              {contentSettingsList.map((setting) => (
                <div
                  key={setting._id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {setting.title}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary-100 text-primary-700">
                        {setting.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Key: <code className="text-xs bg-gray-100 px-1 rounded">{setting.key}</code>
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(setting.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {setting.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(setting)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(setting._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ContentSettings;
