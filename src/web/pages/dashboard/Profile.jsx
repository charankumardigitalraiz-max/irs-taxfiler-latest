// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import { updateProfile } from "../../Redux/Slices/userSlice";
// import { baseUrl } from "../../../src/Services/apis"
// import {
//   UserCircleIcon,
//   CameraIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   MapPinIcon,
//   TagIcon,
// } from "@heroicons/react/24/outline";

// const Profile = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();

//   // ✅ FORM STATE
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     referralId: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // ✅ Load redux user to form
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.mobile || "",
//         address: user.address || "",
//         referralId: user.referralId || "",
//       });
//     }
//   }, [user]);

//   // ✅ Input handler
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ✅ Image handler
//   const handleImageChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   // ✅ Submit update
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsEditing(false);

//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("mobile", formData.phone);
//     form.append("address", formData.address);
//     form.append("referralId", formData.referralId);

//     if (profileImage) {
//       form.append("image", profileImage);
//     }

//     dispatch(updateProfile(form));
//   };

//   if (!user) {
//     return (
//       <div className="text-center py-10 text-gray-500">User not logged in.</div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ================= PHOTO ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border p-6"
//         >
//           <div className="text-center">
//             <div className="relative inline-block mb-4">
//               <div className="h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center mx-auto overflow-hidden">
//                 {user?.image ? (
//                   <img
//                     src={`${baseUrl}/${user.image}`}
//                     alt=""
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-white font-bold text-5xl">
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </span>
//                 )}
//               </div>

//               {isEditing && (
//                 <label className="absolute bottom-0 right-0 p-2 bg-white cursor-pointer rounded-full shadow-lg border hover:bg-gray-100">
//                   <CameraIcon className="h-5 w-5 text-gray-600" />
//                   <input
//                     hidden
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               )}
//             </div>

//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>
//         </motion.div>

//         {/* ================= FORM ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6"
//         >
//           <div className="flex justify-between mb-6">
//             <h2 className="text-xl font-semibold">Personal Info</h2>
//             {!isEditing && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* NAME */}
//             <Field
//               icon={UserCircleIcon}
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />

//             {/* EMAIL */}
//             <Field
//               icon={EnvelopeIcon}
//               label="Email"
//               value={formData.email}
//               disabled
//             />

//             {/* PHONE */}
//             <Field
//               icon={PhoneIcon}
//               label="Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />

//             {/* ADDRESS */}
//             <TextAreaField
//               icon={MapPinIcon}
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />

//             {/* REFERRAL ID */}
//             <Field
//               icon={TagIcon}
//               label="Referral ID"
//               name="referralId"
//               value={formData.referralId}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />

//             {isEditing && (
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// /* ---------- REUSABLE INPUT ---------- */
// const Field = ({ icon: Icon, label, value, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     <div className="relative mt-1">
//       <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />
//       <input
//         {...props}
//         value={value}
//         className="w-full pl-10 pr-4 py-2.5 border rounded-lg
//                   focus:ring-2 focus:ring-blue-500
//                   disabled:bg-gray-50 disabled:text-gray-400"
//       />
//     </div>
//   </div>
// );

// /* ---------- REUSABLE TEXTAREA ---------- */
// const TextAreaField = ({ icon: Icon, label, value, ...props }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     <div className="relative mt-1">
//       <Icon className="absolute left-3 top-4 h-5 text-gray-400" />
//       <textarea
//         {...props}
//         value={value}
//         rows="3"
//         className="w-full pl-10 pr-4 py-2.5 border rounded-lg
//                   focus:ring-2 focus:ring-blue-500
//                   disabled:bg-gray-50 disabled:text-gray-400"
//       />
//     </div>
//   </div>
// );
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
// import { updateProfile } from "../../Redux/Slices/userSlice";
// import { baseUrl } from "../../../src/Services/apis";
import {
  UserCircleIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // ✅ FORM STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    referralId: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ NEW: IMAGE PREVIEW
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load redux user into form
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.mobile || "",
        address: user.address || "",
        referralId: user.referralId || "",
      });
    }
  }, [user]);

  // ✅ Input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Image handler with PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Optional basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file)); // ✅ Preview before save
  };

  // ✅ Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);

    const form = new FormData();
    form.append("name", formData.firstName);
    form.append("name", formData.lastName);
    form.append("mobile", formData.phone);
    form.append("address", formData.address);
    form.append("referralId", formData.referralId);

    if (profileImage) {
      form.append("image", profileImage);
    }

    dispatch(updateProfile(form));

    setPreview(null); // reset preview after save
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500">User not logged in.</div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= PHOTO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="text-center">
            <div className="relative inline-block mb-4">
              {/* ✅ AVATAR */}
              <div className="h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center mx-auto overflow-hidden">
                {/* ✅ Priority: Preview → Backend image → Fallback letter */}

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.image ? (
                  <img
                    src={`${baseUrl}/${user.image.replace(/\\/g, "/")}`}
                    alt={user?.firstName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-5xl">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* ✅ IMAGE PICKER BUTTON */}
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-white cursor-pointer rounded-full shadow-lg border hover:bg-gray-100">
                  <CameraIcon className="h-5 w-5 text-gray-600" />

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h3 className="text-lg font-semibold">{user.name}</h3>

            <p className="text-sm text-gray-500">{user.email}</p>
            {/* <p className="text-sm text-gray-500 mt-3">Referral id: {user.referralId}</p> */}

            <div className="mt-4 w-full flex justify-center">
              <div className="px-4 py-1.5 rounded-full bg-purple-100 text-[#3C6AA3] shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Referral ID:
                </span>
                
                <span className="ml-1 font-bold">{user.referralId}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">Personal Info</h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <Field
              icon={UserCircleIcon}
              label="First Name"
              name="name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Field
              icon={UserCircleIcon}
              label="Last Name"
              name="name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* EMAIL */}
            <Field
              icon={EnvelopeIcon}
              label="Email"
              value={formData.email}
              disabled
            />

            {/* PHONE */}
            <Field
              icon={PhoneIcon}
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* ADDRESS */}
            <TextAreaField
              icon={MapPinIcon}
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* REFERRAL */}
            <Field
              icon={TagIcon}
              label="Referral ID"
              name="referralId"
              value={formData.referralId}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setPreview(null);
                  }}
                  className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

/* ---------- REUSABLE INPUT ---------- */
const Field = ({ icon: Icon, label, value, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />
      <input
        {...props}
        value={value}
        className="
          w-full pl-10 pr-4 py-2.5 border rounded-lg
          focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-50 disabled:text-gray-400
        "
      />
    </div>
  </div>
);

/* ---------- REUSABLE TEXTAREA ---------- */
const TextAreaField = ({ icon: Icon, label, value, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-4 h-5 text-gray-400" />
      <textarea
        {...props}
        value={value}
        rows="3"
        className="
          w-full pl-10 pr-4 py-2.5 border rounded-lg
          focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-50 disabled:text-gray-400
        "
      />
    </div>
  </div>
);
