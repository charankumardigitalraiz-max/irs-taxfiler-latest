// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   UserPlusIcon,
//   GiftIcon,
//   ShareIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   EnvelopeIcon,
//   LinkIcon,
//   ClipboardDocumentIcon,
// } from '@heroicons/react/24/outline';

// const Referrals = () => {
//   const [referralCode, setReferralCode] = useState('TAXFRIENDLY2024');
//   const [copied, setCopied] = useState(false);

//   const referralStats = {
//     totalReferrals: 5,
//     activeReferrals: 3,
//     completedReferrals: 2,
//     totalRewards: '$150',
//     pendingRewards: '$50',
//   };

//   const referrals = [
//     {
//       id: 1,
//       name: 'John Smith',
//       email: 'john.smith@example.com',
//       status: 'completed',
//       joinedDate: 'Jan 15, 2024',
//       completedDate: 'Mar 10, 2024',
//       reward: '$50',
//       rewardStatus: 'paid',
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       email: 'sarah.j@example.com',
//       status: 'active',
//       joinedDate: 'Feb 20, 2024',
//       completedDate: null,
//       reward: '$50',
//       rewardStatus: 'pending',
//     },
//     {
//       id: 3,
//       name: 'Michael Brown',
//       email: 'michael.brown@example.com',
//       status: 'active',
//       joinedDate: 'Mar 5, 2024',
//       completedDate: null,
//       reward: '$50',
//       rewardStatus: 'pending',
//     },
//     {
//       id: 4,
//       name: 'Emily Davis',
//       email: 'emily.davis@example.com',
//       status: 'completed',
//       joinedDate: 'Jan 28, 2024',
//       completedDate: 'Mar 15, 2024',
//       reward: '$50',
//       rewardStatus: 'paid',
//     },
//     {
//       id: 5,
//       name: 'David Wilson',
//       email: 'david.w@example.com',
//       status: 'pending',
//       joinedDate: 'Mar 18, 2024',
//       completedDate: null,
//       reward: '$50',
//       rewardStatus: 'pending',
//     },
//   ];

