// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //   CalendarIcon,
// //   ClockIcon,
// //   PhoneIcon,
// //   EnvelopeIcon,
// //   CheckCircleIcon,
// //   XCircleIcon,
// // } from '@heroicons/react/24/outline';

// // const Scheduling = () => {
// //   const [showRequestForm, setShowRequestForm] = useState(false);
// //   const [requestData, setRequestData] = useState({
// //     preferredDate: '',
// //     preferredTime: '',
// //     reason: '',
// //     contactMethod: 'email',
// //   });

// //   // Mock data - in real app, this would come from admin
// //   const availableSchedules = [
// //     {
// //       id: 1,
// //       date: '2024-02-15',
// //       time: '10:00 AM - 11:00 AM',
// //       status: 'available',
// //       adminName: 'Admin Team',
// //     },
// //     {
// //       id: 2,
// //       date: '2024-02-16',
// //       time: '2:00 PM - 3:00 PM',
// //       status: 'available',
// //       adminName: 'Admin Team',
// //     },
// //     {
// //       id: 3,
// //       date: '2024-02-20',
// //       time: '11:00 AM - 12:00 PM',
// //       status: 'booked',
// //       adminName: 'Admin Team',
// //     },
// //   ];

// //   const userScheduledAppointments = [
// //     {
// //       id: 1,
// //       date: '2024-02-18',
// //       time: '3:00 PM - 4:00 PM',
// //       status: 'confirmed',
// //       adminName: 'Admin Team',
// //       reason: 'Tax consultation',
// //     },
// //   ];

// //   const handleRequestSubmit = (e) => {
// //     e.preventDefault();
// //     // In real app, this would send request to admin
// //     alert('Schedule request submitted! Admin will review and confirm.');
// //     setShowRequestForm(false);
// //     setRequestData({
// //       preferredDate: '',
// //       preferredTime: '',
// //       reason: '',
// //       contactMethod: 'email',
// //     });
// //   };

// //   const handleContactAdmin = (schedule) => {
// //     // In real app, this would open contact form or initiate call
// //     alert(`Contacting ${schedule.adminName} for ${schedule.date} at ${schedule.time}`);
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       weekday: 'long',
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //     });
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule Consultation</h1>
// //         <p className="text-gray-600">
// //           View available schedules, request a consultation, or contact admin on scheduled days.
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Available Schedules */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
// //         >
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-xl font-semibold text-gray-900">Available Schedules</h2>
// //             <button
// //               onClick={() => setShowRequestForm(!showRequestForm)}
// //               className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
// //             >
// //               <CalendarIcon className="h-4 w-4" />
// //               <span>Request Schedule</span>
// //             </button>
// //           </div>

