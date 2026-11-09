import React from 'react';

/**
 * Service-Specific Color-Matched Vector Illustrations
 * Each illustration uses a distinct primary color theme matched to its tax service:
 * 1. Federal & State: US Trust Blue (#0284C7, #0A4973) & Emerald Refund (#10B981)
 * 2. FBAR & FATCA: Global Indigo (#4F46E5) & Oceanic Cyan (#06B6D4)
 * 3. Representation: Protective Amber (#D97706) & Shield Gold (#F59E0B)
 * 4. ITIN Assistance: Identity Violet (#7C3AED, #9333EA)
 * 5. Extension Filing: Deadline Sunset Coral & Orange (#EA580C, #F97316)
 * 6. US Incorporations: Corporate Sapphire (#2563EB, #1D4ED8)
 * 7. SMB Tax Filing: Financial Growth Mint & Emerald (#059669, #10B981)
 * 8. Indian Tax: Saffron (#EA580C) + Ashok Navy (#0A4973) + Emerald (#16A34A)
 * 9. Indian Representation: Legal Crimson (#991B1B) & Authority Gold (#D97706)
 * 10. CPA Advisory: Brand Olive (#749220) & Lime Accent (#CBF056)
 */

// 1. Federal, State & Local Tax Filing (Blue & Refund Emerald)
export const IllustrationFederalStateLocal = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="fsl-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0F7FF" />
        <stop offset="1" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="fsl-navy" x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="fsl-green" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <filter id="fsl-shadow" x="-8" y="-6" width="160" height="130" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0284C7" floodOpacity="0.12" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#fsl-bg)" />
    
    {/* Ambient Glows */}
    <circle cx="160" cy="90" r="60" fill="#0284C7" fillOpacity="0.06" />
    <circle cx="210" cy="70" r="40" fill="#10B981" fillOpacity="0.08" />

    {/* Back State Return Card */}
    <g transform="translate(142, 28) rotate(6)" opacity="0.75">
      <rect width="112" height="106" rx="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.2" />
      <rect x="14" y="16" width="40" height="6" rx="3" fill="#0284C7" opacity="0.4" />
      <rect x="14" y="32" width="75" height="4" rx="2" fill="#94A3B8" opacity="0.6" />
      <rect x="14" y="44" width="60" height="4" rx="2" fill="#94A3B8" opacity="0.6" />
      <rect x="14" y="56" width="80" height="4" rx="2" fill="#94A3B8" opacity="0.6" />
    </g>

    {/* Primary 1040 Folio Card */}
    <g filter="url(#fsl-shadow)" transform="translate(74, 26)">
      <rect width="136" height="116" rx="16" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.2" />
      
      {/* 1040 Header */}
      <rect x="14" y="14" width="48" height="16" rx="5" fill="url(#fsl-navy)" />
      <text x="38" y="26" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">1040</text>
      
      {/* Form lines */}
      <rect x="14" y="42" width="108" height="6" rx="3" fill="#E0F2FE" />
      <rect x="14" y="54" width="84" height="6" rx="3" fill="#F0F9FF" />
      <rect x="14" y="66" width="96" height="6" rx="3" fill="#E0F2FE" />

      {/* Maximum Refund Badge */}
      <rect x="14" y="84" width="108" height="20" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="25" cy="94" r="4" fill="#10B981" />
      <rect x="36" y="91" width="60" height="6" rx="3" fill="#059669" fillOpacity="0.5" />
    </g>

    {/* Floating Success Check Seal */}
    <g transform="translate(196, 78)">
      <circle cx="22" cy="22" r="22" fill="url(#fsl-green)" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M14 22L19 27L30 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 2. FBAR & FATCA Services (Global Indigo & Oceanic Cyan)