//   const referralProgram = {
//     rewardPerReferral: '$50',
//     minimumFiling: 'Friend must complete tax filing',
//     rewardType: 'Cash reward or account credit',
//     terms: [
//       'Referral must sign up using your unique code',
//       'Referred friend must complete their tax filing',
//       'Reward is credited after friend\'s filing is completed',
//       'No limit on number of referrals',
//       'Rewards are processed within 7-10 business days',
//     ],
//   };

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShareEmail = () => {
//     const subject = 'Join TaxFiling - Get Professional Tax Filing Services';
//     const body = `Hi! I've been using TaxFiling for my tax filing and I think you'd love it too. Use my referral code ${referralCode} to get started!`;
//     window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-teal-100 text-teal-700';
//       case 'active':
//         return 'bg-blue-100 text-blue-700';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-700';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getRewardStatusColor = (status) => {
//     switch (status) {
//       case 'paid':
//         return 'bg-green-100 text-green-700';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-700';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Referral Program</h1>
//         <p className="text-gray-600">
//           Refer friends and earn rewards when they complete their tax filing.
//         </p>
//       </div>

//       {/* Referral Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <UserPlusIcon className="h-5 w-5 text-primary-blue" />
//             <span className="text-xs text-gray-500">Total</span>
//           </div>
//           <p className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</p>
//           <p className="text-xs text-gray-500 mt-1">Referrals</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <CheckCircleIcon className="h-5 w-5 text-teal-500" />
//             <span className="text-xs text-gray-500">Completed</span>
//           </div>
//           <p className="text-2xl font-bold text-gray-900">{referralStats.completedReferrals}</p>
//           <p className="text-xs text-gray-500 mt-1">Filed Taxes</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <GiftIcon className="h-5 w-5 text-purple-500" />
//             <span className="text-xs text-gray-500">Earned</span>
//           </div>
//           <p className="text-2xl font-bold text-gray-900">{referralStats.totalRewards}</p>
//           <p className="text-xs text-gray-500 mt-1">Total Rewards</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <ClockIcon className="h-5 w-5 text-yellow-500" />
//             <span className="text-xs text-gray-500">Pending</span>
//           </div>
//           <p className="text-2xl font-bold text-gray-900">{referralStats.pendingRewards}</p>
//           <p className="text-xs text-gray-500 mt-1">Awaiting Payment</p>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Referral Code Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//         >
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="p-2 bg-primary-blue/10 rounded-lg">
//               <ShareIcon className="h-6 w-6 text-primary-blue" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Your Referral Code</h2>
//               <p className="text-sm text-gray-500">Share this code with friends to earn rewards</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Referral Code
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={referralCode}
//                   readOnly
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-lg font-semibold text-gray-900"
//                 />
//                 <button
//                   onClick={handleCopyCode}
//                   className="px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
//                 >
//                   <ClipboardDocumentIcon className="h-5 w-5" />
//                   <span>{copied ? 'Copied!' : 'Copy'}</span>
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Referral Link
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={`https://taxfiling.com/register?ref=${referralCode}`}
//                   readOnly
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
//                 />
//                 <button
//                   onClick={handleCopyCode}
//                   className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   <LinkIcon className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex space-x-3 pt-4 border-t border-gray-200">
//               <button
//                 onClick={handleShareEmail}
//                 className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors flex items-center justify-center space-x-2"
//               >
//                 <EnvelopeIcon className="h-5 w-5" />
//                 <span>Share via Email</span>
//               </button>
//               <button className="flex-1 px-4 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                 <ShareIcon className="h-5 w-5" />
//                 <span>Share Link</span>
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Program Details */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="bg-gradient-to-br from-primary-blue to-indigo-600 rounded-lg shadow-sm p-6 text-white"
//         >
//           <div className="flex items-center space-x-3 mb-4">
//             <GiftIcon className="h-6 w-6" />
//             <h3 className="text-lg font-semibold">Program Benefits</h3>
//           </div>
//           <div className="space-y-3 mb-6">
//             <div>
//               <p className="text-sm text-blue-100 mb-1">Reward per Referral</p>
//               <p className="text-2xl font-bold">{referralProgram.rewardPerReferral}</p>
//             </div>
//             <div>
//               <p className="text-sm text-blue-100 mb-1">Minimum Requirement</p>
//               <p className="text-sm">{referralProgram.minimumFiling}</p>
//             </div>
//           </div>
//           <div className="pt-4 border-t border-blue-400">
//             <p className="text-sm font-medium mb-3">How it works:</p>
//             <ul className="space-y-2 text-sm text-blue-100">
//               {referralProgram.terms.map((term, index) => (
//                 <li key={index} className="flex items-start space-x-2">
//                   <span className="mt-0.5">•</span>
//                   <span>{term}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </motion.div>
//       </div>

//       {/* Referrals List */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-primary-blue/10 rounded-lg">
//               <UserPlusIcon className="h-6 w-6 text-primary-blue" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Referral History</h2>
//               <p className="text-sm text-gray-500">Track your referrals and rewards</p>
//             </div>
//           </div>
//         </div>

//         {referrals.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Referred Friend
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Joined Date
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Completed Date
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Reward
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Reward Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {referrals.map((referral) => (
//                   <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{referral.name}</p>
//                         <p className="text-xs text-gray-500">{referral.email}</p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
//                         {referral.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-600">
//                       {referral.joinedDate}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-600">
//                       {referral.completedDate || '-'}
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="text-sm font-semibold text-gray-900">{referral.reward}</p>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRewardStatusColor(referral.rewardStatus)}`}>
//                         {referral.rewardStatus}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <UserPlusIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p className="text-gray-600 mb-2">No referrals yet</p>
//             <p className="text-sm text-gray-400">
//               Start referring friends using your referral code above
//             </p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Referrals;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserPlusIcon,
  GiftIcon,
  ShareIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  LinkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

// Redux
import { useDispatch, useSelector } from "react-redux";
// import { fetchReferrals } from "../../Redux/Slices/referralSlice";

const Referrals = () => {
  const dispatch = useDispatch();

  // Redux Data
  const { referrals, loading } = useSelector((state) => state.referrals);
  const user = useSelector((state) => state.auth.user);

  const referralId = user ? user.referralId : null;

  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  const currentURL = window.location.origin;

  // useEffect(() => {
  //   console.log("Fetching referrals...", currentURL);
  // }, [currentURL]);

  // Fetch backend data
  useEffect(() => {
    dispatch(fetchReferrals());
  }, [dispatch]);

  // Referral Stats (auto-calculated from backend)
  const referralStats = {
    totalReferrals: referrals.length,
    completedReferrals: referrals.filter(
      (r) => r.referralStatus === "completed"
    ).length,
    activeReferrals: referrals.filter((r) => r.referralStatus === "active")
      .length,
    pendingRewards:
      referrals.filter((r) => r.rewardStatus === "pending").length * 50,
    totalRewards: referrals
      .reduce((total, ref) => total + (ref.rewardAmount || 0), 0)
     
  };

  const referralProgram = {
    rewardPerReferral: "$50",
    minimumFiling: "Friend must complete tax filing",
    rewardType: "Cash reward or account credit",
    terms: [
      "Referral must sign up using your unique code",
      "Referred friend must complete their tax filing",
      "Reward is credited after completion",
      "No limit on number of referrals",
      "Rewards processed within 7–10 business days",
    ],
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareEmail = () => {
    const subject = "Join TaxFiling - Earn Rewards!";
    const body = `Use my referral code ${referralCode} to sign up.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-teal-100 text-teal-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRewardStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* -------------------- Heading -------------------- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Referral Program
        </h1>
        <p className="text-gray-600">
          Refer friends and earn rewards when they complete tax filing.
        </p>
      </div>

      {/* -------------------- Referral Stats -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <UserPlusIcon className="h-5 w-5 text-primary-blue" />
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {referralStats.totalReferrals}
          </p>
          <p className="text-xs text-gray-500 mt-1">Referrals</p>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircleIcon className="h-5 w-5 text-teal-500" />
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {referralStats.completedReferrals}
          </p>
          <p className="text-xs text-gray-500 mt-1">Filed Taxes</p>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <GiftIcon className="h-5 w-5 text-purple-500" />
            <span className="text-xs text-gray-500">Earned</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${referralStats.totalRewards}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Rewards</p>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <ClockIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-xs text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${referralStats.pendingRewards}
          </p>
          <p className="text-xs text-gray-500 mt-1">Awaiting Payment</p>
        </motion.div>
      </div>

      {/* -------------------- Referral Code Section -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <ShareIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your Referral Code
              </h2>
              <p className="text-sm text-gray-500">
                Share this code to earn rewards
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code
              </label>
              <div className="flex items-center space-x-2">
                <input
                  value={referralId}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-lg font-semibold text-gray-900"
                />
                <button
                  onClick={handleCopyCode}
                  className="px-6 py-3 bg-primary-blue text-white rounded-lg"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  value={`${currentURL}/register?ref=${referralId}`}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
                />
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 bg-gray-100 rounded-lg"
                >
                  <LinkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Program Details */}
        <motion.div className="bg-gradient-to-br from-primary-blue to-indigo-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <GiftIcon className="h-6 w-6" />
            <h3 className="text-lg font-semibold">Program Benefits</h3>
          </div>

          <ul className="space-y-2 text-blue-100 text-sm mt-4 border-t border-blue-400 pt-4">
            {referralProgram.terms.map((term, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span>•</span> <span>{term}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* -------------------- Referral Table -------------------- */}
      <motion.div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-blue/10 rounded-lg">
              <UserPlusIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Referral History</h2>
              <p className="text-sm text-gray-500">
                Track your referrals & rewards
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-600">
            Loading referrals...
          </p>
        ) : referrals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Referred Friend
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3">Completed Date</th>
                  <th className="px-4 py-3">Reward</th>
                  <th className="px-4 py-3">Reward Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {referrals.map((ref) => (
                  <tr key={ref._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <p className="font-medium">{ref.referredName}</p>
                      <p className="text-xs text-gray-500">
                        {ref.referredEmail}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          ref.referralStatus
                        )}`}
                      >
                        {ref.referralStatus}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {ref.joinedDate
                        ? new Date(ref.joinedDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-4 py-4">
                      {ref.completedDate
                        ? new Date(ref.completedDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {ref.rewardAmount ? `$${ref.rewardAmount}` : "-"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRewardStatusColor(
                          ref.rewardStatus
                        )}`}
                      >
                        {ref.rewardStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <UserPlusIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No referrals yet</p>
            <p className="text-sm text-gray-400">
              Start referring friends using your referral code above
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Referrals;
