import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
import referralIllustration from '../assets/referral-contact-illustration.jpg';
import { submitWebsiteForm } from '../services/formApi';
import { getMyReferral } from '../services/referralApi';
import { getFrontendBaseUrl } from '../../baseurl';
import {
  GiftIcon,
  UserPlusIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
  CheckBadgeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Referrals = () => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [friends, setFriends] = useState([
    { id: 1, name: "", email: "", phone: "" },
  ]);

  const [yourName, setYourName] = useState("");
  const [yourNumber, setYourNumber] = useState("");
  const [referralError, setReferralError] = useState({});
  const isLoggedIn = !!localStorage.getItem("token") || !!localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingReferral, setLoadingReferral] = useState(false);

  const labelClass =
    "block text-xs font-semibold text-gray-800 mb-1.5 whitespace-nowrap";
  const getInputClass = (hasError = false) =>
    `w-full h-10 sm:h-11 px-3.5 text-[13px] sm:text-sm text-gray-900 bg-white rounded-lg border shadow-sm placeholder:text-slate-400 focus:outline-none transition-all duration-150 ${hasError
      ? "border-rose-400 hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15"
      : "border-slate-300 hover:border-slate-400 focus:border-[#165479] focus:ring-2 focus:ring-[#165479]/15"
    }`;

  // Load referral code when user is logged in
  useEffect(() => {
    const loadReferralCode = async () => {
      if (!isLoggedIn) return;

      setLoadingReferral(true);
      try {
        const referralRes = await getMyReferral();
        if (referralRes.success && referralRes.data) {
          setReferralCode(referralRes.data.referralCode || '');
        }
      } catch (error) {
        console.error('Error loading referral code:', error);
        if (error.message && !error.message.includes('complete registration')) {
          console.warn('Failed to load referral code:', error.message);
        }
      } finally {
        setLoadingReferral(false);
      }
    };

    loadReferralCode();
  }, [isLoggedIn]);

  const referralValidation = () => {
    const newError = {};
    if (!yourName.trim()) {
      newError.yourName = "Your name is required";
    }
    if (!yourNumber.trim()) {
      newError.yourNumber = "Your mobile number is required";
    }
    friends.forEach((friend, index) => {
      if (!friend.name.trim()) {
        newError[`friendName_${index}`] = "Friend's name is required";
      }
      if (!friend.email.trim()) {
        newError[`friendEmail_${index}`] = "Friend's email is required";
      }
    });

    setReferralError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleCopyCode = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic referral link - updates when referralCode changes
  const getReferralLink = () => {
    const baseUrl = getFrontendBaseUrl();
    if (!referralCode) return `${baseUrl}/register`;
    return `${baseUrl}/register?ref=${referralCode}`;
  };

  const handleCopyLink = () => {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleFriendChange = (id, field, value) => {
    const idx = friends.findIndex((f) => f.id === id);
    if (idx !== -1 && (field === "name" || field === "email")) {
      const errorKey = field === "name" ? `friendName_${idx}` : `friendEmail_${idx}`;
      if (referralError[errorKey]) {
        setReferralError((prev) => ({ ...prev, [errorKey]: "" }));
      }
    }
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, [field]: value } : friend
      )
    );
  };

  const addFriend = () => {
    const newId = Math.max(...friends.map((f) => f.id), 0) + 1;
    setFriends((prev) => [
      ...prev,
      { id: newId, name: "", email: "", phone: "" },
    ]);
  };

  const removeFriend = (id) => {
    if (friends.length > 1) {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
      setReferralError((prev) => {
        const cleaned = {};
        if (prev.yourName) cleaned.yourName = prev.yourName;
        if (prev.yourNumber) cleaned.yourNumber = prev.yourNumber;
        return cleaned;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validFriends = friends.filter(
      (friend) => friend.name.trim() && friend.email.trim()
    );

    if (!referralValidation()) return;

    setLoading(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const payload = {
        yourName,
        yourNumber,
        referralCode: referralCode || undefined,
        friends: validFriends.map((friend) => ({
          name: friend.name,
          email: friend.email,
          phone: friend.phone || "",
        })),
      };

      await submitWebsiteForm('refer-earn', payload);
      setSubmitSuccess(true);

      setTimeout(() => {
        setYourName("");
        setYourNumber("");
        setFriends([{ id: 1, name: "", email: "", phone: "" }]);
        setReferralError({});
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareEmail = () => {
    const referralLink = getReferralLink();
    const subject = 'Join IRS Tax Filer - Get Professional Tax Filing Services';
    const body = `Hi!

I've been using IRS Tax Filer for my tax filing and I think you'd love it too!

Here are my referral details:
• My Name: ${yourName || 'Your Friend'}
• My Mobile: ${yourNumber || 'N/A'}
• Referral Code: ${referralCode || 'N/A'}
• Referral Link: ${referralLink}

When you sign up using my referral code or link, both of us will receive benefits:
• You'll get US$ 5 discount on your first filing
• I'll get US$ 15 credit for referring you

Click here to get started: ${referralLink}

Best regards,
${yourName || 'Your Friend'}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleNumber = (e, setValue) => {
    let value = e.target.value.replace(/[^0-9+]/g, "");
    if (value.includes("+")) {
      value = "+" + value.slice(1).replace(/\+/g, "");
    }
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length > 15) return;
    setValue(value);
  };

  const benefits = [
    {
      icon: GiftIcon,
      title: "US$ 15 Credit for You",
      description:
        "Receive a US$ 15 credit toward your next filing, while your friend gets US$ 5 off their first return.",
    },
    {
      icon: StarIcon,
      title: "Unlimited Referrals",
      description:
        "Share your referral code with as many friends, family, or colleagues as you like and stack your rewards.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Priority CPA Support",
      description:
        "Every referred client receives streamlined onboarding and dedicated guidance from our licensed CPAs.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Share Your Code",
      description: "Send an invitation below or copy your personal referral code and link to share directly.",
    },
    {
      step: "02",
      title: "Friend Signs Up",
      description: "Your friend creates their IRS Tax Filer account using your referral code or invitation link.",
    },
    {
      step: "03",
      title: "Both Earn Rewards",
      description: "Your friend saves US$ 5 on their first filing, and you earn US$ 15 credit once they complete filing.",
    },
    {
      step: "04",
      title: "Stack Unlimited Credits",
      description: "There is no cap on referrals—invite as many people as you want each tax season.",
    },
  ];

  const title = "Referral Program | IRS Tax Filer";
  const description = "Refer a friend to IRS Tax Filer and earn rewards. Share our tax services and get US$ 15 credit when friends sign up and file.";
  const keywords = "referral program, Refer & Earn, IRS Tax Filer referrals, refer a friend tax filing, tax service referral, NRI tax referral";
  const canonical = window.location.href;
  const image = Logo;

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

        {/* ========================================================================= */}
        {/* 1. HERO & REFERRAL INVITATION WORKSPACE                                   */}
        {/* ========================================================================= */}
        <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Clean Centered Hero Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-4 text-xs font-medium text-[#749220]"
              >
                <span className="w-2 h-2 rounded-full bg-[#749220]" />
                <span>Refer Friends • Earn US$ 15 Credit Each</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-[1.2] mb-3.5"
              >
                Refer & Earn with{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  IRS Tax Filer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-6 max-w-2xl mx-auto"
              >
                Invite friends and colleagues to file with our licensed CPAs. They receive{" "}
                <span className="font-medium text-gray-900">US$ 5 off</span> their first return, and you earn{" "}
                <span className="font-medium text-gray-900">US$ 15 credit</span> when they file.
              </motion.p>
            </div>

            {/* Unified Split Card: Left Form Attached to Right Animated Contact Illustrator */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="bg-white rounded-md border border-slate-200/90 shadow-[0_2px_10px_rgba(22,84,121,0.035)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >

              {/* Left Side: Invite Friends Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-center text-[#749220] shrink-0">
                        <UserPlusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                          Invite a Friend
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Enter your details and the friends you'd like to invite.
                        </p>
                      </div>
                    </div>
                    {/* 
                    {!isLoggedIn && (
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#165479] hover:text-[#0A4973] bg-sky-50/80 px-3 py-1.5 rounded-full border border-sky-200/70 transition-colors"
                      >
                        <span>Sign in for your personal link</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    )} */}
                  </div>

                  {/* Error & Success Feedback */}
                  {submitError && (
                    <div className="mb-5 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs sm:text-sm">
                      {submitError}
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="mb-5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 shrink-0" />
                      <span>Referral invitation submitted successfully! We'll process it shortly.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Your Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="yourName" className={labelClass}>
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="yourName"
                          type="text"
                          value={yourName}
                          onChange={(e) => {
                            setYourName(e.target.value);
                            if (referralError.yourName) setReferralError((prev) => ({ ...prev, yourName: '' }));
                          }}
                          className={getInputClass(referralError.yourName)}
                          placeholder="e.g., Rahul Sharma"
                        />
                        {referralError.yourName && (
                          <p className="mt-1 text-rose-600 text-xs">{referralError.yourName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="yourNumber" className={labelClass}>
                          Your Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="yourNumber"
                          type="tel"
                          value={yourNumber}
                          onChange={(e) => {
                            handleNumber(e, setYourNumber);
                            if (referralError.yourNumber) setReferralError((prev) => ({ ...prev, yourNumber: '' }));
                          }}
                          className={getInputClass(referralError.yourNumber)}
                          placeholder="+1 (415) 223-1315"
                        />
                        {referralError.yourNumber && (
                          <p className="mt-1 text-rose-600 text-xs">{referralError.yourNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Friends Section Header */}
                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Friends to Invite ({friends.length})
                      </span>
                      <button
                        type="button"
                        onClick={addFriend}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#165479] bg-sky-50 hover:bg-sky-100 border border-sky-200/80 transition-colors cursor-pointer"
                      >
                        <PlusIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>Add Friend</span>
                      </button>
                    </div>

                    {/* Friends Rows */}
                    <div className="space-y-4">
                      {friends.map((friend, index) => (
                        <div
                          key={friend.id}
                          className={index > 0 ? "pt-4 border-t border-slate-100" : ""}
                        >
                          {friends.length > 1 && (
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#165479]">
                                Friend #{index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFriend(friend.id)}
                                title="Remove friend"
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <TrashIcon className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                            <div>
                              <label htmlFor={`friend-name-${friend.id}`} className={labelClass}>
                                Friend's Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id={`friend-name-${friend.id}`}
                                type="text"
                                value={friend.name}
                                onChange={(e) =>
                                  handleFriendChange(friend.id, "name", e.target.value)
                                }
                                placeholder="e.g., Priya Patel"
                                className={getInputClass(referralError[`friendName_${index}`])}
                              />
                              {referralError[`friendName_${index}`] && (
                                <p className="mt-1 text-rose-600 text-xs">
                                  {referralError[`friendName_${index}`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor={`friend-email-${friend.id}`} className={labelClass}>
                                Friend's Email <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id={`friend-email-${friend.id}`}
                                type="email"
                                value={friend.email}
                                onChange={(e) =>
                                  handleFriendChange(friend.id, "email", e.target.value)
                                }
                                placeholder="priya@example.com"
                                className={getInputClass(referralError[`friendEmail_${index}`])}
                              />
                              {referralError[`friendEmail_${index}`] && (
                                <p className="mt-1 text-rose-600 text-xs">
                                  {referralError[`friendEmail_${index}`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor={`friend-phone-${friend.id}`} className={labelClass}>
                                Phone{" "}
                                <span className="text-[11px] font-normal text-gray-400">
                                  (Optional)
                                </span>
                              </label>
                              <input
                                id={`friend-phone-${friend.id}`}
                                type="tel"
                                value={friend.phone}
                                onChange={(e) =>
                                  handleNumber(e, (val) =>
                                    handleFriendChange(friend.id, "phone", val)
                                  )
                                }
                                placeholder="+1 (415) 223-1315"
                                className={getInputClass()}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11 sm:h-12 px-6 rounded-lg bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-sm border border-white/20 transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group"
                    >
                      <span>
                        {loading
                          ? "Sending Invitation..."
                          : `Send Referral Invitation (${friends.length})`}
                      </span>
                      {!loading && (
                        <ArrowRightIcon className="w-4 h-4 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side: Animated Contact & Referral Illustrator */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#DFEBC2] via-[#E2EEF7] to-[#C3DCED] border-t lg:border-t-0 lg:border-l border-[#165479]/15 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden">
                {/* Ambient Background Glows */}
                <div className="absolute -top-12 -right-12 w-52 h-52 bg-[#749220]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-[#165479]/25 rounded-full blur-3xl pointer-events-none" />

                {/* Top Status Bar */}
                <div className="relative z-10 w-full flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A4973] bg-white/95 px-3 py-1 rounded-full border border-[#165479]/15 shadow-sm">
                    <SparklesIcon className="w-3.5 h-3.5 text-[#749220]" />
                    <span>Quick Contact & Invite</span>
                  </span>
                  <span className="text-xs font-semibold text-[#0A4973]">
                    Instant Rewards
                  </span>
                </div>

                {/* Center: Floating Animated Contact/Referral Illustration */}
                <div className="relative my-auto py-5 w-full flex flex-col items-center justify-center z-10">
                  <div className={`relative ${isLoggedIn ? "w-40 h-40" : "w-52 sm:w-56 h-52 sm:h-56"} flex items-center justify-center`}>
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      <div className="w-full h-full rounded-2xl bg-white p-1.5 border border-white/90 shadow-[0_3px_12px_rgba(10,73,115,0.06)] overflow-hidden flex items-center justify-center">
                        <img
                          src={referralIllustration}
                          alt="Contact and Invite Friends for Tax Rewards Illustration"
                          className="w-full h-full object-contain rounded-xl select-none pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Logged-in Controls OR Guest Summary */}
                  {isLoggedIn ? (
                    <div className="w-full mt-5 pt-4 border-t border-[#165479]/15 space-y-3 text-left">
                      <div>
                        <label className="block text-xs font-semibold text-gray-800 mb-1">
                          Your Referral Code
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white rounded-lg px-3 py-2 text-sm font-mono font-bold tracking-wider text-center text-[#0A4973] border border-slate-300/90 shadow-sm">
                            {loadingReferral ? 'Loading...' : (referralCode || 'N/A')}
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            disabled={!referralCode || loadingReferral}
                            className="h-9 px-3 rounded-lg bg-[#165479] hover:bg-[#0A4973] text-white text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                          >
                            <ClipboardDocumentCheckIcon className="w-3.5 h-3.5" />
                            <span>{copied ? "Copied!" : "Copy"}</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-800 mb-1">
                          Direct Share Link
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={getReferralLink()}
                            readOnly
                            className="flex-1 h-9 px-3 bg-white rounded-lg text-xs text-gray-700 border border-slate-300/90 shadow-sm focus:outline-none truncate"
                          />
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            disabled={!referralCode || loadingReferral}
                            className="h-9 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-300/90 shadow-sm text-[#0A4973] text-xs font-medium transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            <span>{copiedLink ? "Copied" : "Link"}</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleShareEmail}
                        disabled={!referralCode || loadingReferral}
                        className="w-full h-9 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-300/90 shadow-sm text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <EnvelopeIcon className="w-4 h-4 text-[#165479]" />
                        <span>Share via Email</span>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 max-w-[280px]">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                        Connect, Share &{" "}
                        <span className="bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                          Save Together
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 font-normal mt-1.5 leading-relaxed">
                        Send a quick invitation and our team contacts your friends with your referral savings attached.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Trust Bar */}
                {/* <div className="relative z-10 w-full pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircleIcon className="w-4 h-4 text-[#749220]" />
                    <span>US$ 15 Your Credit</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <TagIcon className="w-4 h-4 text-[#165479]" />
                    <span>US$ 5 Friend Off</span>
                  </span>
                </div> */}
              </div>

            </motion.div >
          </div >
        </section >

        {/* ========================================================================= */}
        {/* 2. REWARDS FOR BOTH SECTION (CLEAN 3-COLUMN GRID)                         */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                Rewards for{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Both
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
                Every referral unlocks meaningful savings for you and your friend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-[#165479] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-[17px] font-semibold text-gray-900 mb-2 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-normal leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. HOW IT WORKS SECTION (CLEAN 4-STEP HORIZONTAL FLOW)                    */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-left mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25]">
                How It{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mt-2 max-w-2xl">
                Four simple steps to invite friends and earn unlimited tax filing credits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {howItWorks.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-[0_10px_24px_rgba(22,84,121,0.06)] hover:border-[#165479]/30 transition-all duration-200"
                >
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100 text-xs font-mono font-semibold text-[#165479] mb-4">
                    Step {item.step}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CLEAN, MINIMAL CTA SECTION                                             */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-16 bg-slate-50/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="rounded-2xl p-8 sm:p-10 bg-white border border-slate-200/90 shadow-2xs">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 tracking-tight mb-2.5">
                Ready to Start{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Earning Rewards?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-lg mx-auto mb-6 leading-relaxed">
                Share your referral code today and help friends file stress-free while unlocking credits for yourself.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to={isLoggedIn ? "/client/referrals" : "/login"}
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
                >
                  <span>{isLoggedIn ? "Manage My Referrals" : "Sign In & Get Code"}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 rounded-xl bg-white hover:bg-slate-50 text-gray-800 font-medium text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all"
                >
                  <span>View Pricing</span>
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-gray-500 font-normal">
                <span className="flex items-center gap-1.5">
                  <CheckBadgeIcon className="w-4 h-4 text-[#749220]" />
                  US$ 15 Credit per Referral
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-[#749220]" />
                  US$ 5 Off for Friends
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="w-4 h-4 text-[#749220]" />
                  Unlimited Invites
                </span>
              </div>
            </div>

          </div>
        </section>

      </div >
    </>
  );
};

export default Referrals;
