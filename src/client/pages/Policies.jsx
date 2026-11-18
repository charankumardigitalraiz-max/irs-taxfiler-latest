import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import PageLoader from '../components/common/PageLoader';
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
    return <PageLoader variant="policies" />;
  }

  return (
    <div className="space-y-6 irs-page-enter">
      {/* Intro */}
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
        <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight">
          Settings &amp; Policies
        </h2>
        <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
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
                  className="text-sm font-medium text-[#4A6178] leading-7 space-y-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2.5 [&_li]:leading-6 [&_p]:mb-3 [&_p:last-child]:mb-0"
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


