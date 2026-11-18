import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Gift,
  Check,
  Mail,
  Link2,
  Copy,
  Star,
  Plus,
  Trash2,
  Tag,
  Send,
} from 'lucide-react';
import Card from '../components/common/Card';
import PageLoader from '../components/common/PageLoader';
import { referralService } from '../services/referralService';
import { userService } from '../services/userService';
import { useToast } from '../../admin/hooks/useToast';
import { getUser } from '../utils/auth';
import { getFrontendBaseUrl } from '../../baseurl';

const createEmptyFriend = (id) => ({
  id,
  name: '',
  email: '',
  phone: '',
  note: '',
});

const fieldInputClass =
  'w-full px-3.5 py-2.5 text-sm font-normal text-[#1F4264] bg-white border border-[#C5D6E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-colors placeholder:text-xs placeholder:text-slate-400';

const readOnlyInputClass =
  'w-full px-3.5 py-2.5 text-sm font-normal text-[#334E68] bg-[#F4F9FB] border border-[#D6E4EC] rounded-md cursor-not-allowed focus:outline-none placeholder:text-xs placeholder:text-slate-400';

const fieldLabelClass = 'block text-[13px] font-medium text-[#334E68] mb-1.5';

const Referrals = () => {
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedType, setCopiedType] = useState(null); // 'code' | 'link' | null
  const [yourName, setYourName] = useState('');
  const [yourMobile, setYourMobile] = useState('');
  const [friends, setFriends] = useState([createEmptyFriend(1)]);

  const { showSuccess, showError } = useToast();

  // Load referral code and auto-fill user details once on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [referralRes, profileRes] = await Promise.all([
          referralService.getMyReferral().catch((err) => {
            console.error('Error loading referral:', err);
            return { success: false };
          }),
          userService.getProfile().catch((err) => {
            console.error('Error loading profile:', err);
            return { success: false };
          }),
        ]);

        if (referralRes?.success && referralRes.data) {
          setReferralCode(referralRes.data.referralCode || '');
        } else if (
          referralRes?.message &&
          !referralRes.message.includes('complete registration')
        ) {
          showError(referralRes.message || 'Failed to load referral info.');
        }

        if (profileRes?.success && profileRes.data) {
          const profileData = profileRes.data;
          const name =
            profileData.fullName ||
            (profileData.firstName && profileData.lastName
              ? `${profileData.firstName} ${profileData.lastName}`
              : '') ||
            profileData.email?.split('@')[0] ||
            '';
          if (name) setYourName(name);
          if (profileData.mobileNumber) setYourMobile(profileData.mobileNumber);
        } else {
          const user = getUser();
          if (user) {
            const name =
              user.fullName ||
              (user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : '') ||
              user.email?.split('@')[0] ||
              '';
            if (name) setYourName(name);
            if (user.mobileNumber) setYourMobile(user.mobileNumber);
          }
        }
      } catch (error) {
        console.error('Error loading referral page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReferralLink = () => {
    const baseUrl = getFrontendBaseUrl();
    if (!referralCode) return `${baseUrl}/register`;
    return `${baseUrl}/register?ref=${referralCode}`;
  };

  const copyToClipboard = async (text, type, successLabel) => {
    if (!text) {
      showError('Referral code is not available yet.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      showSuccess(successLabel);
      setTimeout(() => {
        setCopiedType((current) => (current === type ? null : current));
      }, 2000);
    } catch {
      showError('Unable to copy to clipboard.');
    }
  };

  const handleCopyCode = () =>
    copyToClipboard(referralCode, 'code', 'Referral code copied!');

  const handleCopyLink = () =>
    copyToClipboard(getReferralLink(), 'link', 'Referral link copied!');

  const handleShareEmail = () => {
    const referralLink = getReferralLink();
    const subject = 'Join IRS Tax Filer - Get Professional Tax Filing Services';
    const body = `Hi!

I've been using IRS Tax Filer for my tax filing and I think you'd love it too!

Here are my referral details:
• My Name: ${yourName || 'Your Friend'}
• My Mobile: ${yourMobile || 'N/A'}
• Referral Code: ${referralCode || 'N/A'}
• Referral Link: ${referralLink}

When you sign up using my referral code or link, both of us will receive benefits:
• You'll get US$ 5 discount on your first filing
• I'll get US$ 15 credit for referring you

Click here to get started: ${referralLink}

Looking forward to helping you with your tax filing!

Best regards,
${yourName || 'Your Friend'}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
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
    setFriends((prev) => [...prev, createEmptyFriend(newId)]);
  };

  const removeFriend = (id) => {
    if (friends.length > 1) {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const friendsWithData = friends.filter(
      (friend) =>
        friend.name.trim() ||
        friend.email.trim() ||
        friend.phone.trim() ||
        friend.note.trim()
    );

    if (friendsWithData.length === 0 && !yourName.trim() && !yourMobile.trim()) {
      showError('Please fill in at least some information before submitting.');
      return;
    }

    if (friendsWithData.length === 0) {
      showError('Please fill in at least one friend’s details before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await referralService.sendInvites({
        yourName,
        yourMobile,
        friends: friendsWithData,
      });

      if (res.success) {
        showSuccess(res.message || 'Referral invitations sent successfully!');
        setFriends([createEmptyFriend(1)]);
      } else {
        showError(res.message || 'Failed to send referrals. Please try again.');
      }
    } catch (error) {
      console.error('Error sending referrals:', error);
      showError('Error sending referrals. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader variant="referrals" />;
  }

  return (
    <div className="space-y-5 irs-page-enter">
      {/* Compact Brand Header Banner */}
      <div className="rounded-lg bg-gradient-to-r from-[#1F4264] via-[#17577A] to-[#127EAB] px-5 py-5 sm:px-6 sm:py-6 text-white shadow-[0_4px_16px_rgba(31,66,100,0.1)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-medium text-white mb-2.5">
              <Star className="h-3.5 w-3.5 text-amber-300" />
              <span>Refer Friends. Earn Rewards.</span>
            </div>
            <h1 className="text-xl sm:text-[22px] font-medium text-white tracking-tight">
              Refer &amp; Earn with IRS Tax Filer
            </h1>
            <p className="text-[13px] sm:text-sm text-sky-100/85 font-normal mt-1">
              Share your personalized referral code with friends and family. When they file with us, both of you receive instant savings on your next service.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-amber-400 text-[#1F4264] text-sm font-semibold shadow-sm shrink-0 self-start lg:self-auto">
            <Star className="h-4 w-4 shrink-0" />
            <span>Earn up to US$ 50 + benefits</span>
          </div>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column — Your Referral Code */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="lg:sticky lg:top-20 space-y-5">
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-[#E6F0F5]">
              <Gift className="h-4 w-4 text-[#127EAB] shrink-0" />
              <div>
                <h2 className="text-[15px] font-semibold text-[#1F4264]">
                  Your Referral Code
                </h2>
                <p className="text-xs font-medium text-[#6F7F8E]">
                  Share this code to earn rewards
                </p>
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label className={fieldLabelClass}>Referral Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#F4F9FB] border border-[#127EAB]/30 rounded-md px-3.5 py-2.5 text-center">
                  <span className="font-mono text-base font-semibold tracking-wider text-[#1F4264] select-all">
                    {referralCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  disabled={!referralCode}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#127EAB] hover:bg-[#0E668B] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  {copiedType === 'code' ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Referral Link */}
            <div>
              <label className={fieldLabelClass}>Referral Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={getReferralLink()}
                  readOnly
                  className="flex-1 min-w-0 px-3 py-2 rounded-md border border-[#D6E4EC] bg-[#F4F9FB] text-xs font-normal text-[#4A6178] focus:outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy referral link"
                  className="inline-flex items-center justify-center p-2 rounded-md border border-[#C5D6E0] bg-white hover:bg-[#F4F9FB] text-[#334E68] hover:text-[#1F4264] transition-colors cursor-pointer shrink-0"
                >
                  {copiedType === 'link' ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Reward Details */}
            <div className="pt-4 border-t border-[#E6F0F5] space-y-2.5 text-sm text-[#4A6178]">
              <div className="flex items-center gap-2.5">
                <Gift className="h-4 w-4 text-amber-500 shrink-0" />
                <span>US$ 15 credit for you</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Tag className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>US$ 5 discount for friend</span>
              </div>
            </div>

            {/* Share via Email */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleShareEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-[#C5D6E0] bg-white hover:bg-[#F4F9FB] text-[#1F4264] text-sm font-medium transition-colors cursor-pointer"
              >
                <Mail className="h-4 w-4 text-[#127EAB]" />
                <span>Share via Email</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column — Refer a Friend Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          <Card>
            <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-[#E6F0F5]">
              <UserPlus className="h-4 w-4 text-[#127EAB] shrink-0" />
              <div>
                <h2 className="text-[15px] font-semibold text-[#1F4264]">
                  Refer a Friend
                </h2>
                <p className="text-xs font-medium text-[#6F7F8E]">
                  Send referral invitation to your friends
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Your Details - Auto-filled from login, read-only */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-[#E6F0F5]">
                <div>
                  <label className={fieldLabelClass}>Your Name</label>
                  <input
                    type="text"
                    value={yourName}
                    readOnly
                    className={readOnlyInputClass}
                    placeholder="Auto-filled from your profile"
                  />
                </div>
                <div>
                  <label className={fieldLabelClass}>Your Mobile Number</label>
                  <input
                    type="tel"
                    value={yourMobile}
                    readOnly
                    className={readOnlyInputClass}
                    placeholder="Auto-filled from your profile"
                  />
                </div>
              </div>

              {/* Friends Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[13px] font-semibold text-[#1F4264]">
                    Friends Details
                  </h3>
                  <button
                    type="button"
                    onClick={addFriend}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border border-[#127EAB]/45 bg-[#E9F7FA] hover:bg-[#127EAB] text-[#0E668B] hover:text-white text-sm font-medium transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Friend</span>
                  </button>
                </div>

                {friends.map((friend, index) => (
                  <div
                    key={friend.id}
                    className="p-4 rounded-lg border border-[#D6E4EC] bg-[#FAFDFE] space-y-3.5"
                  >
                    {friends.length > 1 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#6F7F8E]">
                          Friend #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFriend(friend.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-red-600 bg-red-50 border border-red-200/80 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={fieldLabelClass}>Friend Name</label>
                        <input
                          type="text"
                          value={friend.name}
                          onChange={(e) =>
                            handleFriendChange(friend.id, 'name', e.target.value)
                          }
                          className={fieldInputClass}
                          placeholder="e.g., Priya Sir"
                        />
                      </div>

                      <div>
                        <label className={fieldLabelClass}>Friend Email</label>
                        <input
                          type="email"
                          value={friend.email}
                          onChange={(e) =>
                            handleFriendChange(friend.id, 'email', e.target.value)
                          }
                          className={fieldInputClass}
                          placeholder="e.g., priya@example.com"
                        />
                      </div>

                      <div>
                        <label className={fieldLabelClass}>Phone</label>
                        <input
                          type="tel"
                          value={friend.phone}
                          onChange={(e) =>
                            handleFriendChange(friend.id, 'phone', e.target.value)
                          }
                          className={fieldInputClass}
                          placeholder="e.g., +1 (415) 223-"
                        />
                      </div>

                      <div>
                        <label className={fieldLabelClass}>Note</label>
                        <input
                          type="text"
                          value={friend.note}
                          onChange={(e) =>
                            handleFriendChange(friend.id, 'note', e.target.value)
                          }
                          className={fieldInputClass}
                          placeholder="e.g., Works with me"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-white text-sm transition-all shadow-sm bg-gradient-to-r from-[#1F4264] to-[#127EAB] hover:from-[#16314A] hover:to-[#0E668B] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>
                        Send Referral ({friends.length}{' '}
                        {friends.length === 1 ? 'Friend' : 'Friends'})
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
