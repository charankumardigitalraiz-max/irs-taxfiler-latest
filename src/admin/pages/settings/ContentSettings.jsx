import { useState, useEffect, useRef } from 'react';
import {
  Save,
  Trash2,
  Edit2,
  Calendar,
  Percent,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Plus,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Header from '../../components/layout/Header';
import Modal from '../../components/common/Modal';
import Input from '../../../shared/components/common/Input';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../hooks/useToast';

const ADVANCED_FILING_KEY = 'advanced-tax-filing';
const WEBSITE_TOTAL_VIEWS_KEY = 'website-total-views';
const ORIGINAL_VISITS_STORAGE_KEY = 'irs_taxfiler_original_visits';
const ORIGINAL_RESET_STORAGE_KEY = 'irs_taxfiler_original_reset_at';
const VIEWS_SYNC_STORAGE_KEY = 'irs_taxfiler_views_sync_at';

const ContentSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [savingAdvanced, setSavingAdvanced] = useState(false);
  const [savingTotalViews, setSavingTotalViews] = useState(false);
  const [advancedFiling, setAdvancedFiling] = useState({
    enabled: false,
    startDate: '',
    untilDate: '',
    offerPercentage: '',
  });
  const [totalViewsConfig, setTotalViewsConfig] = useState({
    enabled: true,
    mode: 'default', // 'default' (Default + Original) | 'original' (Original Only)
    defaultViews: '14820',
    originalViews: 0,
    resetAt: null,
  });
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    content: '',
    type: 'terms',
  });
  const textareaRef = useRef(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 80)}px`;
    }
  }, [formData.content]);

  const handleContentInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.max(e.target.scrollHeight, 80)}px`;
  };

  useEffect(() => {
    loadSettings();

    // Live sync Original Website Visits if the website is opened in another tab
    const handleLiveVisitsUpdate = (event) => {
      if (!event || event.key === ORIGINAL_VISITS_STORAGE_KEY) {
        const latest = parseInt(
          localStorage.getItem(ORIGINAL_VISITS_STORAGE_KEY) || '0',
          10
        );
        if (!Number.isNaN(latest) && latest >= 0) {
          setTotalViewsConfig((prev) => ({
            ...prev,
            originalViews: latest,
          }));
        }
      }
    };

    window.addEventListener('storage', handleLiveVisitsUpdate);
    window.addEventListener('focus', handleLiveVisitsUpdate);
    return () => {
      window.removeEventListener('storage', handleLiveVisitsUpdate);
      window.removeEventListener('focus', handleLiveVisitsUpdate);
    };
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

        // Load Website Total Views configuration if saved
        const viewsSetting = allSettings.find((s) => s.key === WEBSITE_TOTAL_VIEWS_KEY);
        const localOriginal = parseInt(
          localStorage.getItem(ORIGINAL_VISITS_STORAGE_KEY) || '0',
          10
        );
        const safeLocalOriginal = Number.isNaN(localOriginal) ? 0 : Math.max(0, localOriginal);

        if (viewsSetting?.content) {
          try {
            const parsed = JSON.parse(viewsSetting.content);
            const savedOriginal = Number(parsed.originalViews);
            const safeSavedOriginal =
              !Number.isNaN(savedOriginal) && savedOriginal >= 0 ? Math.floor(savedOriginal) : 0;
            const localResetAt = localStorage.getItem(ORIGINAL_RESET_STORAGE_KEY);
            const effectiveOriginal =
              parsed.resetAt && localResetAt !== String(parsed.resetAt)
                ? safeSavedOriginal
                : Math.max(safeSavedOriginal, safeLocalOriginal);

            setTotalViewsConfig({
              enabled: parsed.enabled !== undefined ? Boolean(parsed.enabled) : true,
              mode: parsed.mode === 'original' ? 'original' : 'default',
              defaultViews:
                parsed.defaultViews !== undefined && parsed.defaultViews !== null
                  ? String(parsed.defaultViews)
                  : '14820',
              originalViews: effectiveOriginal,
              resetAt: parsed.resetAt || null,
            });
          } catch {
            // Keep defaults if content is not JSON
          }
        } else {
          setTotalViewsConfig((prev) => ({
            ...prev,
            originalViews: safeLocalOriginal,
          }));
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

  const handleResetOriginalViews = () => {
    const resetStamp = Date.now();
    try {
      localStorage.setItem(ORIGINAL_VISITS_STORAGE_KEY, '0');
      localStorage.setItem(ORIGINAL_RESET_STORAGE_KEY, String(resetStamp));
    } catch {
      // Ignore storage errors
    }
    setTotalViewsConfig((prev) => ({
      ...prev,
      originalViews: 0,
      resetAt: resetStamp,
    }));
  };

  const handleSaveTotalViews = async () => {
    const parsedViews = Number(totalViewsConfig.defaultViews);
    if (
      totalViewsConfig.mode === 'default' &&
      (totalViewsConfig.defaultViews === '' ||
        Number.isNaN(parsedViews) ||
        !Number.isInteger(parsedViews) ||
        parsedViews < 0)
    ) {
      showError('Please enter a valid non-negative whole number for Default Total Views');
      return;
    }

    const safeDefaultViews =
      !Number.isNaN(parsedViews) && parsedViews >= 0 ? Math.floor(parsedViews) : 0;

    try {
      setSavingTotalViews(true);
      const payload = {
        key: WEBSITE_TOTAL_VIEWS_KEY,
        title: 'Website Total Views',
        type: 'other',
        content: JSON.stringify({
          enabled: totalViewsConfig.enabled,
          mode: totalViewsConfig.mode,
          defaultViews: safeDefaultViews,
          originalViews: totalViewsConfig.originalViews || 0,
          resetAt: totalViewsConfig.resetAt || null,
        }),
      };

      const response = await settingsService.saveSetting(payload);
      if (response.success) {
        try {
          localStorage.setItem(VIEWS_SYNC_STORAGE_KEY, String(Date.now()));
        } catch {
          // Ignore storage errors
        }
        window.dispatchEvent(new Event('website-total-views-updated'));
        showSuccess(
          !totalViewsConfig.enabled
            ? 'Website Total Views counter disabled and saved'
            : totalViewsConfig.mode === 'original'
              ? 'Original Website Visits mode enabled and saved'
              : `Default + Original Visits (${safeDefaultViews.toLocaleString('en-US')} base) saved`
        );
        loadSettings();
      }
    } catch (error) {
      console.error('Failed to save Total Views setting:', error);
      showError(
        error.response?.data?.message || 'Failed to save Total Views setting'
      );
    } finally {
      setSavingTotalViews(false);
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
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingKey(null);
    setFormData({
      key: '',
      title: '',
      content: '',
      type: 'terms',
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setEditingKey(null);
    setFormData({
      key: '',
      title: '',
      content: '',
      type: 'terms',
    });
    setShowModal(false);
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
    (s) => s.key !== ADVANCED_FILING_KEY && s.key !== WEBSITE_TOTAL_VIEWS_KEY
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
      <Header
        title="Content Settings"
        subtitle="Manage advanced tax filing offers, terms & conditions, privacy policy, and static content"
      />

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

      {/* Website Total Views Setup (Enable / Disable + Default Starting Count) */}
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div>
                <Card.Title>Website Total Visits Setup</Card.Title>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure the default starting visit count displayed in the public website footer
                </p>
              </div>
            </div>

            {/* Enable / Disable Toggle Switch */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <span
                className={`text-xs font-semibold ${totalViewsConfig.enabled ? 'text-emerald-700' : 'text-gray-500'
                  }`}
              >
                {totalViewsConfig.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={totalViewsConfig.enabled}
                aria-label="Toggle Website Total Views Counter"
                onClick={() =>
                  setTotalViewsConfig((prev) => ({
                    ...prev,
                    enabled: !prev.enabled,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 ${totalViewsConfig.enabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${totalViewsConfig.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          <div className="space-y-4">
            {totalViewsConfig.enabled ? (
              <>
                {/* Visit Count Mode: Default + Original vs Original Only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Count Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTotalViewsConfig((prev) => ({ ...prev, mode: 'default' }))
                      }
                      className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${totalViewsConfig.mode === 'default'
                        ? 'border-[#127EAB] bg-[#E9F7FA]/60 ring-1 ring-[#127EAB]/30'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          Default + Original Visits
                        </span>
                        <span
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${totalViewsConfig.mode === 'default'
                            ? 'border-[#127EAB]'
                            : 'border-gray-300'
                            }`}
                        >
                          {totalViewsConfig.mode === 'default' && (
                            <span className="h-2 w-2 rounded-full bg-[#127EAB]" />
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Starts from your default visits count and increases every time someone opens the website.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTotalViewsConfig((prev) => ({ ...prev, mode: 'original' }))
                      }
                      className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${totalViewsConfig.mode === 'original'
                        ? 'border-[#127EAB] bg-[#E9F7FA]/60 ring-1 ring-[#127EAB]/30'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          Original Visits Only
                        </span>
                        <span
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${totalViewsConfig.mode === 'original'
                            ? 'border-[#127EAB]'
                            : 'border-gray-300'
                            }`}
                        >
                          {totalViewsConfig.mode === 'original' && (
                            <span className="h-2 w-2 rounded-full bg-[#127EAB]" />
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Counts only real website visits, increasing each time the website is opened.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Default Visits Input + Original Visits Counter + Footer Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  {totalViewsConfig.mode === 'default' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Total Visits *
                      </label>
                      <div className="relative">
                        <Eye className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={totalViewsConfig.defaultViews}
                          onChange={(e) =>
                            setTotalViewsConfig((prev) => ({
                              ...prev,
                              defaultViews: e.target.value,
                            }))
                          }
                          placeholder="e.g., 14820"
                          className="w-full pl-9 pr-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Original Website Visits Count */}
                  <div className={totalViewsConfig.mode === 'original' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Website Visits
                    </label>
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 tabular-nums">
                          {(totalViewsConfig.originalViews || 0).toLocaleString('en-US')}
                        </span>
                        <span className="text-xs text-gray-500">real visits</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetOriginalViews}
                        title="Reset original visit count to 0"
                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Footer Badge Preview */}
                  <div className="p-3 rounded-xl bg-[#1F4264] border border-[#16314A] flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-sky-100/80">
                      Preview
                    </span>
                    <div className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1 rounded-full bg-[#102E4A] border border-[#38BDF8]/45 text-xs">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                      <Eye className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="text-sky-100/90 font-medium">Total Visits</span>
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#127EAB] to-[#0EA5E9] text-white text-xs font-semibold tabular-nums">
                        {(() => {
                          const base =
                            totalViewsConfig.mode === 'default' &&
                              totalViewsConfig.defaultViews !== '' &&
                              !Number.isNaN(Number(totalViewsConfig.defaultViews)) &&
                              Number(totalViewsConfig.defaultViews) >= 0
                              ? Math.floor(Number(totalViewsConfig.defaultViews))
                              : 0;
                          const orig = totalViewsConfig.originalViews || 0;
                          return (base + orig).toLocaleString('en-US');
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-3.5 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-xs sm:text-sm text-gray-500">
                Website Total Visits counter is currently hidden from the website footer. Switch to{' '}
                <span className="font-semibold text-gray-700">Enable</span> above to display and configure Website Total Visits.
              </div>
            )}

            <div className="pt-1">
              <Button
                onClick={handleSaveTotalViews}
                isLoading={savingTotalViews}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Total Visits Settings
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
                  type="button"
                  onClick={() => {
                    if (!exists) {
                      setFormData({
                        key: defaultSetting.key,
                        title: defaultSetting.title,
                        content: '',
                        type: defaultSetting.type,
                      });
                      setEditingKey(null);
                      setShowModal(true);
                    } else {
                      const existing = settings.find(
                        (s) => s.key === defaultSetting.key
                      );
                      handleEdit(existing);
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${exists
                    ? 'border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 shadow-2xs'
                    : 'border-[#CCDCE1] bg-white hover:bg-[#F8FBFC] hover:border-[#127EAB]/40 shadow-2xs'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-[#1F4264]">
                        {defaultSetting.title}
                      </p>
                      <p className="text-xs text-[#6F7F8E] mt-0.5">
                        Key: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-[#1F4264]">{defaultSetting.key}</code>
                      </p>
                    </div>
                    {exists ? (
                      <span className="text-xs text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                        Added (Click to Edit)
                      </span>
                    ) : (
                      <span className="text-xs text-[#127EAB] font-semibold px-2.5 py-0.5 rounded-full bg-[#E9F7FA] border border-[#127EAB]/30">
                        + Add Setting
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Card.Title>Existing Settings</Card.Title>
              <Card.Description>
                Manage all content settings. Click edit to modify in a modal.
              </Card.Description>
            </div>
            <Button
              onClick={handleCreate}
              size="sm"
              className="flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Setting
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {contentSettingsList.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No settings found. Click "Add New Setting" above to create one.
            </p>
          ) : (
            <div className="space-y-3">
              {contentSettingsList.map((setting) => (
                <div
                  key={setting._id}
                  className="flex items-start justify-between p-4 border border-[#CCDCE1] rounded-xl hover:bg-[#F8FBFC] hover:border-[#127EAB]/30 transition-all shadow-2xs"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-sm sm:text-base text-[#1F4264]">
                        {setting.title}
                      </h3>
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/20 capitalize">
                        {setting.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6F7F8E] mb-1">
                      Key: <code className="text-xs bg-slate-100 text-[#1F4264] px-1.5 py-0.5 rounded font-mono border border-slate-200">{setting.key}</code>
                    </p>
                    <p className="text-xs text-[#8BA0B2]">
                      Last updated: {new Date(setting.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2 text-xs sm:text-sm text-[#5A6E82] line-clamp-2 leading-relaxed">
                      {setting.content.replace(/<[^>]*>/g, '').substring(0, 160)}...
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(setting)}
                      className="h-8 w-8 !p-0 bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/30 hover:bg-[#127EAB] hover:text-white hover:border-[#127EAB] rounded-lg shadow-2xs transition-all cursor-pointer"
                      title="Edit Setting"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(setting._id)}
                      className="h-8 w-8 !p-0 bg-[#FEF4F2] text-[#EE6450] border border-[#EE6450]/30 hover:bg-[#EE6450] hover:text-white hover:border-[#EE6450] rounded-lg shadow-2xs transition-all cursor-pointer"
                      title="Delete Setting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Add / Edit Setting Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title={editingKey ? 'Edit Content Setting' : 'Add New Content Setting'}
        description={
          editingKey
            ? `Update content and details for "${formData.title || formData.key}"`
            : 'Configure a new policy, terms, or general content setting'
        }
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F4264] mb-1.5">
                Key (unique identifier) <span className="text-[#EE6450]">*</span>
              </label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                placeholder="e.g., privacy-policy"
                disabled={!!editingKey}
                required
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] text-[#1F4264] placeholder:text-slate-400/80 placeholder:font-normal placeholder:text-xs shadow-2xs transition-all hover:border-[#127EAB]/40 ${
                  editingKey ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
                }`}
              />
              <p className="text-[11px] text-[#6F7F8E] mt-1 font-medium">
                Use lowercase with hyphens (e.g., privacy-policy)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F4264] mb-1.5">
                Setting Type <span className="text-[#EE6450]">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] shadow-2xs transition-all hover:border-[#127EAB]/40 cursor-pointer"
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
            <label className="block text-xs font-semibold text-[#1F4264] mb-1.5">
              Title <span className="text-[#EE6450]">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Privacy Policy"
              required
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder:text-slate-400/80 placeholder:font-normal placeholder:text-xs shadow-2xs transition-all hover:border-[#127EAB]/40"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#1F4264]">
                Content <span className="text-[#EE6450]">*</span>{' '}
                <span className="text-xs font-normal text-[#6F7F8E]">(HTML supported)</span>
              </label>
              <span className="text-[11px] text-[#8BA0B2] font-medium">Adaptive height</span>
            </div>
            <textarea
              ref={textareaRef}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              onInput={handleContentInput}
              rows={4}
              className="w-full px-3.5 py-2.5 min-h-[90px] max-h-[500px] text-xs sm:text-sm font-medium border border-[#CCDCE1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder:text-slate-400/80 placeholder:font-normal placeholder:text-xs shadow-2xs transition-all hover:border-[#127EAB]/40 resize-none overflow-y-auto leading-relaxed"
              placeholder="Enter content here. HTML tags are supported..."
              required
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E6F0F5]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              className="px-4 py-2 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="min-w-[120px] px-4 py-2 bg-gradient-to-r from-[#1F4264] to-[#127EAB] hover:from-[#16314A] hover:to-[#0E668B] text-white shadow-xs font-semibold"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {editingKey ? 'Update Setting' : 'Save Setting'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ContentSettings;
