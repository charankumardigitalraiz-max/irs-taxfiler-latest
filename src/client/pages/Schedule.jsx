import React, { useEffect, useState } from 'react';
import {
  Phone,
  Clock,
  Mail,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { SectionSkeleton } from '../components/common/PageLoader';
import { meetingService } from '../services/meetingService';
import { userService } from '../services/userService';
import { getUser } from '../utils/auth';

const Schedule = () => {
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
  });
  const [previousRequests, setPreviousRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [toast, setToast] = useState(null);

  // Auto-fill user details and load previous meeting requests from backend
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await userService.getProfile();
        if (response.success && response.data) {
          const profileData = response.data;
          setCallbackData(prev => ({
            ...prev,
            name: profileData.fullName || profileData.firstName && profileData.lastName 
              ? `${profileData.firstName} ${profileData.lastName}`.trim() 
              : '',
            phone: profileData.mobileNumber || '',
          }));
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // Fallback to getUser() if API fails
        const user = getUser();
        if (user) {
          setCallbackData(prev => ({
            ...prev,
            name: user.fullName || '',
            phone: user.mobileNumber || '',
          }));
        }
      }
    };

    const loadMeetings = async () => {
      try {
        const res = await meetingService.getMyMeetings();
        const meetings = res.data || [];
        const user = getUser();
        const mapped = meetings.map((m) => {
          const d = new Date(m.scheduledAt);
          return {
            id: m._id,
            name: 'You',
            phone: user?.mobileNumber || '—',
            date: d.toISOString().split('T')[0],
            time: d.toTimeString().slice(0, 5),
            formattedDate: d.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            formattedTime: d.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
          };
        });
        setPreviousRequests(mapped);
      } catch (error) {
        console.error('Failed to load your previous meetings:', error);
      } finally {
        setLoadingRequests(false);
      }
    };

    loadUserProfile();
    loadMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();

    // Require phone, date and time before submitting
    if (!callbackData.phone.trim()) {
      setToast({ type: 'error', message: 'Please enter your phone number before submitting.' });
      return;
    }
    if (!callbackData.date) {
      setToast({ type: 'error', message: 'Please select a preferred date for the call.' });
      return;
    }
    if (!callbackData.time) {
      setToast({ type: 'error', message: 'Please select a preferred time for the call.' });
      return;
    }

    try {
      const scheduledAt = new Date(`${callbackData.date}T${callbackData.time}`);

      await meetingService.requestCallback({
        scheduledAt: scheduledAt.toISOString(),
        notes: `Client callback request. Phone: ${callbackData.phone}`,
      });

      const newRequest = {
        id: Date.now(),
        name: callbackData.name || 'You',
        phone: callbackData.phone,
        date: callbackData.date,
        time: callbackData.time,
        formattedDate: scheduledAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        formattedTime: scheduledAt.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };

      setPreviousRequests((prev) => [newRequest, ...prev]);

      setToast({
        type: 'success',
        message: 'Meeting request submitted! We will contact you soon to schedule.',
      });
      setShowCallbackForm(false);
      setCallbackData({
        name: '',
        phone: '',
        date: '',
        time: '',
      });
      
      // Reload user profile to get updated workflow status
      try {
        const profileRes = await userService.getProfile();
        if (profileRes.success && profileRes.data) {
          // Trigger a page reload or navigation to refresh dashboard
          // The dashboard will reload when user navigates back
          window.dispatchEvent(new Event('workflowUpdated'));
        }
      } catch (error) {
        console.error('Failed to reload profile:', error);
      }
    } catch (error) {
      console.error('Failed to submit meeting request:', error);
      setToast({
        type: 'error',
        message: 'Failed to submit your request. Please try again.',
      });
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Simple toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-50">
          <div
            className={`max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{toast.message}</p>
              <button
                type="button"
                className="text-xs font-semibold opacity-70 hover:opacity-100"
                onClick={() => setToast(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E9F7FA] border border-[#127EAB]/20 rounded-lg shrink-0">
              <Phone className="w-5 h-5 text-[#127EAB]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight">
                Free to Call
              </h2>
              <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5">
                Need help with your tax filing? Reach us quickly or request a call back at a time that works for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Contact & connect details */}
        <div className="space-y-4">
          <Card>
            <Card.Header>
              <Card.Title>Contact Details</Card.Title>
              <Card.Description>
                Connect with our tax experts directly
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div>
                <p className="text-xs font-medium text-[#6F7F8E] uppercase tracking-wider mb-1.5">
                  Phone
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <PhoneCall className="w-4 h-4 text-[#059669] shrink-0" />
                    <span className="text-xs font-medium text-[#6F7F8E]">US:</span>
                    <a
                      href="tel:+14152231315"
                      className="text-[15px] font-semibold text-[#059669] hover:text-[#047857] transition-colors"
                    >
                      +1 (415) 223-1315
                    </a>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <PhoneCall className="w-4 h-4 text-[#059669] shrink-0" />
                    <span className="text-xs font-medium text-[#6F7F8E]">India:</span>
                    <span className="text-[15px] font-semibold text-[#059669]">
                      <a
                        href="tel:+919052333667"
                        className="hover:text-[#047857] transition-colors"
                      >
                        +91 9052 333 667
                      </a>
                      <span className="text-[#6F7F8E] font-normal">/</span>
                      <a
                        href="tel:+919052333668"
                        className="hover:text-[#047857] transition-colors"
                      >
                        668
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#6F7F8E] uppercase tracking-wider mb-1.5">
                  Email
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#127EAB] shrink-0" />
                  <a
                    href="mailto:info@irstaxfiler.com"
                    className="text-[15px] font-semibold text-[#127EAB] hover:text-[#0E668B] transition-colors break-all"
                  >
                    info@irstaxfiler.com
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#6F7F8E] uppercase tracking-wider mb-1.5">
                  Best time to reach us
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1F4264] shrink-0" />
                  <span className="text-[15px] font-semibold text-[#1F4264]">
                    CST 9:30 AM To 7:30 PM
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Quick connect
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/14152231315"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100 hover:bg-primary-100 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Support
                  </a>
                  <a
                    href="mailto:info@irstaxfiler.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Us
                  </a>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Right: Schedule form + previous list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Schedule Meeting */}
          <Card>
            <Card.Header>
              <Card.Title>Schedule Meeting</Card.Title>
              <Card.Description>
                Share your contact and we will call you to discuss your taxes.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              {!showCallbackForm ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Click below and we&apos;ll help you pick a convenient time for a quick call.
                  </p>
                  <Button
                    onClick={() => setShowCallbackForm(true)}
                    className="w-full"
                  >
                    Schedule Meeting
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  {/* Name and phone are auto-filled, read-only */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={callbackData.name}
                      readOnly
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
                      placeholder="Auto-filled from your profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={callbackData.phone}
                      readOnly
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
                      placeholder="Auto-filled from your profile"
                    />
                  </div>
                  {/* Combined Date and Time Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={callbackData.date && callbackData.time ? `${callbackData.date}T${callbackData.time}` : ''}
                      onChange={(e) => {
                        const dt = e.target.value;
                        if (dt) {
                          const [date, time] = dt.split('T');
                          setCallbackData({ ...callbackData, date, time: time || '' });
                        } else {
                          setCallbackData({ ...callbackData, date: '', time: '' });
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#127EAB] focus:border-transparent text-sm bg-white"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowCallbackForm(false);
                        setCallbackData({ name: '', phone: '' });
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Request
                    </Button>
                  </div>
                </form>
              )}
            </Card.Content>
          </Card>

          {/* Previous requests list */}
          <Card>
            <Card.Header>
              <Card.Title>Previous Requests</Card.Title>
              <Card.Description>
                Recent callback requests submitted from your account
              </Card.Description>
            </Card.Header>
            <Card.Content>
              {loadingRequests ? (
                <SectionSkeleton variant="list" rows={2} />
              ) : previousRequests.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No previous requests yet. Submit a meeting request to see it here.
                </p>
              ) : (
                <div className="space-y-3">
                  {previousRequests.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {req.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {req.phone}
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p className="font-medium">{req.formattedDate || req.date}</p>
                        <p>{req.formattedTime || req.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
