import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "../../../Redux/Slices/adminUserSlice";

export default function AllRegisterUser() {
  const dispatch = useDispatch();

  const { list: data, loading } = useSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* ===========================
     PAGINATION (UNCHANGED)
     =========================== */

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">
        All Registered Members
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">S.No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Referral ID</th>
              <th className="border p-2">Referral By</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="border p-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.mobile}</td>
                <td className="border p-2">
                  {user.referralId || "-"}
                </td>
                <td className="border p-2">
                  {user.referralBy || "-"}
                </td>
                <td className="border p-2 text-center">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
