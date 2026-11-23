import { useState, useEffect } from 'react';
import { Search, UserPlus, Gift, Mail, Phone, CheckCircle2, Clock, DollarSign, TrendingUp, Users, Eye, ChevronDown } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { referralService } from '../../services/referralService';
import { useToast } from '../../hooks/useToast';
import { format } from 'date-fns';

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { showError } = useToast();

  // Load referrals once on mount
  useEffect(() => {
    const loadReferrals = async () => {
      try {
        const res = await referralService.getReferrals();
        if (res.success) {
          setReferrals(res.data || []);
        } else {
          showError(res.message || 'Failed to load referrals.');
        }
      } catch (error) {
        console.error('Error loading referrals:', error);
        showError('Error loading referrals. Please try again.');
      }
    };
    loadReferrals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      !searchTerm ||
      referral.referrer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referrer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralCode.includes(searchTerm) ||
      referral.referrerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      referral.referredFriends.some((friend) => friend.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalReferrers: referrals.length,
    totalReferrals: referrals.reduce((sum, r) => sum + r.totalReferrals, 0),
    successfulReferrals: referrals.reduce((sum, r) => sum + r.successfulReferrals, 0),
    totalRewardsPaid: referrals.reduce((sum, r) => sum + r.totalRewardsEarned, 0),
    pendingReferrals: referrals.reduce(
      (sum, r) => sum + r.referredFriends.filter((f) => f.status === 'pending').length,
      0
    ),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return 'green';
      case 'converted':
        return 'blue';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const handleViewDetails = (referral) => {
    setSelectedReferral(referral);
    setShowDetailModal(true);
  };

  return (
    <div>
      <Header
        title="Referrals"
        subtitle="Manage and track user referral program"
      />

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard name="Total Referrers" value={stats.totalReferrers} />
          <StatCard name="Total Referrals" value={stats.totalReferrals} valueColor="text-[#127EAB]" />
          <StatCard name="Successful" value={stats.successfulReferrals} valueColor="text-[#059669]" />
          <StatCard name="Pending" value={stats.pendingReferrals} valueColor="text-[#D97706]" />
          <StatCard name="Total Rewards Paid" value={`$${stats.totalRewardsPaid}`} />
        </div>

        {/* Referrals List */}
        <Card padding="none">
          <div className="p-4 sm:p-5 border-b border-[#E6F0F5] bg-white">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-64 md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2]" />
                <input
                  type="text"
                  placeholder="Search by referrer name, email, or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2] transition-all shadow-xs"
                />
              </div>

              {/* Status Filter */}
              <div className="relative w-full sm:w-48 shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-9 text-sm border border-[#CCDCE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] transition-all cursor-pointer appearance-none shadow-xs"
                >
                  <option value="">All Status</option>
                  <option value="registered">Registered</option>
                  <option value="converted">Converted</option>
                  <option value="pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA0B2] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E6F0F5]">
              <thead className="bg-[#F8FBFC] border-b border-[#DCEAF0]">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Referrer</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Referral Code</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Total Referrals</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Successful</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Rewards Earned</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Created</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E6F0F5]">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
                      No referrals found
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-[#F4F9FB]/60 transition-colors">
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                        <div>
                          <p className="font-semibold text-[#1F4264]">{referral.referrer.fullName}</p>
                          <p className="text-xs text-[#6F7F8E]">{referral.referrer.email}</p>
                          <p className="text-xs text-[#8BA0B2] font-mono">{referral.referrerId}</p>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                        <span className="font-mono font-semibold text-[#127EAB]">
                          {referral.referralCode}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-[#1F4264]">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#8BA0B2]" />
                          <span className="font-medium text-[#1F4264]">{referral.totalReferrals}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-emerald-600">
                            {referral.successfulReferrals}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                        <div className="flex items-center gap-1 font-semibold text-[#127EAB]">
                          <DollarSign className="w-4 h-4" />
                          <span>{referral.totalRewardsEarned}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-[#6F7F8E]">
                        <span>
                          {format(new Date(referral.createdAt), 'MMM d, yyyy')}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetails(referral)}
                          title="View Details"
                          className="h-8 w-8 !p-0 bg-[#E9F7FA] text-[#127EAB] border border-[#127EAB]/30 hover:bg-[#127EAB] hover:text-white hover:border-[#127EAB] rounded-lg shadow-2xs transition-all cursor-pointer inline-flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Referral Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedReferral(null);
        }}
        title={`Referral Details - ${selectedReferral?.referrer.fullName}`}
        description={`Referral Code: ${selectedReferral?.referralCode}`}
        size="lg"
      >
        {selectedReferral && (
          <div className="space-y-4">
            {/* Referrer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Referrer Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{selectedReferral.referrer.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{selectedReferral.referrer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{selectedReferral.referrer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="font-medium text-gray-900 font-mono text-sm">
                    {selectedReferral.referrerId}
                  </p>
                </div>
              </div>
            </div>

            {/* Referred Friends */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Referred Friends ({selectedReferral.referredFriends.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedReferral.referredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-medium text-gray-900">{friend.name || 'N/A'}</h5>
                          <Badge color={getStatusColor(friend.status)} size="sm">
                            {friend.status}
                          </Badge>
                          {friend.rewardEarned && (
                            <Badge color="green" size="sm">
                              Reward: ${friend.rewardAmount}
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-3 h-3" />
                              <span>{friend.email || 'N/A'}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-3 h-3" />
                              <span>{friend.phone || 'N/A'}</span>
                            </div>
                          </div>
                          {friend.note && (
                            <div className="col-span-2">
                              <p className="text-xs text-gray-500">Note:</p>
                              <p className="text-sm text-gray-700">{friend.note}</p>
                            </div>
                          )}
                          {friend.registeredAt && (
                            <div className="col-span-2">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span className="text-xs">
                                  Registered: {format(new Date(friend.registeredAt), 'MMM d, yyyy h:mm a')}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-primary-600">Total Referrals</p>
                  <p className="text-lg font-semibold text-primary-900">
                    {selectedReferral.totalReferrals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary-600">Successful</p>
                  <p className="text-lg font-semibold text-green-600">
                    {selectedReferral.successfulReferrals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary-600">Total Rewards</p>
                  <p className="text-lg font-semibold text-teal">
                    ${selectedReferral.totalRewardsEarned}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Referrals;

