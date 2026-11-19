/**
 * Admin Voice Memo & Notification Sound Service
 * Configured with Indian English voice (en-IN) for crisp, clear announcements.
 */

let activeUtterance = null;
let audioContext = null;

/**
 * Get best available Indian English voice from the browser
 * Prioritizes Microsoft Neerja (Natural), Microsoft Prabhat (Natural), Google English (India)
 */
export const getIndianEnglishVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Prioritize Natural / Online Indian English voices (Microsoft Neerja, Prabhat Natural)
  const indianNatural = voices.find(
    (v) =>
      (v.lang.toLowerCase() === 'en-in' ||
        v.lang.toLowerCase().startsWith('en-in') ||
        v.name.toLowerCase().includes('india')) &&
      (v.name.includes('Natural') || v.name.includes('Online'))
  );
  if (indianNatural) return indianNatural;

  // 2. Specific Indian English voices (Neerja, Prabhat, Heera, Ravi, Google)
  const indianNamed = voices.find(
    (v) =>
      (v.lang.toLowerCase() === 'en-in' ||
        v.lang.toLowerCase().startsWith('en-in') ||
        v.name.toLowerCase().includes('india')) &&
      (v.name.includes('Neerja') ||
        v.name.includes('Prabhat') ||
        v.name.includes('Heera') ||
        v.name.includes('Ravi') ||
        v.name.includes('Google'))
  );
  if (indianNamed) return indianNamed;

  // 3. Any en-IN language voice
  const anyIndianEnglish = voices.find(
    (v) =>
      v.lang.toLowerCase() === 'en-in' ||
      v.lang.toLowerCase().startsWith('en-in') ||
      v.name.toLowerCase().includes('india')
  );
  if (anyIndianEnglish) return anyIndianEnglish;

  // 4. Fallback to clean natural English voice if en-IN not installed on host OS
  const cleanEnglish =
    voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Jenny') ||
          v.name.includes('Samantha') ||
          v.name.includes('Zira'))
    ) || voices.find((v) => v.lang.startsWith('en'));

  return cleanEnglish || null;
};

// Warm up voices cache as early as possible
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/**
 * Play a gentle 2-tone chime using Web Audio API before voice memo
 */
export const playAdminChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContext || audioContext.state === 'closed') {
      audioContext = new AudioCtx();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const now = audioContext.currentTime;

    // First tone (E5 ~ 659.25 Hz)
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Second tone (A5 ~ 880 Hz) - pleasant bright alert
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.45);
  } catch (err) {
    console.warn('[Admin Voice] Failed to play chime:', err);
  }
};

/**
 * Speak voice memo in clear Indian English
 * @param {string} text - Message to speak
 */
export const speakAdminVoiceMemo = (text) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[Admin Voice] Speech synthesis not supported in this browser');
    return;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    window._activeAdminUtterance = utterance;

    // Use en-IN locale
    utterance.lang = 'en-IN';
    // Clear, comfortable pacing for clarity
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const selectedVoice = getIndianEnglishVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`[Admin Voice] Using voice: "${selectedVoice.name}" (${selectedVoice.lang})`);
    }

    utterance.onend = () => {
      activeUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn('[Admin Voice] Utterance error:', e);
      activeUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.resume();
  } catch (err) {
    console.warn('[Admin Voice] Speech error:', err);
  }
};

/**
 * Complete alert for new client registration: Chime + Indian English Voice Memo
 * Formats name and User ID cleanly so pronunciation is clear.
 * @param {object} clientData - { fullName, userId, email }
 */
export const notifyAdminNewClientRegistration = (clientData) => {
  const name =
    clientData?.fullName ||
    `${clientData?.firstName || ''} ${clientData?.lastName || ''}`.trim() ||
    clientData?.email?.split('@')[0] ||
    'a client';

  // Format user ID with spaces between digits (e.g. "I R S 2 6 1 0 1") for clear pronunciation
  let formattedUserId = '';
  if (clientData?.userId) {
    formattedUserId = clientData.userId
      .replace(/^IRS/i, 'IRS ')
      .split('')
      .join(' ')
      .replace(/\s+/g, ' ');
  }

  // 1. Play chime immediately
  playAdminChime();

  // 2. Speak voice memo after short 250ms gap
  setTimeout(() => {
    const memo = formattedUserId
      ? `Attention! New client registered, ${name}. User ID: ${formattedUserId}.`
      : `Attention! New client registered, ${name}.`;
    speakAdminVoiceMemo(memo);
  }, 250);
};

// Console test helper for browser testing
if (typeof window !== 'undefined') {
  window.testAdminVoiceMemo = (clientName = 'Suresh Kumar', userId = 'IRS26101') => {
    console.log(`[Admin Voice] Testing Indian English voice memo for: ${clientName} (${userId})`);
    notifyAdminNewClientRegistration({ fullName: clientName, userId });
  };

  // Helper to list all available voices in console
  window.listAllVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    console.table(
      voices.map((v) => ({
        Name: v.name,
        Lang: v.lang,
        Default: v.default,
        Local: v.localService,
      }))
    );
    const indianVoice = getIndianEnglishVoice();
    console.log('🌟 Selected Indian English Voice:', indianVoice?.name || 'None detected');
    return voices;
  };
}

export default {
  playAdminChime,
  speakAdminVoiceMemo,
  notifyAdminNewClientRegistration,
  getIndianEnglishVoice,
};
