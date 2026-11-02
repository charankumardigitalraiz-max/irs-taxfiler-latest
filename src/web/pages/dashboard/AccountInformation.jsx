import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  IdentificationIcon,
  MapPinIcon,
  EnvelopeIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getTaxpayerProfile,
//   saveTaxpayerProfile,
// } from "../../Redux/Slices/taxpayerSlice";
// import { baseUrl } from "../../Services/apis";
// import {
//   saveSpouseProfile,
//   getSpouseProfile,
// } from "../../Redux/Slices/spouseSlice";
import { toast } from "react-toastify";
// import {
//   saveAddress,
//   getAddress,
// } from "../../Redux/Slices/addressInformationSlice";
// import { saveContact, getContact } from "../../Redux/Slices/contactSlice";
// import {
//   saveIdentity,
//   getIdentity,
// } from "../../Redux/Slices/identityVerificationSlice";
// import {
//   getBankDetails,
//   saveBankDetails,
// } from "../../Redux/Slices/bankDetailSlice";
// import {
//   getDependents,
//   saveDependents,
// } from "../../Redux/Slices/dependentSlice";

const AccountInformation = () => {
  const [activeSection, setActiveSection] = useState("Taxpayer Profile");
  const [completedSections, setCompletedSections] = useState([
    "Taxpayer Profile",
  ]);

  const dispatch = useDispatch(); // ✅ ADD THIS

  const { profile, loading } = useSelector((state) => state.taxpayer);

  useEffect(() => {
    dispatch(getTaxpayerProfile());
  }, [dispatch]);

  const sections = [
    {
      id: "Taxpayer Profile",
      icon: UserCircleIcon,
      description: "Personal information and filing status",
    },
    {
      id: "Spouse Details",
      icon: UserCircleIcon,
      description: "Spouse personal information",
    },
    {
      id: "Dependent Details",
      icon: UserCircleIcon,
      description: "Add and manage dependents",
    },
    {
      id: "Address",
      icon: MapPinIcon,
      description: "Current and tax year addresses",
    },
    {
      id: "Contact Information",
      icon: EnvelopeIcon,
      description: "Email and phone contacts",
    },
    {
      id: "Identity Verification",
      icon: IdentificationIcon,
      description: "Driver's license verification",
    },
    {
      id: "Bank Details",
      icon: CreditCardIcon,
      description: "Banking information for refunds",
    },
  ];

  const isCompleted = (section) => completedSections.includes(section);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Account Information
        </h1>
        <p className="text-gray-600">
          Complete your account information to proceed with tax filing. All
          information is securely stored.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Information Sections
            </h3>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const completed = isCompleted(section.id);

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary-blue text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      />
                      <div className="text-left flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {section.id}
                          </span>
                          {completed && !isActive && (
                            <CheckCircleIcon className="h-4 w-4 text-teal-500" />
                          )}
                        </div>
                        {!isActive && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            {activeSection === "Taxpayer Profile" && <TaxpayerProfileForm />}
            {activeSection === "Spouse Details" && <SpouseDetailsForm />}
            {activeSection === "Dependent Details" && <DependentDetailsForm />}
            {activeSection === "Address" && <AddressForm />}
            {activeSection === "Contact Information" && (
              <ContactInformationForm />
            )}
            {activeSection === "Identity Verification" && (
              <IdentityVerificationForm />
            )}
            {activeSection === "Bank Details" && <BankDetailsForm />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Taxpayer Profile Component
const TaxpayerProfileForm = () => {
  const dispatch = useDispatch(); // ✅ ADD THIS
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, success } = useSelector((state) => state.taxpayer);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    dateOfBirth: "",
    filingStatus: "",
    occupation: "",
  });

  const [profileImageError, setProfileImageError] = useState(false);
  const [AccountError, SetAccountError] = useState({});

  useEffect(() => {
    if (!user && !profile) return;

    const fullName = user?.name?.trim() || "";
    const [first = "", last = ""] = fullName.split(" ");

    setFormData({
      firstName: profile?.firstName || user?.firstName || first,
      middleName: profile?.middleName || "",
      lastName: profile?.lastName || user?.lastName || last,
      ssn: profile?.ssn || "",
      dateOfBirth: profile?.dob?.slice(0, 10) || "",
      filingStatus: profile?.filingStatus || "",
      occupation: profile?.occupation || "",
    });
  }, [profile, user]);

  const accountvalidation = () => {
    let newError = {};
    if (formData.firstName === "") {
      newError.firstName = "First name is required";
    }
    if (formData.lastName === "") {
      newError.lastName = "Last name is required";
    }
    if (formData.ssn === "") {
      newError.ssn = "SSN name is required";
    }
    if (formData.dateOfBirth === "") {
      newError.dateOfBirth = "DOB is required";
    }

    console.log("formData.filingStatus", formData.filingStatus);
    if (formData.filingStatus === "") {
      newError.filingStatus = "filing status is required";
    }

    console.log("newError", Object.keys(newError).length);
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("accountvalidation", accountvalidation());
    if (accountvalidation()) {
      console.log("Submitting data:", formData);
      dispatch(saveTaxpayerProfile(formData));
      SetAccountError([]);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md overflow-hidden">
            {user?.image && !profileImageError ? (
              <img
                src={`${baseUrl}/${user.image.replace(/\\/g, "/")}`}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover"
                onError={() => setProfileImageError(true)}
              />
            ) : (
              <span className="text-white font-medium text-xs">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Taxpayer Profile
          </h2>
          <p className="text-sm text-gray-500">
            Enter your personal information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter first name"
          />
          {AccountError.firstName && (
            <span className="text-red-500">{AccountError.firstName}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter middle name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter last name"
          />
          {AccountError.lastName && (
            <span className="text-red-500">{AccountError.lastName}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="XXX-XX-XXXX"
            maxLength={11}
          />
          {AccountError.ssn && (
            <span className="text-red-500">{AccountError.ssn}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
          {AccountError.dateOfBirth && (
            <span className="text-red-500">{AccountError.dateOfBirth}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.filingStatus}
            onChange={(e) =>
              setFormData({ ...formData, filingStatus: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            {AccountError.filingStatus && (
              <span className="text-red-500">{AccountError.filingStatus}</span>
            )}

            <option value="">Select filing status</option>
            <option value="single">Single</option>
            <option value="married-jointly">Married Filing Jointly</option>
            <option value="married-separately">
              Married Filing Separately
            </option>
            <option value="head-of-household">Head of Household</option>
            <option value="qualifying-widow">Qualifying Widow(er)</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation
          </label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) =>
              setFormData({ ...formData, occupation: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter your occupation"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Spouse Details Component
const SpouseDetailsForm = () => {
  const [profileImageError, setProfileImageError] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.spouse);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    dateOfBirth: "",
  });

  const [AccountError, SetAccountError] = useState({});

  const accountvalidation = () => {
    let newError = {};
    if (formData.firstName === "") {
      newError.firstName = "First name is required";
    }
    if (formData.lastName === "") {
      newError.lastName = "Last name is required";
    }
    if (formData.ssn === "") {
      newError.ssn = "SSN name is required";
    }
    if (formData.dateOfBirth === "") {
      newError.dateOfBirth = "DOB is required";
    }
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  };

  // ✅ Load existing spouse
  useEffect(() => {
    dispatch(getSpouseProfile());
  }, [dispatch]);

  // ✅ Fill form when data arrives
  useEffect(() => {
    if (!profile) return;

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      ssn: profile.ssn || "",
      dateOfBirth: profile.dob?.slice(0, 10) || "",
    });
  }, [profile]);

  // ✅ SAVE HANDLER
  // const handleSubmit = () => {
  //   console.log("Saving Spouse:", formData); // DEBUG
  //   dispatch(saveSpouseProfile(formData));
  // };
  const handleSubmit = async () => {
    // if (
    //   !formData.firstName.trim() ||
    //   !formData.lastName.trim() ||
    //   !formData.ssn.trim() ||
    //   !formData.dateOfBirth
    // ) {
    //   toast.error("Please fill all required fields ❗");
    //   return;
    // }

    try {
      if (accountvalidation()) {
        await dispatch(saveSpouseProfile(formData)).unwrap();
        toast.success("Spouse details saved ✅");
        SetAccountError([]);
      }
    } catch (err) {
      toast.error("Failed to save spouse details ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md overflow-hidden">
            {user?.image && !profileImageError ? (
              <img
                src={`${baseUrl}/${user.image.replace(/\\/g, "/")}`}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover"
                onError={() => setProfileImageError(true)}
              />
            ) : (
              <span className="text-white font-medium text-xs">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Spouse Details
          </h2>
          <p className="text-sm text-gray-500">
            Enter your spouse's information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spouse First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter spouse first name"
          />
          {AccountError.firstName && (
            <span className="text-red-500">{AccountError.firstName}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spouse Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter spouse last name"
          />
          {AccountError.lastName && (
            <span className="text-red-500">{AccountError.lastName}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spouse SSN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="XXX-XX-XXXX"
            maxLength={11}
          />
          {AccountError.ssn && (
            <span className="text-red-500">{AccountError.ssn}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spouse Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
          {AccountError.dateOfBirth && (
            <span className="text-red-500">{AccountError.dateOfBirth}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Dependent Details Component
const DependentDetailsForm = () => {
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.dependent);

  const [dependents, setDependents] = useState([
    { name: "", ssn: "", relationship: "", dob: "" },
  ]);

  const [AccountError, SetAccountError] = useState({});

  const accountvalidation = () => {
    let newError = {};

    dependents.forEach((dep) => {
      if (!dep.name) newError.name = "Name is required";
      if (!dep.ssn) newError.ssn = "SSN is required";
      if (!dep.relationship) newError.relationship = "Relationship is required";
      if (!dep.dob) newError.dob = "DOB is required";
    });

    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  };

  useEffect(() => {
    dispatch(getDependents());
  }, [dispatch]);

  useEffect(() => {
    if (!list || list.length === 0) return;

    setDependents(
      list.map((d) => ({
        name: d.name || "",
        ssn: d.ssn || "",
        relationship: d.relationship || "",
        dob: d.dob?.slice(0, 10) || "",
      }))
    );
  }, [list]);

  const handleChange = (index, e) => {
    const updated = [...dependents];
    updated[index][e.target.name] = e.target.value;
    setDependents(updated);
  };

  const addDependent = () => {
    setDependents([
      ...dependents,
      { name: "", ssn: "", relationship: "", dob: "" },
    ]);
  };

  const removeDependent = (index) => {
    setDependents(dependents.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (!accountvalidation()) return;

      await dispatch(saveDependents({ dependents })).unwrap();
      toast.success("Dependents saved ✅");
      SetAccountError({});
    } catch (err) {
      toast.error(err || "Failed to save dependents ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-blue/10 rounded-lg">
            <UserCircleIcon className="h-6 w-6 text-primary-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Dependent Details
            </h2>
            <p className="text-sm text-gray-500">
              Add information for your dependents
            </p>
          </div>
        </div>
        <button
          onClick={addDependent}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Dependent</span>
        </button>
      </div>

      <div className="space-y-4">
        {dependents.map((dependent, index) => (
          <div
            key={index}
            className="p-5 border-2 border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Dependent {index + 1}
              </h3>
              {dependents.length > 1 && (
                <button
                  onClick={() => removeDependent(index)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={dependent.name}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
                  placeholder="Enter dependent name"
                />
                {AccountError.name && (
                  <span className="text-red-500">{AccountError.name}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SSN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ssn"
                  value={dependent.ssn}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
                {AccountError.ssn && (
                  <span className="text-red-500">{AccountError.ssn}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  name="relationship"
                  value={dependent.relationship}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
                >
                  <option value="">Select relationship</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Stepchild</option>
                  <option>Other</option>
                </select>
                {AccountError.relationship && (
                  <span className="text-red-500">
                    {AccountError.relationship}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  name="dob"
                  type="date"
                  value={dependent.dob}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
                />
                {AccountError.dob && (
                  <span className="text-red-500">{AccountError.dob}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Address Form Component
const AddressForm = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    currentStreet: "",
    currentCity: "",
    currentState: "",
    currentZipCode: "",
    taxStreet: "",
    taxCity: "",
    taxState: "",
    taxZipCode: "",
  });

  const [AccountError, SetAccountError] = useState({});
  
  const accountvalidation = () => {
    let newError = {};
    if (formData.currentStreet === "") {
      newError.currentStreet = "Current street is required";
    }
    if (formData.currentCity === "") {
      newError.currentCity = "Current city is required";
    }
    if (formData.currentState === "") {
      newError.currentState = "Current state is required";
    }
    if (formData.currentZipCode === "") {
      newError.currentZipCode = "Current zip code is required";
    }
    if (formData.taxStreet === "") {
      newError.taxStreet = "Tax street is required";
    }
    if (formData.taxCity === "") {
      newError.taxCity = "Tax city is required";
    }
    if (formData.taxState === "") {
      newError.taxState = "Tax state is required";
    }
    if (formData.taxZipCode === "") {
      newError.taxZipCode = "Tax zip code is required";
    }
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  }

  // ✅ LOAD DATA ON SCREEN OPEN
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  // ✅ SET REDUX DATA TO FORM
  useEffect(() => {
    if (!profile) return;

    setFormData({
      currentStreet: profile.currentAddress.street,
      currentCity: profile.currentAddress.city,
      currentState: profile.currentAddress.state,
      currentZipCode: profile.currentAddress.zipCode,

      taxStreet: profile.taxYearAddress.street,
      taxCity: profile.taxYearAddress.city,
      taxState: profile.taxYearAddress.state,
      taxZipCode: profile.taxYearAddress.zipCode,
    });
  }, [profile]);

  // ✅ SAVE HANDLER
  const handleSubmit = async () => {
    // const values = Object.values(formData);
    // if (values.some((val) => !val.trim())) {
    //   toast.error("Please fill all address fields ❗");
    //   return;
    // }

    try {
      if (!accountvalidation()) return;
      await dispatch(saveAddress(formData)).unwrap();
      toast.success("Address saved ✅");
    } catch (err) {
      toast.error("Failed to save address ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <MapPinIcon className="h-6 w-6 text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Address Information
          </h2>
          <p className="text-sm text-gray-500">
            Current and tax year addresses
          </p>
        </div>
      </div>

      {/* Current Address */}
      <div className="space-y-4 p-5 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900">Current Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="Enter street address"
              value={formData.currentStreet}
              onChange={(e) =>
                setFormData({ ...formData, currentStreet: e.target.value })
              }
            />
            {AccountError.currentStreet && (
              <span className="text-red-500">{AccountError.currentStreet}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="City"
              value={formData.currentCity}
              onChange={(e) =>
                setFormData({ ...formData, currentCity: e.target.value })
              }
            />
            {AccountError.currentCity && (
              <span className="text-red-500">{AccountError.currentCity}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="State"
              value={formData.currentState}
              onChange={(e) =>
                setFormData({ ...formData, currentState: e.target.value })
              }
            />
            {AccountError.currentState && (
              <span className="text-red-500">{AccountError.currentState}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="Zip"
              value={formData.currentZipCode}
              onChange={(e) =>
                setFormData({ ...formData, currentZipCode: e.target.value })
              }
            />
            {AccountError.currentZipCode && (
              <span className="text-red-500">
                {AccountError.currentZipCode}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tax Year Address */}
      <div className="space-y-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900">Tax Year Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="Enter street address"
              value={formData.taxStreet}
              onChange={(e) =>
                setFormData({ ...formData, taxStreet: e.target.value })
              }
            />
            {AccountError.taxStreet && (
              <span className="text-red-500">{AccountError.taxStreet}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="City"
              value={formData.taxCity}
              onChange={(e) =>
                setFormData({ ...formData, taxCity: e.target.value })
              }
            />
            {AccountError.taxCity && (
              <span className="text-red-500">{AccountError.taxCity}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="State"
              value={formData.taxState}
              onChange={(e) =>
                setFormData({ ...formData, taxState: e.target.value })
              }
            />
            {AccountError.taxState && (
              <span className="text-red-500">{AccountError.taxState}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white"
              placeholder="Zip"
              value={formData.taxZipCode}
              onChange={(e) =>
                setFormData({ ...formData, taxZipCode: e.target.value })
              }
            />
            {AccountError.taxZipCode && ( 
              <span className="text-red-500">{AccountError.taxZipCode}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Contact Information Form Component
const ContactInformationForm = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    alternateEmail: "",
    alternatePhone: "",
  });

  const [AccountError, SetAccountError] = useState({});

  const accountvalidation = () => {
    let newError = {};
    if (formData.email === "") {
      newError.email = "Email is required";
    }
    if (formData.phone === "") {
      newError.phone = "Phone number is required";
    }
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  }

  // ✅ LOAD CONTACT DATA ON MOUNT
  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  // ✅ SET INTO FORM - PREVENT UNCONTROLLED WARNING
  useEffect(() => {
    if (!profile) return;

    setFormData({
      email: profile.email || "",
      phone: profile.phone || "",
      alternateEmail: profile.alternateEmail || "",
      alternatePhone: profile.alternatePhone || "",
    });
  }, [profile]);

  // ✅ SAVE HANDLER
  const handleSubmit = async () => {
   
    try {
      if (!accountvalidation()) return;
      await dispatch(saveContact(formData)).unwrap();
      toast.success("Contact info saved ✅");
    } catch (err) {
      // ✅ ALWAYS SHOW REAL MESSAGE
      toast.error(err || "Failed to save contact ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <EnvelopeIcon className="h-6 w-6 text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h2>
          <p className="text-sm text-gray-500">Update your contact details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="your.email@example.com"
          />
          {AccountError.email && (
            <span className="text-red-500">{AccountError.email}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
          {AccountError.phone && (
            <span className="text-red-500">{AccountError.phone}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternate Email
          </label>
          <input
            type="email"
            value={formData.alternateEmail}
            onChange={(e) =>
              setFormData({ ...formData, alternateEmail: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="alternate.email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternate Phone
          </label>
          <input
            type="tel"
            value={formData.alternatePhone}
            onChange={(e) =>
              setFormData({ ...formData, alternatePhone: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Identity Verification Form Component
const IdentityVerificationForm = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.identity);

  const [formData, setFormData] = useState({
    licenseNumber: "",
    stateOfIssue: "",
    expirationDate: "",
    licenseFile: null,
  });

  const [AccountError, SetAccountError] = useState({});

  const accountvalidation = () => {
    let newError = {};
    if (formData.licenseNumber === "") {
      newError.licenseNumber = "License number is required";
    }
    if (formData.stateOfIssue === "") {
      newError.stateOfIssue = "State of issue is required";
    }
    if (formData.expirationDate === "") {
      newError.expirationDate = "Expiration date is required";
    }
    if (!formData.licenseFile) {
      newError.licenseFile = "License file is required";
    }
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  }

  // ✅ LOAD EXISTING DATA
  useEffect(() => {
    dispatch(getIdentity());
  }, [dispatch]);

  // ✅ SET LOADED DATA INTO FORM
  useEffect(() => {
    if (!profile) return;

    setFormData((prev) => ({
      ...prev,
      licenseNumber: profile.licenseNumber || "",
      stateOfIssue: profile.stateOfIssue || "",
      expirationDate: profile.expirationDate?.slice(0, 10) || "",
    }));
  }, [profile]);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE FILE UPLOAD
  const handleFileChange = (e) => {
    setFormData({ ...formData, licenseFile: e.target.files[0] });
  };

  // ✅ SAVE HANDLER
  const handleSubmit = async () => {
    
    try {
      if (!accountvalidation()) return;
      await dispatch(saveIdentity(formData)).unwrap();
      toast.success("Identity verification saved ✅");
    } catch (err) {
      toast.error(err || "Save failed ❌");
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <IdentificationIcon className="h-6 w-6 text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Identity Verification
          </h2>
          <p className="text-sm text-gray-500">
            Upload your driver's license for verification
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Government ID Type <span className="text-red-500">*</span>
    </label>

    <select
      name="idType"
      value={formData.idType}
      onChange={handleChange}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
    >
      <option value="">Select ID Type</option>
      <option value="drivers_license">Driver’s License</option>
      <option value="state_id">State ID Card</option>
      <option value="passport">US Passport</option>
      <option value="military_id">Military ID</option>
    </select>

    {AccountError.idType && (
      <span className="text-red-500">{AccountError.idType}</span>
    )}
  </div>

  {/* ID Number */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {formData.idType === "passport"
        ? "Passport Number"
        : "ID / License Number"}{" "}
      <span className="text-red-500">*</span>
    </label>

    <input
      name="licenseNumber"
      type="text"
      value={formData.licenseNumber}
      onChange={handleChange}
      placeholder={
        formData.idType === "passport"
          ? "Enter passport number"
          : "Enter ID number"
      }
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
    />

    {AccountError.licenseNumber && (
      <span className="text-red-500">{AccountError.licenseNumber}</span>
    )}
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State of Issue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="stateOfIssue"
              value={formData.stateOfIssue}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              placeholder="Enter state"
            />
            {AccountError.stateOfIssue && (
              <span className="text-red-500">{AccountError.stateOfIssue}</span>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
            {AccountError.expirationDate && (
              <span className="text-red-500">
                {AccountError.expirationDate}
              </span>
            )}
          </div> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
           Upload Government ID <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-blue file:text-white hover:file:bg-blue-700 file:cursor-pointer"
              />
              {AccountError.licenseFile && (
                <span className="text-red-500">{AccountError.licenseFile}</span>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Upload a clear image or PDF of your document (Max 5MB)
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

// Bank Details Form Component
const BankDetailsForm = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.bank);

  const [formData, setFormData] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
  });
  const [AccountError, SetAccountError] = useState({});

  const accountvalidation = () => {
    let newError = {};
    if (formData.bankName === "") {
      newError.bankName = "Bank name is required";
    }
    if (formData.accountType === "") {
      newError.accountType = "Account type is required";
    }
    if (formData.accountNumber === "") {
      newError.accountNumber = "Account number is required";
    }
    if (formData.routingNumber === "") {
      newError.routingNumber = "Routing number is required";
    }
    if (formData.accountHolderName === "") {
      newError.accountHolderName = "Account holder name is required";
    }
    SetAccountError(newError);
    return Object.keys(newError).length === 0;
  }

  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      bankName: profile.bankName || "",
      accountType: profile.accountType || "",
      accountNumber: profile.accountNumber || "",
      routingNumber: profile.routingNumber || "",
      accountHolderName: profile.accountHolderName || "",
    });
  }, [profile]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
   

    try {
      if (!accountvalidation()) return;
      await dispatch(saveBankDetails(formData)).unwrap();
      toast.success("Bank details saved ✅");
    } catch (err) {
      toast.error(err || "Failed to save bank details ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <CreditCardIcon className="h-6 w-6 text-primary-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Bank Details</h2>
          <p className="text-sm text-gray-500">
            Banking information for tax refund direct deposit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter bank name"
          />
          {AccountError.bankName && (
            <span className="text-red-500">{AccountError.bankName}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type <span className="text-red-500">*</span>
          </label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="">Select account type</option>
            <option>Current</option>
            <option>Saving</option>
          </select>
          {AccountError.accountType && (  
            <span className="text-red-500">{AccountError.accountType}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter account number"
          />
          {AccountError.accountNumber && (
            <span className="text-red-500">{AccountError.accountNumber}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Routing Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="routingNumber"
            value={formData.routingNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter routing number"
          />
          {AccountError.routingNumber && (
            <span className="text-red-500">{AccountError.routingNumber}</span>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Holder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            placeholder="Enter account holder name"
          />
          {AccountError.accountHolderName && (
            <span className="text-red-500">{AccountError.accountHolderName}</span>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <BuildingOfficeIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              Secure & Encrypted
            </p>
            <p className="text-xs text-blue-800">
              Your bank details are encrypted and securely stored. This
              information is used exclusively for tax refund direct deposit.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default AccountInformation;