export const IllustrationFbarFatca = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="fbar-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5F3FF" />
        <stop offset="1" stopColor="#EDE9FE" />
      </linearGradient>
      <linearGradient id="fbar-globe" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#E0E7FF" />
      </linearGradient>
      <linearGradient id="fbar-shield" x1="0" y1="0" x2="40" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#3730A3" />
      </linearGradient>
      <filter id="fbar-shadow" x="-8" y="-6" width="120" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4F46E5" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#fbar-bg)" />

    {/* Orbital Latitude Rings */}
    <circle cx="160" cy="90" r="66" stroke="#C7D2FE" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
    <circle cx="160" cy="90" r="48" stroke="#DDD6FE" strokeWidth="1" opacity="0.9" />

    {/* Global Offshore Wireframe Globe */}
    <g filter="url(#fbar-shadow)" transform="translate(112, 42)">
      <circle cx="48" cy="48" r="44" fill="url(#fbar-globe)" stroke="#4F46E5" strokeWidth="1.5" />
      <ellipse cx="48" cy="48" rx="20" ry="44" stroke="#818CF8" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
      <line x1="4" y1="48" x2="92" y2="48" stroke="#818CF8" strokeWidth="1.2" />
      <line x1="14" y1="28" x2="82" y2="28" stroke="#818CF8" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="14" y1="68" x2="82" y2="68" stroke="#818CF8" strokeWidth="1" strokeDasharray="2 2" />

      {/* Global Currency Nodes */}
      <circle cx="28" cy="36" r="6" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
      <text x="28" y="39" fill="#0891B2" fontSize="7" fontWeight="700" textAnchor="middle">$</text>
      <circle cx="70" cy="62" r="6" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
      <text x="70" y="65" fill="#0891B2" fontSize="7" fontWeight="700" textAnchor="middle">€</text>
    </g>

    {/* Foreign Assets Security Shield */}
    <g transform="translate(190, 74)">
      <path d="M22 4L42 12V26C42 38 22 48 22 48C22 48 2 38 2 26V12L22 4Z" fill="url(#fbar-shield)" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M15 25L20 30L29 19" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 3. Representation Services (Protective Amber & Gold Legal Shield)
export const IllustrationRepresentation = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="rep-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFBEB" />
        <stop offset="1" stopColor="#FEF3C7" />
      </linearGradient>
      <linearGradient id="rep-shield" x1="0" y1="0" x2="90" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D97706" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <filter id="rep-shadow" x="-10" y="-8" width="120" height="130" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#D97706" floodOpacity="0.2" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#rep-bg)" />

    {/* Decorative Concentric Arcs */}
    <circle cx="160" cy="90" r="62" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 4" />

    {/* Primary IRS Audit Protection Shield */}
    <g filter="url(#rep-shadow)" transform="translate(116, 32)">
      <path d="M44 6L82 20V52C82 76 44 98 44 98C44 98 6 76 6 52V20L44 6Z" fill="url(#rep-shield)" stroke="#FFFFFF" strokeWidth="2" />
      
      {/* Inner Gold Shield */}
      <path d="M44 16L72 26V50C72 68 44 86 44 86C44 86 16 68 16 50V26L44 16Z" fill="#92400E" stroke="#F59E0B" strokeWidth="1.5" />
      
      {/* Victory Checkmark */}
      <path d="M31 50L40 59L57 41" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Verified IRS Defense Badge */}
    <g transform="translate(196, 88)">
      <circle cx="18" cy="18" r="18" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.8" />
      <text x="18" y="22" fill="#D97706" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">IRS</text>
    </g>
  </svg>
);

// 4. ITIN Assistance (Identity Violet & W-7 Smart Card)
export const IllustrationItin = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="itin-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF5FF" />
        <stop offset="1" stopColor="#F3E8FF" />
      </linearGradient>
      <linearGradient id="itin-header" x1="0" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED" />
        <stop offset="1" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="itin-shadow" x="-8" y="-6" width="170" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7C3AED" floodOpacity="0.12" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#itin-bg)" />

    {/* Primary ITIN Smart Card */}
    <g filter="url(#itin-shadow)" transform="translate(85, 38)">
      <rect width="150" height="104" rx="14" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1.2" />
      
      {/* Top Header Badge */}
      <rect x="14" y="14" width="52" height="14" rx="4" fill="url(#itin-header)" />
      <text x="40" y="24" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">FORM W-7</text>

      {/* Gold Smart Chip */}
      <rect x="14" y="38" width="22" height="18" rx="4" fill="#FDF4FF" stroke="#D946EF" strokeWidth="1" />
      <line x1="25" y1="38" x2="25" y2="56" stroke="#D946EF" strokeWidth="0.8" />
      <line x1="14" y1="47" x2="36" y2="47" stroke="#D946EF" strokeWidth="0.8" />

      {/* ITIN Number Pill (9XX-XX-XXXX) */}
      <rect x="44" y="42" width="76" height="10" rx="3" fill="#F3E8FF" stroke="#A855F7" strokeWidth="0.8" />
      <text x="82" y="50" fill="#7C3AED" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="monospace">9XX-XX-XXXX</text>

      {/* User Photo Silhouette */}
      <rect x="14" y="66" width="24" height="24" rx="6" fill="#7C3AED" />
      <circle cx="26" cy="74" r="4" fill="#FFFFFF" />
      <path d="M19 86C19 82 22 80 26 80C30 80 33 82 33 86" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Identity lines */}
      <rect x="44" y="68" width="60" height="5" rx="2.5" fill="#F3E8FF" />
      <rect x="44" y="78" width="40" height="5" rx="2.5" fill="#FAF5FF" />
    </g>

    {/* Purple Certified Acceptance Seal */}
    <g transform="translate(208, 92)">
      <circle cx="16" cy="16" r="16" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M11 16L14 19L21 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 5. Extension Filing (Deadline Coral Orange Clock & Calendar)
