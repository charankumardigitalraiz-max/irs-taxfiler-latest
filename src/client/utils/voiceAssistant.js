/**
 * Voice Assistant Utility
 * Uses the Web Speech API (speechSynthesis) configured with Indian English (en-IN)
 * for crisp, articulate pronunciation of names and greetings.
 */

// Keep a reference to prevent Chrome garbage-collection bug
let activeUtterance = null;

/**
 * Get best available Indian English voice from the browser
 */
export const getIndianEnglishVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Natural / Online Indian English voices (Microsoft Neerja / Prabhat Natural)
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
  const anyIndian = voices.find(
    (v) =>
      v.lang.toLowerCase() === 'en-in' ||
      v.lang.toLowerCase().startsWith('en-in') ||
      v.name.toLowerCase().includes('india')
  );
  if (anyIndian) return anyIndian;

  // 4. Fallback to clean natural English voice
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

// Warm up voices cache
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export const speakWelcome = (userName = '', isNewUser = false) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  try {
    // Chrome bug workaround: cancel any previous hung speech and resume
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Extract first name and clean it up
    let cleanName = '';
    if (userName && typeof userName === 'string') {
      cleanName = userName.trim().split(' ')[0];
      cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
    }

    // Fresh registration: "Welcome {{user name}}! Welcome to your dashboard."
    // Returning login: "Welcome back {{user name}}! Welcome to your dashboard."
    const greeting = isNewUser
      ? (cleanName ? `Welcome, ${cleanName}! Welcome to your dashboard.` : `Welcome to your dashboard!`)
      : (cleanName ? `Welcome back, ${cleanName}! Welcome to your dashboard.` : `Welcome back to your dashboard!`);

    const utterance = new SpeechSynthesisUtterance(greeting);
    utterance.lang = 'en-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick Indian English voice
    const selectedVoice = getIndianEnglishVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`[Client Voice] Using voice: "${selectedVoice.name}" (${selectedVoice.lang})`);
    }

    // Retain utterance reference so Chrome does not garbage-collect it mid-speech
    activeUtterance = utterance;
    window._activeSpeechUtterance = utterance;

    utterance.onend = () => {
      activeUtterance = null;
      window._activeSpeechUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn('Speech utterance error/event:', e);
      activeUtterance = null;
      window._activeSpeechUtterance = null;
    };

    // Speak immediately
    window.speechSynthesis.speak(utterance);

    // Chrome workaround: resume if paused after trigger
    setTimeout(() => {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 100);
  } catch (error) {
    console.warn('Voice prompt error:', error);
  }
};

let clientAudioContext = null;

/**
 * Play gentle notification chime via Web Audio API
 */
export const playNotificationChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!clientAudioContext || clientAudioContext.state === 'closed') {
      clientAudioContext = new AudioCtx();
    }
    if (clientAudioContext.state === 'suspended') {
      clientAudioContext.resume();
    }

    const now = clientAudioContext.currentTime;

    // First tone (E5 ~ 659.25 Hz)
    const osc1 = clientAudioContext.createOscillator();
    const gain1 = clientAudioContext.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(clientAudioContext.destination);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Second tone (A5 ~ 880 Hz)
    const osc2 = clientAudioContext.createOscillator();
    const gain2 = clientAudioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.0, now + 0.12);
    gain2.gain.setValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc2.connect(gain2);
    gain2.connect(clientAudioContext.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.38);
  } catch (err) {
    console.warn('Audio chime error:', err);
  }
};

/**
 * Speak real-time notification memo in Indian English
 */
export const speakNotificationMemo = (title, message) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const textToSpeak = message || title || 'New update on your tax filing';
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = getIndianEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    activeUtterance = utterance;
    window._activeSpeechUtterance = utterance;

    utterance.onend = () => {
      activeUtterance = null;
      window._activeSpeechUtterance = null;
    };
    utterance.onerror = () => {
      activeUtterance = null;
      window._activeSpeechUtterance = null;
    };

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 280);
  } catch (err) {
    console.warn('Notification voice prompt error:', err);
  }
};

// Expose helper to window for direct testing in browser console
if (typeof window !== 'undefined') {
  window.testVoiceWelcome = (name, isNewUser = false) => speakWelcome(name, isNewUser);
  window.testClientChime = () => playNotificationChime();
  window.testClientMemo = (title, msg) => speakNotificationMemo(title, msg);
}

export default {
  speakWelcome,
  playNotificationChime,
  speakNotificationMemo,
  getIndianEnglishVoice,
};
