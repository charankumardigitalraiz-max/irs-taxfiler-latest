import { useState, useEffect } from 'react';
import { Search, UserPlus, Gift, Mail, Phone, CheckCircle2, Clock, DollarSign, TrendingUp, Users, Eye } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
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

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Referrers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalReferrers}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Referrals</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalReferrals}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Successful</p>
            <p className="text-2xl font-bold text-green-600">{stats.successfulReferrals}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingReferrals}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Rewards Paid</p>
            <p className="text-2xl font-bold text-purple-600">${stats.totalRewardsPaid}</p>
          </Card>
        </div>

        {/* Referrals List */}
        <Card padding="none">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by referrer name, email, or referral code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">All Status</option>
                <option value="registered">Registered</option>
                <option value="converted">Converted</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Referrer</th>
                  <th className="table-header">Referral Code</th>
                  <th className="table-header">Total Referrals</th>
                  <th className="table-header">Successful</th>
                  <th className="table-header">Rewards Earned</th>
                  <th className="table-header">Created</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="table-cell text-center py-8 text-gray-500">
                      No referrals found
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="table-cell">
                        <div>
                          <p className="font-medium text-gray-900">{referral.referrer.fullName}</p>
                          <p className="text-xs text-gray-500">{referral.referrer.email}</p>
                          <p className="text-xs text-gray-400 font-mono">{referral.referrerId}</p>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="font-mono font-semibold text-primary-600">
                          {referral.referralCode}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{referral.totalReferrals}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-600">
                            {referral.successfulReferrals}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-600">
                            ${referral.totalRewardsEarned}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="text-sm text-gray-500">
                          {format(new Date(referral.createdAt), 'MMM d, yyyy')}
                        </span>
                      </td>
                      <td className="table-cell">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetails(referral)}
                          leftIcon={<Eye className="w-4 h-4" />}
                        >
                          View Details
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
                  <p className="text-lg font-bold text-primary-900">
                    {selectedReferral.totalReferrals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary-600">Successful</p>
                  <p className="text-lg font-bold text-green-600">
                    {selectedReferral.successfulReferrals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary-600">Total Rewards</p>
                  <p className="text-lg font-bold text-purple-600">
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