export const IllustrationExtension = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="ext-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF7ED" />
        <stop offset="1" stopColor="#FFEDD5" />
      </linearGradient>
      <linearGradient id="ext-clock" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA580C" />
        <stop offset="1" stopColor="#C2410C" />
      </linearGradient>
      <filter id="ext-shadow" x="-8" y="-6" width="140" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#EA580C" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#ext-bg)" />

    {/* Calendar Sheet */}
    <g filter="url(#ext-shadow)" transform="translate(86, 34)">
      <rect width="116" height="110" rx="14" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="1.2" />
      
      {/* Orange Calendar Header */}
      <rect width="116" height="26" rx="14" fill="#EA580C" />
      <rect y="16" width="116" height="10" fill="#EA580C" />
      <circle cx="28" cy="13" r="3" fill="#FFFFFF" opacity="0.7" />
      <circle cx="88" cy="13" r="3" fill="#FFFFFF" opacity="0.7" />
      <text x="58" y="17" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">FORM 4868</text>

      {/* Date Grid */}
      <g transform="translate(18, 38)">
        <rect x="0" y="0" width="16" height="14" rx="3" fill="#FFF7ED" />
        <rect x="22" y="0" width="16" height="14" rx="3" fill="#FFF7ED" />
        <rect x="44" y="0" width="16" height="14" rx="3" fill="#FFF7ED" />
        <rect x="66" y="0" width="16" height="14" rx="3" fill="#FFF7ED" />

        <rect x="0" y="20" width="16" height="14" rx="3" fill="#FFF7ED" />
        <rect x="22" y="20" width="16" height="14" rx="3" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.2" />
        <text x="30" y="30" fill="#EA580C" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">OCT</text>
        <rect x="44" y="20" width="16" height="14" rx="3" fill="#FFF7ED" />
        <rect x="66" y="20" width="16" height="14" rx="3" fill="#FFF7ED" />
      </g>

      {/* Extension Badge */}
      <rect x="18" y="82" width="80" height="16" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="0.8" />
      <text x="58" y="93" fill="#EA580C" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">+6 MONTHS EXTENSION</text>
    </g>

    {/* Floating Coral Orange Stopwatch */}
    <g transform="translate(186, 76)">
      <circle cx="26" cy="26" r="24" fill="url(#ext-clock)" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="26" cy="26" r="2" fill="#FED7AA" />
      <line x1="26" y1="26" x2="26" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="26" x2="36" y2="26" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. US Incorporations (Corporate Sapphire Blue Towers & Entity Seal)
export const IllustrationIncorporation = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="inc-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EFF6FF" />
        <stop offset="1" stopColor="#DBEAFE" />
      </linearGradient>
      <linearGradient id="inc-navy" x1="0" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="inc-shadow" x="-8" y="-6" width="150" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2563EB" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#inc-bg)" />

    {/* Corporate Certificate Card */}
    <g filter="url(#inc-shadow)" transform="translate(76, 32)">
      <rect width="130" height="112" rx="14" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.2" />
      
      {/* LLC / Corp Header */}
      <rect x="14" y="14" width="56" height="14" rx="4" fill="url(#inc-navy)" />
      <text x="42" y="24" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">LLC / CORP</text>

      {/* Modern Building Towers Motif */}
      <g transform="translate(14, 40)">
        <rect x="0" y="16" width="22" height="36" rx="3" fill="#60A5FA" />
        <rect x="4" y="22" width="4" height="4" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="14" y="22" width="4" height="4" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="4" y="30" width="4" height="4" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="14" y="30" width="4" height="4" rx="1" fill="#FFFFFF" opacity="0.7" />

        <rect x="26" y="4" width="26" height="48" rx="3" fill="#2563EB" />
        <rect x="32" y="12" width="5" height="5" rx="1" fill="#93C5FD" />
        <rect x="41" y="12" width="5" height="5" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="32" y="22" width="5" height="5" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="41" y="22" width="5" height="5" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="32" y="32" width="5" height="5" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="41" y="32" width="5" height="5" rx="1" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Information lines */}
      <rect x="70" y="44" width="46" height="5" rx="2.5" fill="#DBEAFE" />
      <rect x="70" y="54" width="38" height="5" rx="2.5" fill="#EFF6FF" />
      <rect x="70" y="64" width="42" height="5" rx="2.5" fill="#DBEAFE" />

      {/* Federal EIN Seal */}
      <rect x="14" y="86" width="102" height="16" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="0.8" />
      <text x="65" y="97" fill="#1D4ED8" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">EIN & ARTICLES READY</text>
    </g>

    {/* Sapphire Official Seal */}
    <g transform="translate(192, 78)">
      <circle cx="22" cy="22" r="22" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="17" fill="none" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M16 22L20 26L28 17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 7. Small & Medium Business Tax Filing (Growth Emerald & Profit Chart)
