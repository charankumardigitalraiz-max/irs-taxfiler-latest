import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../../shared/components/common/Input';
import { settingsService } from '../../services/settingsService';
import { useToast } from '../../hooks/useToast';

const ContentSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
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
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      showError('Failed to load settings');
    } finally {
      setLoading(false);
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
            Manage terms & conditions, privacy policy, and other static content
          </p>
        </div>
      </div>

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
          {settings.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No settings found. Add a new setting above.
            </p>
          ) : (
            <div className="space-y-3">
              {settings.map((setting) => (
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

