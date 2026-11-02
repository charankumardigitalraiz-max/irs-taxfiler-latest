import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { settingsService } from '../services/settingsService';

const Policies = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // Load common policy settings
      const keys = ['privacy-policy', 'terms-conditions', 'payment-terms', 'other-guidelines'];
      const loadedSettings = [];

      for (const key of keys) {
        try {
          const response = await settingsService.getSetting(key);
          if (response.success && response.data) {
            loadedSettings.push(response.data);
          }
        } catch (error) {
          console.error(`Failed to load setting ${key}:`, error);
        }
      }

      setSettings(loadedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = (key) => {
    const defaults = {
      'privacy-policy': {
        title: 'Privacy Policy',
        description: 'How we collect, use, and protect your personal information',
        content: '<ul><li>Your data is encrypted in transit and at rest where applicable.</li><li>We only use your information to provide tax filing and support services.</li><li>We do not sell your personal information to third parties.</li></ul>',
      },
      'terms-conditions': {
        title: 'Terms & Conditions',
        description: 'Rules for using the IRS Tax Filer client portal',
        content: '<ul><li>You are responsible for providing accurate and complete information.</li><li>Our team prepares returns based on the documents and details you share.</li><li>Service timelines may vary depending on document completeness.</li></ul>',
      },
      'payment-terms': {
        title: 'Payment Terms',
        description: 'How billing and payments work for tax filing services',
        content: '<ul><li>Pricing is shared with you before we start the filing process.</li><li>Payments are processed securely through our payment partners.</li><li>Refunds, if applicable, follow our service-specific refund policy.</li></ul>',
      },
      'other-guidelines': {
        title: 'Other Guidelines',
        description: 'Additional points about communication and support',
        content: '<ul><li>We primarily communicate via email, portal notifications, and calls.</li><li>Support response times may vary during peak tax season.</li><li>You can contact support anytime if you have questions about these policies.</li></ul>',
      },
    };
    return defaults[key] || { title: '', description: '', content: '' };
  };

  const displaySettings = [
    { key: 'privacy-policy', default: getDefaultContent('privacy-policy') },
    { key: 'terms-conditions', default: getDefaultContent('terms-conditions') },
    { key: 'payment-terms', default: getDefaultContent('payment-terms') },
    { key: 'other-guidelines', default: getDefaultContent('other-guidelines') },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading policies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Settings &amp; Policies
        </h1>
        <p className="text-gray-600 max-w-2xl text-sm">
          Review the key policies that govern how we handle your data, payments, and
          use of the IRS Tax Filer client portal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displaySettings.map((displaySetting) => {
          const setting = settings.find((s) => s.key === displaySetting.key);
          const data = setting || displaySetting.default;

          return (
            <Card key={displaySetting.key}>
              <Card.Header>
                <Card.Title>{data.title}</Card.Title>
                <Card.Description>
                  {data.description || 'Policy information'}
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div
                  className="text-sm text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Policies;