export const IllustrationSmbTax = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="smb-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ECFDF5" />
        <stop offset="1" stopColor="#D1FAE5" />
      </linearGradient>
      <linearGradient id="smb-header" x1="0" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <filter id="smb-shadow" x="-8" y="-6" width="150" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#059669" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#smb-bg)" />

    {/* Financial Report Folio */}
    <g filter="url(#smb-shadow)" transform="translate(82, 34)">
      <rect width="130" height="110" rx="14" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.2" />
      
      {/* 1120-S Header */}
      <rect x="14" y="14" width="60" height="14" rx="4" fill="url(#smb-header)" />
      <text x="44" y="24" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">FORM 1120-S</text>

      {/* Emerald Growth Bar Chart */}
      <g transform="translate(18, 42)">
        <rect x="0" y="24" width="14" height="24" rx="3" fill="#D1FAE5" />
        <rect x="20" y="14" width="14" height="34" rx="3" fill="#6EE7B7" />
        <rect x="40" y="8" width="14" height="40" rx="3" fill="#10B981" />
        <rect x="60" y="0" width="14" height="48" rx="3" fill="#059669" />

        {/* Growth Arrow */}
        <path d="M7 22L27 12L47 6L67 0" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="67" cy="0" r="3" fill="#047857" />
      </g>

      {/* Corporate Write-Offs Banner */}
      <rect x="14" y="84" width="102" height="16" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="0.8" />
      <text x="65" y="95" fill="#047857" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">MAX CORPORATE WRITE-OFFS</text>
    </g>

    {/* Floating Profit Token */}
    <g transform="translate(194, 78)">
      <circle cx="20" cy="20" r="20" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
      <text x="20" y="26" fill="#FFFFFF" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">%</text>
    </g>
  </svg>
);

// 8. Indian Tax Filing (Warm Saffron, Ashok Navy & Forest Green)
export const IllustrationIndianTax = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="itr-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF7ED" />
        <stop offset="1" stopColor="#F0FDF4" />
      </linearGradient>
      <linearGradient id="itr-saffron" x1="0" y1="0" x2="50" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA580C" />
        <stop offset="1" stopColor="#C2410C" />
      </linearGradient>
      <filter id="itr-shadow" x="-8" y="-6" width="150" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#EA580C" floodOpacity="0.12" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#itr-bg)" />

    {/* ITR Document Card */}
    <g filter="url(#itr-shadow)" transform="translate(86, 32)">
      <rect width="128" height="114" rx="14" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="1.2" />
      
      {/* Saffron ITR Header */}
      <rect x="14" y="14" width="46" height="14" rx="4" fill="url(#itr-saffron)" />
      <text x="37" y="24" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">ITR-1 / 2</text>

      {/* Tricolor Top Emblem */}
      <circle cx="104" cy="21" r="3" fill="#EA580C" />
      <circle cx="111" cy="21" r="3" fill="#0A4973" />
      <circle cx="118" cy="21" r="3" fill="#16A34A" />

      {/* Form lines */}
      <rect x="14" y="38" width="100" height="6" rx="3" fill="#FFEDD5" />
      <rect x="14" y="48" width="75" height="6" rx="3" fill="#FFF7ED" />
      <rect x="14" y="58" width="88" height="6" rx="3" fill="#FFEDD5" />
      
      {/* DTAA Treaty Relief */}
      <rect x="14" y="72" width="100" height="14" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="0.8" />
      <text x="64" y="82" fill="#16A34A" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">DTAA TAX TREATY RELIEF</text>

      {/* ITD Portal Verification */}
      <rect x="14" y="92" width="100" height="12" rx="4" fill="#F8FAFC" />
      <circle cx="22" cy="98" r="2.5" fill="#0A4973" />
      <text x="62" y="101" fill="#0A4973" fontSize="6.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">ITD PORTAL VERIFIED</text>
    </g>

    {/* Tricolor Compliance Badge */}
    <g transform="translate(196, 82)">
      <circle cx="20" cy="20" r="20" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M13 20L17 24L27 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 9. Representation Services (India IT Authorities Dispute - Legal Crimson & Gold)