// //           {availableSchedules.length > 0 ? (
// //             <div className="space-y-4">
// //               {availableSchedules.map((schedule) => (
// //                 <motion.div
// //                   key={schedule.id}
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   className={`p-4 rounded-lg border-2 ${
// //                     schedule.status === 'available'
// //                       ? 'border-teal-200 bg-teal-50'
// //                       : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                 >
// //                   <div className="flex items-start justify-between">
// //                     <div className="flex-1">
// //                       <div className="flex items-center space-x-2 mb-2">
// //                         <CalendarIcon className="h-5 w-5 text-gray-600" />
// //                         <h3 className="text-base font-semibold text-gray-900">
// //                           {formatDate(schedule.date)}
// //                         </h3>
// //                         {schedule.status === 'available' ? (
// //                           <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
// //                             Available
// //                           </span>
// //                         ) : (
// //                           <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
// //                             Booked
// //                           </span>
// //                         )}
// //                       </div>
// //                       <div className="flex items-center space-x-2 mb-3">
// //                         <ClockIcon className="h-4 w-4 text-gray-500" />
// //                         <span className="text-sm text-gray-600">{schedule.time}</span>
// //                       </div>
// //                       <p className="text-sm text-gray-600 mb-3">
// //                         Admin: <span className="font-medium">{schedule.adminName}</span>
// //                       </p>
// //                       {schedule.status === 'available' && (
// //                         <button
// //                           onClick={() => handleContactAdmin(schedule)}
// //                           className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
// //                         >
// //                           <PhoneIcon className="h-4 w-4" />
// //                           <span>Contact Admin</span>
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-12">
// //               <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
// //               <p className="text-gray-600 mb-2">No available schedules</p>
// //               <p className="text-sm text-gray-400">
// //                 Request a schedule and admin will add available time slots.
// //               </p>
// //             </div>
// //           )}
// //         </motion.div>

// //         {/* Request Schedule Form / My Appointments */}
// //         <div className="space-y-6">
// //           {/* Request Schedule Form */}
// //           {showRequestForm && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
// //             >
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-semibold text-gray-900">Request Schedule</h3>
// //                 <button
// //                   onClick={() => setShowRequestForm(false)}
// //                   className="text-gray-400 hover:text-gray-600"
// //                 >
// //                   <XCircleIcon className="h-5 w-5" />
// //                 </button>
// //               </div>
// //               <form onSubmit={handleRequestSubmit} className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Preferred Date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={requestData.preferredDate}
// //                     onChange={(e) =>
// //                       setRequestData({ ...requestData, preferredDate: e.target.value })
// //                     }
// //                     required
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Preferred Time
// //                   </label>
// //                   <input
// //                     type="time"
// //                     value={requestData.preferredTime}
// //                     onChange={(e) =>
// //                       setRequestData({ ...requestData, preferredTime: e.target.value })
// //                     }
// //                     required
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Reason for Consultation
// //                   </label>
// //                   <textarea
// //                     value={requestData.reason}
// //                     onChange={(e) =>
// //                       setRequestData({ ...requestData, reason: e.target.value })
// //                     }
// //                     required
// //                     rows={3}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
// //                     placeholder="Brief reason for the consultation..."
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Preferred Contact Method
// //                   </label>
// //                   <select
// //                     value={requestData.contactMethod}
// //                     onChange={(e) =>
// //                       setRequestData({ ...requestData, contactMethod: e.target.value })
// //                     }
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
// //                   >
// //                     <option value="email">Email</option>
// //                     <option value="phone">Phone Call</option>
// //                     <option value="video">Video Call</option>
// //                   </select>
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   className="w-full px-4 py-2 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
// //                 >
// //                   Submit Request
// //                 </button>
// //               </form>
// //             </motion.div>
// //           )}

// //           {/* My Scheduled Appointments */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
// //           >
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">My Appointments</h3>
// //             {userScheduledAppointments.length > 0 ? (
// //               <div className="space-y-4">
// //                 {userScheduledAppointments.map((appointment) => (
// //                   <div
// //                     key={appointment.id}
// //                     className="p-4 rounded-lg border-2 border-teal-200 bg-teal-50"
// //                   >
// //                     <div className="flex items-start justify-between mb-2">
// //                       <div className="flex items-center space-x-2">
// //                         <CheckCircleIcon className="h-5 w-5 text-teal-600" />
// //                         <span className="text-sm font-medium text-teal-700">Confirmed</span>
// //                       </div>
// //                     </div>
// //                     <h4 className="text-base font-semibold text-gray-900 mb-1">
// //                       {formatDate(appointment.date)}
// //                     </h4>
// //                     <div className="flex items-center space-x-2 mb-2">
// //                       <ClockIcon className="h-4 w-4 text-gray-500" />
// //                       <span className="text-sm text-gray-600">{appointment.time}</span>
// //                     </div>
// //                     <p className="text-sm text-gray-600 mb-3">
// //                       <span className="font-medium">Reason:</span> {appointment.reason}
// //                     </p>
// //                     <div className="flex items-center space-x-2">
// //                       <button
// //                         onClick={() => handleContactAdmin(appointment)}
// //                         className="flex-1 px-3 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
// //                       >
// //                         <EnvelopeIcon className="h-4 w-4" />
// //                         <span>Contact Admin</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-8">
// //                 <CalendarIcon className="mx-auto h-10 w-10 text-gray-300 mb-3" />
// //                 <p className="text-sm text-gray-500">No scheduled appointments</p>
// //               </div>
// //             )}
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Scheduling;

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getAvailableSchedules,
//   getMyAppointment,
//   // getMyRequests,
//   requestSchedule,
//   clearScheduleMessages,
//   bookSchedule,
// } from "../../Redux/Slices/schedulingSlice";

// import { motion } from "framer-motion";
// import {
//   CalendarIcon,
//   ClockIcon,
//   XCircleIcon,
//   CheckCircleIcon,
//   PhoneIcon,
// } from "@heroicons/react/24/outline";

// const Scheduling = () => {
//   const dispatch = useDispatch();

//   const {
//     available,
//     myAppointment,
//     myRequests,
//     loading,
//     error,
//     successMessage,
//   } = useSelector((state) => state.schedule);

//   const [showRequestForm, setShowRequestForm] = useState(false);

//   const [requestData, setRequestData] = useState({
//     preferredDate: "",
//     preferredTime: "",
//     timezone: "",
//     reason: "",
//     contactMethod: "email",
//   });

//   const [requestFormErrors, setRequestFormErrors] = useState({});

//   const requestformvalidation = () => {
//     const errors = {};
//     if (!requestData.preferredDate) {
//       errors.preferredDate = "Preferred date is required";
//     }
//     if (!requestData.preferredTime) {
//       errors.preferredTime = "Preferred time is required";
//     }
//     if (!requestData.timezone) {
//       errors.timezone = "Timezone is required";
//     }
//     if (!requestData.reason) {
//       errors.reason = "Reason is required";
//     }

//     setRequestFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   }

 
//   useEffect(() => {
//     dispatch(getAvailableSchedules());
//     dispatch(getMyAppointment());
//     // dispatch(getMyRequests());
//   }, []);


//   const handleRequestSubmit = (e) => {
//     e.preventDefault();
//     if (!requestformvalidation()) return;
//     dispatch(requestSchedule(requestData));

//   };

//   useEffect(() => {
//     if (successMessage) {
//       setShowRequestForm(false);

//       setRequestData({
//         preferredDate: "",
//         preferredTime: "",
//         timezone: "",
//         reason: "",
//         contactMethod: "email",
//       });

//       dispatch(clearScheduleMessages());
//       dispatch(getMyRequests());
//     }
//   }, [successMessage]);

  
//   const formatDate = (d) => {
//     if (!d) return "-";
//     return new Date(d).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };



  
//   const handleBook = (id) => {
//     dispatch(bookSchedule({ scheduleId: id, reason: "Consultation Request" }));
//   };

  
//   const Card = ({ children }) => (
//     <div className="border border-teal-300 bg-teal-50 rounded-xl p-5 space-y-3 shadow-sm">
//       {children}
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-900">Schedule Consultation</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
       
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="lg:col-span-2 bg-white rounded-lg p-6 border"
//         >
//           <div className="flex justify-between mb-4">
//             <h2 className="text-xl font-semibold">Available Schedules</h2>

//             <button
//               onClick={() => setShowRequestForm(!showRequestForm)}
//               className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center space-x-2"
//             >
//               <CalendarIcon className="h-4 w-4" />
//               <span>Request Schedule</span>
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {loading && <p className="text-center text-gray-500">Loading...</p>}

       
//           <div className="space-y-4">
//             {available?.map((slot) => (
//               <Card key={slot._id}>
//                 {/* DATE & STATUS */}
//                 <div className="flex items-center space-x-2">
//                   <CalendarIcon className="h-5 w-5 text-teal-700" />
//                   <h3 className="font-semibold text-gray-900">
//                     {formatDate(slot.date)}
//                   </h3>

//                   <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
//                     {slot.status}
//                   </span>
//                 </div>

//                 {/* TIME */}
//                 <div className="flex items-center text-gray-700 space-x-2">
//                   <ClockIcon className="h-4 w-4" />
//                   <span>
//                     {slot.startTime} – {slot.endTime}
//                   </span>
//                 </div>

//                 {/* ADMIN LABEL */}
//                 <p className="text-sm">
//                   <strong>Admin:</strong> Admin Team
//                 </p>

//                 {/* CONTACT BUTTON */}
//                 <button className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center space-x-2">
//                   <PhoneIcon className="h-4 w-4" />
//                   <span>Contact Admin</span>
//                 </button>
//               </Card>
//             ))}

          
//             {myRequests?.map((req) => (
//               <Card key={req._id}>
//                 {/* DATE & STATUS */}
//                 <div className="flex items-center space-x-2">
//                   <CalendarIcon className="h-5 w-5 text-teal-700" />
//                   <h3 className="font-semibold text-gray-900">
//                     {formatDate(req.date)}
//                   </h3>

//                   <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
//                     {req.status}
//                   </span>
//                 </div>

//                 {/* TIME */}
//                 <div className="flex items-center text-gray-700 space-x-2">
//                   <ClockIcon className="h-4 w-4" />
//                   <span>
//                     {req.startTime} – {req.endTime}
//                   </span>
//                 </div>

//                 {/* TIMEZONE */}
//                 <p className="text-sm">
//                   <strong>Timezone:</strong> {req.timezone}
//                 </p>

//                 {/* CONTACT METHOD */}
//                 <p className="text-sm">
//                   <strong>Contact Method:</strong> {req.preferredMethod}
//                 </p>

//                 {/* REASON */}
//                 <p className="text-sm">
//                   <strong>Reason:</strong> {req.reason}
//                 </p>

//                 {/* ADMIN */}
//                 <p className="text-sm">
//                   <strong>Admin:</strong> {req.admin || "Admin Team"}
//                 </p>

//                 {/* CONTACT BUTTON */}
//                 <button className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center space-x-2">
//                   <PhoneIcon className="h-4 w-4" />
//                   <span>Contact Admin</span>
//                 </button>
//               </Card>
//             ))}
//           </div>
//         </motion.div>

        
//         <div className="space-y-6">

        
//           {showRequestForm && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-6 rounded-lg border"
//             >
//               <div className="flex justify-between mb-4">
//                 <h3 className="text-lg font-semibold">Request Schedule</h3>
//                 <button onClick={() => setShowRequestForm(false)}>
//                   <XCircleIcon className="h-5 w-5 text-gray-400" />
//                 </button>
//               </div>

//               <form className="space-y-4" onSubmit={handleRequestSubmit}>
//                 {/* DATE */}
//                 <div>
//                   <label className="text-sm">Preferred Date</label>
//                   <input
//                     type="date"
//                     className="w-full border rounded-lg p-2"
//                     value={requestData.preferredDate}
//                     onChange={(e) =>
//                       setRequestData({
//                         ...requestData,
//                         preferredDate: e.target.value,
//                       })
//                     }
//                   />
//                   {requestFormErrors.preferredDate && (
//                     <span className="text-red-500">
//                       {requestFormErrors.preferredDate}
//                     </span>
//                   )}
//                 </div>

//                 {/* TIMEZONE */}
//                 <div>
//                   <label className="text-sm mb-2 block">Time Zone</label>
//                   <select
//                     className="w-full border rounded-lg p-2"
//                     value={requestData.timezone}
//                     onChange={(e) =>
//                       setRequestData({ ...requestData, timezone: e.target.value })
//                     }
//                   >
//                     <option value="">- Select One -</option>
//                     <option value="CST">CST</option>
//                     <option value="EST">EST</option>
//                     <option value="PST">PST</option>
//                     <option value="MST">MST</option>
//                     <option value="IST">IST</option>
//                     <option value="UTC">UTC</option>
//                   </select>
//                   {requestFormErrors.timezone && (
//                     <span className="text-red-500">
//                       {requestFormErrors.timezone}
//                     </span>
//                   )}
//                 </div>

//                 {/* TIME */}
//                 <div>
//                   <label className="text-sm">Preferred Time</label>
//                   <input
//                     type="time"
//                     className="w-full border rounded-lg p-2"
//                     value={requestData.preferredTime}
//                     onChange={(e) =>
//                       setRequestData({
//                         ...requestData,
//                         preferredTime: e.target.value,
//                       })
//                     }
//                   />
//                   {requestFormErrors.preferredTime && (
//                     <span className="text-red-500">
//                       {requestFormErrors.preferredTime}
//                     </span>
//                   )}
//                 </div>

//                 {/* REASON */}
//                 <div>
//                   <label className="text-sm">Reason</label>
//                   <textarea
//                     className="w-full border rounded-lg p-2"
//                     rows={3}
//                     value={requestData.reason}                                                           
//                     onChange={(e) =>                                          
//                       setRequestData({ ...requestData, reason: e.target.value })
//                     }
//                   />
//                 </div>

//                 <button
              
//                 className="w-full bg-primary-blue text-white p-2 rounded-lg">
//                   Submit Request
//                 </button>
//               </form>
//             </motion.div>
//           )}

//           <motion.div className="bg-white p-6 rounded-lg border">
//             <h3 className="text-lg font-semibold mb-3">My Appointment</h3>

//             {myAppointment ? (
//               <div className="border border-teal-300 bg-teal-50 p-4 rounded-lg">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <CheckCircleIcon className="h-5 w-5 text-teal-600" />
//                   <span className="text-teal-700">{myAppointment.status}</span>
//                 </div>

//                 <p className="font-semibold">{formatDate(myAppointment.date)}</p>

//                 <p>{myAppointment.time}</p>

//                 <p className="text-sm">
//                   <strong>Reason:</strong> {myAppointment.reason}
//                 </p>

//                 <button className="mt-3 px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center space-x-2">
//                   <PhoneIcon className="h-4 w-4" />
//                   <span>Contact Admin</span>
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center">No appointment found</p>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scheduling;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

// import {
//   getAvailableSchedules,
//   getMyAppointment,
//   requestSchedule,
//   clearScheduleMessages,
//   bookSchedule,
// } from "../../Redux/Slices/schedulingSlice";

import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  XCircleIcon,
  CheckCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Scheduling = () => {
  const dispatch = useDispatch();

  const {
    available,
    myAppointment,
    loading,
    error,
    successMessage,
  } = useSelector((state) => state.schedule);

  const [showRequestForm, setShowRequestForm] = useState(false);

  const [requestData, setRequestData] = useState({
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    reason: "",
    contactMethod: "email",
  });

  const [requestFormErrors, setRequestFormErrors] = useState({});

  const requestformvalidation = () => {
    const errors = {};
    if (!requestData.preferredDate) errors.preferredDate = "Date required";
    if (!requestData.preferredTime) errors.preferredTime = "Time required";
    if (!requestData.timezone) errors.timezone = "Timezone required";
    if (!requestData.reason) errors.reason = "Reason required";
    setRequestFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    dispatch(getAvailableSchedules());
    dispatch(getMyAppointment());
  }, [dispatch]);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestformvalidation()) return;
    dispatch(requestSchedule(requestData));
  };

  useEffect(() => {
    if (successMessage) {
      setShowRequestForm(false);
      setRequestData({
        preferredDate: "",
        preferredTime: "",
        timezone: "",
        reason: "",
        contactMethod: "email",
      });
      dispatch(clearScheduleMessages());
    }
  }, [successMessage, dispatch]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "-";

  const Card = ({ children }) => (
    <div className="border border-teal-300 bg-teal-50 rounded-xl p-5 space-y-3 shadow-sm">
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Schedule Consultation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-lg p-6 border"
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Available Schedules</h2>

            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Request Schedule
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p className="text-center text-gray-500">Loading...</p>}

          <div className="space-y-4">
            {available?.map((slot) => (
              <Card key={slot._id}>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-teal-700" />
                  <h3 className="font-semibold">{formatDate(slot.date)}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4" />
                  {slot.startTime} – {slot.endTime}
                </div>

                <button className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  Contact Admin
                </button>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="space-y-6">
          {showRequestForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg border"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Request Schedule</h3>
                <button onClick={() => setShowRequestForm(false)}>
                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleRequestSubmit}>
                {/* ✅ NEW DATE + TIME PICKER */}
                <div>
                  <label className="text-sm mb-1 block">
                    Preferred Date & Time
                  </label>

                  <Flatpickr
                    options={{
                      enableTime: true,
                      dateFormat: "Y-m-d H:i",
                      minDate: "today",
                      appendTo: document.body,
                    }}
                    className="w-full border rounded-lg p-2"
                    placeholder="Select date & time"
                    onChange={([date]) => {
                      if (!date) return;
                      setRequestData({
                        ...requestData,
                        preferredDate: date.toISOString().split("T")[0],
                        preferredTime: date
                          .toTimeString()
                          .slice(0, 5),
                      });
                    }}
                  />

                  {(requestFormErrors.preferredDate ||
                    requestFormErrors.preferredTime) && (
                    <span className="text-red-500 text-sm">
                      Date & time required
                    </span>
                  )}
                </div>

                {/* TIMEZONE */}
                <div>
                  <label className="text-sm mb-1 block">Time Zone</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={requestData.timezone}
                    onChange={(e) =>
                      setRequestData({
                        ...requestData,
                        timezone: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="CST">CST</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="IST">IST</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                {/* REASON */}
                <div>
                  <label className="text-sm">Note</label>
                  <textarea
                    className="w-full border rounded-lg p-2"
                    rows={3}
                    value={requestData.reason}
                    onChange={(e) =>
                      setRequestData({
                        ...requestData,
                        reason: e.target.value,
                      })
                    }
                  />
                </div>

                <button className="w-full bg-primary-blue text-white p-2 rounded-lg">
                  Submit Request
                </button>
              </form>
            </motion.div>
          )}

          {/* MY APPOINTMENT */}
          <motion.div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">My Appointment</h3>

            {myAppointment ? (
              <div className="border border-teal-300 bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircleIcon className="h-5 w-5 text-teal-600" />
                  <span className="text-teal-700">
                    {myAppointment.status}
                  </span>
                </div>

                <p className="font-semibold">
                  {formatDate(myAppointment.date)}
                </p>
                <p>{myAppointment.time}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No appointment found
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
