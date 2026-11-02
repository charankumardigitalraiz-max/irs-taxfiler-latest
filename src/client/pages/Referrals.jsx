import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Gift,
  Share2,
  CheckCircle2,
  Clock,
  Mail,
  Link2,
  Copy,
  Star,
  Shield,
  Plus,
  Trash2,
  Tag,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { referralService } from '../services/referralService';
import { useToast } from '../../admin/hooks/useToast';
import { getUser } from '../utils/auth';
import { getFrontendBaseUrl } from '../../baseurl';

const Referrals = () => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [yourName, setYourName] = useState('');
  const [yourMobile, setYourMobile] = useState('');
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: '',
      email: '',
      phone: '',
      note: '',
    }
  ]);

  const { showSuccess, showError } = useToast();

  // Load referral code and auto-fill user details once on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load referral code
        const referralRes = await referralService.getMyReferral();
        if (referralRes.success && referralRes.data) {
          setReferralCode(referralRes.data.referralCode);
        } else {
          // Don't show error if user hasn't completed registration yet
          if (referralRes.message && !referralRes.message.includes('complete registration')) {
            showError(referralRes.message || 'Failed to load referral info.');
          }
        }
        
        // Load user profile to get name and mobile number
        const { userService } = await import('../services/userService');
        const profileRes = await userService.getProfile();
        if (profileRes.success && profileRes.data) {
          const profileData = profileRes.data;
          
          // Set name - prefer fullName, or construct from firstName + lastName
          const name = profileData.fullName || 
            (profileData.firstName && profileData.lastName ? `${profileData.firstName} ${profileData.lastName}` : '') ||
            profileData.email?.split('@')[0] || '';
          if (name) setYourName(name);
          
          // Set mobile number
          if (profileData.mobileNumber) {
            setYourMobile(profileData.mobileNumber);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        
        // Fallback: try to get from localStorage
        const user = getUser();
        if (user) {
          const name = user.fullName || 
            (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '') ||
            user.email?.split('@')[0] || '';
          if (name) setYourName(name);
          if (user.mobileNumber) setYourMobile(user.mobileNumber);
        }
      }
    };
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic referral link - updates when referralCode changes
  // Uses dynamic frontend URL from baseurl.js
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
    const newId = Math.max(...friends.map(f => f.id), 0) + 1;
    setFriends((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        email: '',
        phone: '',
        note: '',
      },
    ]);
  };

  const removeFriend = (id) => {
    if (friends.length > 1) {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    referralService
      .sendInvites({
        yourName,
        yourMobile,
        friends: friendsWithData,
      })
      .then((res) => {
        if (res.success) {
          showSuccess(res.message || 'Referral invitations sent successfully!');
          setYourName('');
          setYourMobile('');
          setFriends([{ id: 1, name: '', email: '', phone: '', note: '' }]);
        } else {
          showError(res.message || 'Failed to send referrals. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending referrals:', error);
        showError('Error sending referrals. Please try again.');
      });
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
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-primary-600 to-blue-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-primary-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 hover:bg-white/30 transition">
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-white font-semibold text-sm">Refer Friends. Earn Rewards.</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Refer & Earn with irstax filer
            </h1>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
              Share your personalized referral code with friends and family. When they file with us, both of you receive instant savings on your next service.
            </p>

            <button className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg">
              <Star className="h-5 w-5" />
              <span>Earn up to US$ 50 + benefits</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Your Referral Code */}
            <Card className="bg-white/10 backdrop-blur-md border-white/15 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Referral Code</h3>
                  <p className="text-sm text-white/70">Share this code to earn rewards</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-2">Referral Code</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-xl font-bold tracking-widest text-center text-white border border-white/30">
                      {referralCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
                    >
                      <Copy className="h-5 w-5" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-2">Referral Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={getReferralLink()}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-xs text-white/90 border border-white/30"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition"
                    >
                      <Link2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-yellow-300" />
                      <span>US$ 15 credit for you</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-300" />
                      <span>US$ 5 discount for friend</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={handleShareEmail}
                    className="flex-1 px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Share via Email</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Right Panel - Refer a Friend Form */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-600">Refer a Friend</h3>
                    <p className="text-sm text-gray-500">Send referral invitation to your friends</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Your Details - Auto-filled from login, read-only */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={yourName}
                      readOnly
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
                      placeholder="Auto-filled from your profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your mobile Number
                    </label>
                    <input
                      type="tel"
                      value={yourMobile}
                      readOnly
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
                      placeholder="Auto-filled from your profile"
                    />
                  </div>
                </div>

                {/* Friends Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">Friends Details</h4>
                    <button
                      type="button"
                      onClick={addFriend}
                      className="px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all border-2 border-primary-600 text-primary-600 bg-primary-50 hover:bg-primary-100"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Friend</span>
                    </button>
                  </div>

                  {friends.map((friend, index) => (
                    <div
                      key={friend.id}
                      className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 relative flex items-end gap-3"
                    >
                      {friends.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFriend(friend.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-red-100 transition-colors z-10 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Friend Name
                        </label>
                        <input
                          type="text"
                          value={friend.name}
                          onChange={(e) => handleFriendChange(friend.id, 'name', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-sm bg-white"
                          placeholder="e.g., Priya Sir"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Friend Email
                        </label>
                        <input
                          type="email"
                          value={friend.email}
                          onChange={(e) => handleFriendChange(friend.id, 'email', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-sm bg-white"
                          placeholder="e.g., priya@example.com"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={friend.phone}
                          onChange={(e) => handleFriendChange(friend.id, 'phone', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-sm bg-white"
                          placeholder="e.g., +1 (415) 223-"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Note
                        </label>
                        <input
                          type="text"
                          value={friend.note}
                          onChange={(e) => handleFriendChange(friend.id, 'note', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-sm bg-white"
                          placeholder="e.g., Works with me"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all shadow-lg bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700"
                >
                  Send Referral ({friends.length} {friends.length === 1 ? 'Friend' : 'Friends'})
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