export const IllustrationIndianRep = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="inrep-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF2F2" />
        <stop offset="1" stopColor="#FEE2E2" />
      </linearGradient>
      <linearGradient id="inrep-shield" x1="0" y1="0" x2="80" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#991B1B" />
        <stop offset="1" stopColor="#7F1D1D" />
      </linearGradient>
      <filter id="inrep-shadow" x="-8" y="-6" width="120" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#991B1B" floodOpacity="0.18" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#inrep-bg)" />

    {/* Concentric Legal Ring */}
    <circle cx="160" cy="90" r="64" stroke="#FECACA" strokeWidth="1" strokeDasharray="3 4" />

    {/* Authority Shield */}
    <g filter="url(#inrep-shadow)" transform="translate(120, 36)">
      <path d="M40 6L76 18V48C76 72 40 92 40 92C40 92 4 72 4 48V18L40 6Z" fill="url(#inrep-shield)" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M40 16L66 26V46C66 64 40 80 40 80C40 80 14 64 14 46V26L40 16Z" fill="#7F1D1D" stroke="#F59E0B" strokeWidth="1.2" />
      
      {/* Dispute Resolution Checkmark */}
      <path d="M28 46L36 54L52 38" stroke="#FDE68A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* ITAT Legal Badge */}
    <g transform="translate(188, 86)">
      <circle cx="18" cy="18" r="18" fill="#FFFFFF" stroke="#991B1B" strokeWidth="1.8" />
      <text x="18" y="22" fill="#991B1B" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">ITAT</text>
    </g>
  </svg>
);

// 10. CPA Advisory (Brand Olive & Lime Accent)
export const IllustrationCpaAdvisory = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
    <defs>
      <linearGradient id="cpa-bg" x1="160" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6F9EE" />
        <stop offset="1" stopColor="#EEF6DC" />
      </linearGradient>
      <linearGradient id="cpa-olive" x1="0" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#749220" />
        <stop offset="1" stopColor="#5D7619" />
      </linearGradient>
      <filter id="cpa-shadow" x="-8" y="-6" width="150" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#749220" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect width="320" height="180" fill="url(#cpa-bg)" />

    {/* Advisory Session Card */}
    <g filter="url(#cpa-shadow)" transform="translate(86, 32)">
      <rect width="128" height="114" rx="14" fill="#FFFFFF" stroke="#D5E8A9" strokeWidth="1.2" />
      
      {/* Header */}
      <rect x="14" y="14" width="56" height="14" rx="4" fill="url(#cpa-olive)" />
      <text x="42" y="24" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">CPA 1-ON-1</text>

      {/* Two Dialogue Nodes */}
      <g transform="translate(16, 40)">
        <rect x="0" y="0" width="60" height="18" rx="6" fill="#0A4973" />
        <text x="30" y="12" fill="#FFFFFF" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Tax Strategy</text>

        <rect x="36" y="22" width="60" height="18" rx="6" fill="#F6F9EE" stroke="#749220" strokeWidth="1" />
        <text x="66" y="34" fill="#749220" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Audit Defense</text>
      </g>

      {/* Free 15-Min Banner */}
      <rect x="14" y="88" width="100" height="14" rx="5" fill="#F6F9EE" stroke="#749220" strokeWidth="0.8" />
      <text x="64" y="98" fill="#749220" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">FREE 15-MIN DISCOVERY CALL</text>
    </g>

    {/* Verified Star Badge */}
    <g transform="translate(196, 78)">
      <circle cx="20" cy="20" r="20" fill="#0A4973" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M20 11L22.5 16.5L28.5 17.5L24 22L25 28L20 25L15 28L16 22L11.5 17.5L17.5 16.5L20 11Z" fill="#CBF056" />
    </g>
  </svg>
);
