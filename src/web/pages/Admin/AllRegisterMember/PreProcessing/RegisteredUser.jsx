import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Example Redux action (replace with your real one)
// import { fetchAllocatedMembers } from "../store/membersSlice";

export default function RegisterUser() {
  const dispatch = useDispatch();

  // Redux state (adjust selectors to your store structure)
  const { data = [], loading = false } = useSelector(
    (state) => state.members || {}
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Fetch data from Redux on mount
  useEffect(() => {
    // dispatch(fetchAllocatedMembers());
  }, [dispatch]);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Allocated members</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Excel
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-4">
          <button className="bg-green-600 text-white px-3 py-1.5 rounded text-sm">
            New Registered Members
          </button>
          <button className="bg-green-600 text-white px-3 py-1.5 rounded text-sm">
            Last modified Members
          </button>
          <span className="text-sm text-gray-600">
            Total <span className="font-semibold">{data.length}</span>
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">S.No</th>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">File No</th>
                <th className="border px-3 py-2 text-left">Filing Type</th>
                <th className="border px-3 py-2 text-left">E-mail</th>
                <th className="border px-3 py-2 text-left">Register date</th>
                <th className="border px-3 py-2 text-left">File Status</th>
                <th className="border px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((member, index) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="border px-3 py-2">{member.name}</td>
                    <td className="border px-3 py-2">{member.fileNo}</td>
                    <td className="border px-3 py-2">{member.filingType}</td>
                    <td className="border px-3 py-2">{member.email}</td>
                    <td className="border px-3 py-2">{member.registerDate}</td>
                    <td className="border px-3 py-2">{member.status}</td>
                    <td className="border px-3 py-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
