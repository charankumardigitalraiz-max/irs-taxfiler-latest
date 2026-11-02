import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';
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
  PhoneIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  TagIcon,
} from "@heroicons/react/24/outline";



const Referrals = () => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const inputClass =
    "w-full h-[44px] px-4 text-sm rounded-md border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#507295] focus:border-transparent";
  const [friends, setFriends] = useState([
    { id: 1, name: "", email: "", phone: "" },
  ]);

  const [referrals, setReferrals] = useState([]);
  const [yourName, setYourName] = useState("");
  const [yourNumber, setYourNumber] = useState("");
  const [referralError, setReferralError] = useState({});
  const isLoggedIn = !!localStorage.getItem("token") || !!localStorage.getItem("authToken");
  const currentURL = window.location.origin;

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingReferral, setLoadingReferral] = useState(false);

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
        // Don't show error if user hasn't completed registration yet
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
    let newError = {};
    if (!yourName.trim()) {
      newError.yourName = "Name is required";
    }

    if (!yourNumber.trim()) {
      newError.yourNumber = "Number is required";
    }
    // validate each friend
    friends.forEach((friend, index) => {
      if (!friend.name.trim()) {
        newError[`friendName_${index}`] = "Friend name is required";
      }
      if (!friend.email.trim()) {
        newError[`friendEmail_${index}`] = "Friend email is required";
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFriendChange = (id, field, value) => {
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
      {
        id: newId,
        name: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeFriend = (id) => {
    if (friends.length > 1) {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
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
        yourName: yourName,
        yourNumber: yourNumber,
        referralCode: referralCode || undefined, // Use fetched referral code if available
        friends: validFriends.map((friend) => ({
          name: friend.name,
          email: friend.email,
          phone: friend.phone || "",
        })),
      };

      await submitWebsiteForm('refer-earn', payload);
      setSubmitSuccess(true);
      
      // Reset form after success
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
    // Dynamic referral link - use the function to ensure it's always up-to-date
    const referralLink = getReferralLink();
    
    // Build email body with all details
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

Looking forward to helping you with your tax filing!

Best regards,
${yourName || 'Your Friend'}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
const handleNumber = (e, setValue) => {
  let value = e.target.value;

  value = value.replace(/[^0-9+]/g, "");

  if (value.includes("+")) {
    value =
      "+" + value.slice(1).replace(/\+/g, "");
  }

  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length > 15) return;

  setValue(value);
};

  const benefits = [
    {
      icon: GiftIcon,
      title: "You Can Get $15 Off",
      description:
        "your friend receive $5 discount on your next tax filing service.",
      color: "#EFF6FF",
    },
    {
      icon: StarIcon,
      title: "Unlimited Referrals",
      description:
        "Share your code with as many friends as you like and stack your savings.",
      color: "#F0FDF4",
    },
    {
      icon: ShieldCheckIcon,
      title: "Priority Support",
      description:
        "Referred clients get accelerated onboarding and dedicated support.",
      color: "#FEF3C7",
    },
  ];


   const title = "Referral Program | IRS Tax Filer";
    const description = "Refer a friend to IRS Tax Filer and earn rewards. Share our tax services — get benefits when friends sign up.";
    const keywords = "referral program,Refer & Earn,Information Referral,IRS Tax Filer referrals,  refer a friend tax filing, tax service referral, NRI tax referral,Refer A Friend";
    const canonical = window.location.href;
    const image = { Logo };

    console.log(canonical);
  return (

    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <SEO
              title={title}
              description={description}
              canonical={canonical}
              image={image}
              keywords={keywords}
            />
      {/* Enhanced Hero Section */}
      <section
        className="relative overflow-hidden py-20"
        style={{ backgroundColor: "#507295" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-purple-500/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          ></motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center  space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mt-8 mb-6 border border-white/30 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <StarIcon className="h-4 w-4 text-yellow-300 " />
              </motion.div>
              <span className="text-white font-semibold text-xs md:text-sm">
                Refer Friends. Earn Rewards.
              </span>
            </motion.div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-3 leading-tight">
              <span className="block text-white drop-shadow-lg text-xl md:text-2xl lg:text-3xl">
                Refer & Earn
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl text-xl md:text-2xl lg:text-3xl"
              >
                with irstax filer
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Share your personalized referral code with friends and family.
              When they file with us, both of you receive instant savings on
              your next service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Referral Code Card */}
            {isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-xl lg:col-span-1"
              >
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <GiftIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Your Referral Code
                    </h3>
                    <p className="text-sm text-white/70">
                      Share this code to earn rewards
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/90 mb-2">
                      Referral Code
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-xl font-bold tracking-widest text-center text-white border border-white/30">
                        {loadingReferral ? 'Loading...' : (referralCode || 'N/A')}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyCode}
                        disabled={!referralCode || loadingReferral}
                        className="px-4 py-3 bg-white text-[#507295] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/90 mb-2">
                      Referral Link
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={getReferralLink()}
                        readOnly
                        className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-xs text-white/90 border border-white/30"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyLink}
                        disabled={!referralCode || loadingReferral}
                        className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="space-y-2 text-sm text-white/80">
                      <div className="flex items-center space-x-2">
                        <GiftIcon className="h-4 w-4 text-yellow-300" />
                        <span>US$ 15 credit for you</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TagIcon className="h-4 w-4 text-green-300" />
                        <span>US$ 5 discount for friend</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShareEmail}
                      disabled={!referralCode || loadingReferral}
                      className="flex-1 px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      <span>Share via Email</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Refer a Friend Form */}
            <div
              className={`relative ${
                isLoggedIn
                  ? "lg:col-span-2"
                  : "lg:col-span-3 flex justify-center"
              }`}
            >
              {/* BADGE ABOVE CARD */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center justify-center gap-2 px-8 py-2.5 min-w-[260px] rounded-full bg-purple-100 text-purple-700 font-semibold text-sm shadow">
                  <StarIcon className="h-4 w-4" />
                  <span>Earn up to US$ 50 + benefits</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 lg:col-span-2"
              >
                {/* Your Details */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#507295] focus:border-transparent transition text-sm bg-white"
                      placeholder="e.g., Rahul Sharma"
                    />
                    {referralError.yourName && (
                      <span className="text-red-500 text-xs">
                        {referralError.yourName}
                      </span>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={yourNumber}
                      onChange={(e) => handleNumber(e, setYourNumber)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#507295] focus:border-transparent transition text-sm bg-white"
                      placeholder="+1 (415) 223-1315"
                    />
                    {referralError.yourNumber && (
                      <span className="text-red-500 text-xs">
                        {referralError.yourNumber}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#507295]/10 rounded-lg flex items-center justify-center">
                      <UserPlusIcon
                        className="h-5 w-5"
                        style={{ color: "#507295" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: "#507295" }}
                      >
                        Refer a Friend
                      </h3>
                      <p className="text-sm text-gray-500">
                        Send referral invitation to your friends
                      </p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={addFriend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-all duration-300 border-2"
                    style={{
                      borderColor: "#507295",
                      color: "#507295",
                      backgroundColor: "#54086310",
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Friend</span>
                  </motion.button>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    Referral submitted successfully! We'll process it soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {friends.map((friend, index) => (
                    <motion.div
                      key={friend.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_40px] gap-4 items-end px-4 py-4 border border-gray-200 rounded-xl bg-white"
                    >
                      {/* Friend Name */}
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Friend Name *
                        </label>
                        <input
                          type="text"
                          value={friend.name}
                          onChange={(e) =>
                            handleFriendChange(
                              friend.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Priya Sir"
                          className={inputClass}
                        />
                        {referralError[`friendName_${index}`] && (
                          <p className="text-red-500 text-xs">
                            {referralError[`friendName_${index}`]}
                          </p>
                        )}
                      </div>

                      {/* Friend Email */}
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Friend Email *
                        </label>
                        <input
                          type="email"
                          value={friend.email}
                          onChange={(e) =>
                            handleFriendChange(
                              friend.id,
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="e.g., priya@example.com"
                          className={inputClass}
                        />
                        {referralError[`friendEmail_${index}`] && (
                          <p className="text-red-500 text-xs">
                            {referralError[`friendEmail_${index}`]}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={friend.phone}
                          onChange={(e) =>
                            handleNumber(e, (val) =>
                              handleFriendChange(friend.id, "phone", val)
                            )
                          }
                          placeholder="e.g.,+1 (415) 223-1315"
                          className={inputClass}
                        />
                      </div>

                      {/* Note */}
                      <div className="min-w-0">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Note
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Works with me"
                          className={inputClass}
                        />
                      </div>

                      {/* Delete */}
                      <div className="flex items-center justify-center h-[44px]">
                        {friends.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFriend(friend.id)}
                            className="text-gray-400 hover:text-red-600 transition"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* SUBMIT BUTTON */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full py-3 rounded-xl font-bold text-white text-sm"
                    style={{ backgroundColor: "#507295" }}
                  >
                    {loading
                      ? "Sending..."
                      : `Send Referral (${friends.length})`}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            fill="currentColor"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
              Rewards for Both
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each referral unlocks savings for you and your friend. It's a
              win-win situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    style={{ backgroundColor: benefit.color }}
                  >
                    <Icon className="h-8 w-8" style={{ color: "#507295" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-primary-navy mb-3 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discount Information Section */}
      <section
        className="py-20 bg-gradient-to-br from-[#507295] via-[#4a6b8a] to-[#3f5f7a] text-white relative overflow-hidden
"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Simple steps to earn rewards for both you and your friends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Share Your Code</h3>
              </div>
              <p className="text-white/80">
                Copy your unique referral code and share it with friends via
                email, social media, or direct link.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Friend Signs Up</h3>
              </div>
              <p className="text-white/80">
                Your friend uses your referral code when signing up for irstax
                filer services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">You Can Get $15 Off</h3>
              </div>
              <p className="text-white/80">
                your friend completes their tax filing, Your Friend receive
                $5 discount.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <GiftIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Unlimited Referrals</h3>
              </div>
              <p className="text-white/80">
                There's no limit! Refer as many friends as you want and keep
                earning rewards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Ready to Start Earning?
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Share your referral code with friends and family today. Start
              earning rewards while helping others save on their tax filing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-10 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-2xl"
                  style={{ backgroundColor: "#507295" }}
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/pricing"
                  className="inline-flex items-center space-x-2 px-10 py-5 rounded-xl font-bold text-lg border-2 transition-all duration-300"
                  style={{ borderColor: "#507295", color: "#507295" }}
                >
                  <span>View Pricing</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Referrals;
