import React from 'react';
import { FileCheck, Shield, Clock, Users } from 'lucide-react';
import Card from '../components/common/Card';

const AboutIRS = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#1F4264] via-[#17577A] to-[#127EAB] text-white p-6 shadow-md">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full border border-white/25" />
          <div className="absolute -right-2 top-6 w-32 h-32 rounded-full border border-white/15" />
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur text-xs font-medium text-sky-50 mb-3">
              <FileCheck className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>What is IRS Tax Filer?</span>
            </div>
            <h1 className="text-xl sm:text-[22px] font-medium text-white tracking-tight">
              Your trusted partner for US &amp; India tax filing
            </h1>
            <p className="text-[13px] sm:text-sm text-sky-100/90 font-medium mt-1">
              IRS Tax Filer is a dedicated platform to help NRIs, professionals, and families
              file their taxes correctly and on time, with expert support at every step.
            </p>
          </div>
        </div>
      </div>

      {/* Key points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary-600" />
              Secure & Compliant
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600 font-medium">
              We follow strict security practices and keep your data encrypted and confidential
              while ensuring your returns follow the latest tax laws.
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary-600" />
              Simple & Time-Saving
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600 font-medium">
              Upload your documents, answer a few questions, and our experts handle the
              preparation, review, and e-filing for you.
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary-600" />
              Expert Support
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600 font-medium">
              Get guidance from experienced tax professionals for both US and Indian returns,
              so you can file confidently.
            </p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AboutIRS;


