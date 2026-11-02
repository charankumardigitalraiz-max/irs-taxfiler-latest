import { useState } from 'react';
import { Plus, Edit2, Trash2, Shield, Mail, Phone } from 'lucide-react';
import Header from '../../components/layout/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { ROLES, ROLE_LABELS } from '../../utils/constants';

// Mock team data
const mockTeam = [
  {
    id: '1',
    fullName: 'John Admin',
    email: 'john.admin@taxfiling.com',
    phone: '+1 234 567 8900',
    role: 'SUPER_ADMIN',
    isActive: true,
    casesAssigned: 45,
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    fullName: 'Sarah Consultant',
    email: 'sarah.c@taxfiling.com',
    phone: '+1 234 567 8901',
    role: 'TAX_CONSULTANT',
    isActive: true,
    casesAssigned: 32,
    createdAt: '2023-08-20',
  },
  {
    id: '3',
    fullName: 'Mike Support',
    email: 'mike.s@taxfiling.com',
    phone: '+1 234 567 8902',
    role: 'SUPPORT_STAFF',
    isActive: true,
    casesAssigned: 28,
    createdAt: '2023-09-10',
  },
  {
    id: '4',
    fullName: 'Lisa Consultant',
    email: 'lisa.c@taxfiling.com',
    phone: '+1 234 567 8903',
    role: 'TAX_CONSULTANT',
    isActive: false,
    casesAssigned: 0,
    createdAt: '2023-07-05',
  },
];

const roleColors = {
  SUPER_ADMIN: 'purple',
  TAX_CONSULTANT: 'blue',
  SUPPORT_STAFF: 'green',
};

const TeamManagement = () => {
  const [team, setTeam] = useState(mockTeam);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'SUPPORT_STAFF',
    password: '',
  });

  const handleAdd = () => {
    const newMember = {
      id: String(Date.now()),
      ...formData,
      isActive: true,
      casesAssigned: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTeam((prev) => [...prev, newMember]);
    setShowAddModal(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'SUPPORT_STAFF',
      password: '',
    });
  };

  const handleEdit = () => {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === selectedMember.id
          ? { ...m, ...formData }
          : m
      )
    );
    setShowEditModal(false);
    setSelectedMember(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeam((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isActive: !m.isActive } : m
      )
    );
  };

  const openEditModal = (member) => {
    setSelectedMember(member);
    setFormData({
      fullName: member.fullName,
      email: member.email,
      phone: member.phone,
      role: member.role,
      password: '',
    });
    setShowEditModal(true);
  };

  const stats = {
    total: team.length,
    active: team.filter((m) => m.isActive).length,
    admins: team.filter((m) => m.role === 'SUPER_ADMIN').length,
    consultants: team.filter((m) => m.role === 'TAX_CONSULTANT').length,
    support: team.filter((m) => m.role === 'SUPPORT_STAFF').length,
  };

  return (
    <div>
      <Header
        title="Team Management"
        subtitle="Manage admin users and their roles"
        actions={
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add Team Member
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Super Admins</p>
            <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Tax Consultants</p>
            <p className="text-2xl font-bold text-blue-600">{stats.consultants}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Support Staff</p>
            <p className="text-2xl font-bold text-green-600">{stats.support}</p>
          </Card>
        </div>

        {/* Team List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-700">
                      {member.fullName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.fullName}</h3>
                    <Badge color={roleColors[member.role]} size="sm">
                      {ROLE_LABELS[member.role]}
                    </Badge>
                  </div>
                </div>
                <Badge color={member.isActive ? 'green' : 'gray'} size="sm">
                  {member.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {member.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  {member.casesAssigned} cases assigned
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditModal(member)}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant={member.isActive ? 'warning' : 'success'}
                  onClick={() => handleToggleActive(member.id)}
                >
                  {member.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setSelectedMember(null);
        }}
        title={showAddModal ? 'Add Team Member' : 'Edit Team Member'}
      >
        <div className="space-y-4">
          <div>
            <label className="label">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="input"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="label">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input"
            >
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {showAddModal && (
            <div>
              <label className="label">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input"
                placeholder="Enter password"
              />
            </div>
          )}
        </div>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={showAddModal ? handleAdd : handleEdit}>
            {showAddModal ? 'Add Member' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamManagement;

