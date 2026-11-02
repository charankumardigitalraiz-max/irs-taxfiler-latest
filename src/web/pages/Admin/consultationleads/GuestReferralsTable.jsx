// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import { fetchGuestReferrals } from "../../../Redux/Slices/adminGuestReferralSlice";

// const PAGE_SIZE = 10;

// const GuestReferralsTable = () => {
//   const dispatch = useDispatch();

//   const { data, total, loading } = useSelector(
//     (state) => state.adminGuestReferral
//   );

//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchGuestReferrals({ page, limit: PAGE_SIZE }));
//   }, [page, dispatch]);

//   const totalPages = Math.ceil(total / PAGE_SIZE);

//   return (
//     <div className="p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Guest Referrals
//       </h2>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Referrer Name
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Referrer Phone
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Friend Name
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Friend Email
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Friend Phone
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Date
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6">
//                   Loading...
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6">
//                   No referrals found
//                 </td>
//               </tr>
//             ) : (
                
//               data.map((item) =>
//                 item.map((friend, index) => (
//                   <motion.tr
//                     key={`${item._id}-${index}`}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="border-t"
//                   >
//                     <td className="px-4 py-3 text-sm">
//                       {item.referreName}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {item.referrePhone}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {friend.Name}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {friend.Email}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {friend.phone || "-"}
//                     </td>
//                     <td className="px-4 py-3 text-sm">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </td>
//                   </motion.tr>
//                 ))
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-6">
//         <span className="text-sm text-gray-600">
//           Page {page} of {totalPages}
//         </span>

//         <div className="flex gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => p - 1)}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => p + 1)}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuestReferralsTable;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { fetchGuestReferrals } from "../../../Redux/Slices/adminGuestReferralSlice";

const PAGE_SIZE = 10;

const GuestReferralsTable = () => {
  const dispatch = useDispatch();
  const { data = [], total, loading } = useSelector(
    (state) => state.adminGuestReferral
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGuestReferrals({ page, limit: PAGE_SIZE }));
  }, [page, dispatch]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Guest Referrals
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Referred Name
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Referred Email
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Referral Code
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Reward
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left">
                Joined Date
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No referrals found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm">
                    {item.referredName || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.referredEmail || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">
                    {item.referralCodeUsed}
                  </td>
                  <td className="px-4 py-3 text-sm capitalize">
                    {item.referralStatus}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ${item.rewardAmount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(item.joinedDate).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestReferralsTable;
