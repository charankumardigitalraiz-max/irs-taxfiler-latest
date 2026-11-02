import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getContactLeads } from "../../../Redux/Slices/consultationSlice";

const ITEMS_PER_PAGE = 5;

const AdminContactLeads = () => {
  const dispatch = useDispatch();

  const { contactLeads, leadsLoading, leadsError } = useSelector(
    (state) => state.consultation
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getContactLeads("consultantform"));
  }, [dispatch]);

  const totalPages = Math.ceil(contactLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLeads = contactLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Schedule a Meet</h1>

      {/* Loading */}
      {leadsLoading && (
        <div className="text-gray-500">Loading Schedule a Meet...</div>
      )}

      {/* Error */}
      {leadsError && <div className="text-red-500 mb-4">{leadsError}</div>}

      {/* Empty State */}
      {/* {!leadsLoading && contactLeads.length === 0 && (
        <div className="text-gray-500">No contact leads found.</div>
      )} */}

      {/* TABLE */}
      {!leadsLoading && (
        <div className="bg-white rounded-lg shadow border flex flex-col">
          {/* Scrollable Table Body */}
          <div className="overflow-y-auto max-h-[420px]">
            <table className="w-full table-fixed">
              <thead className="bg-gray-100 sticky top-0 z-10 text-sm">
                <tr>
                  <th className="p-3 w-36 text-left">Name</th>
                  <th className="p-3 w-52 text-left">Email</th>
                  <th className="p-3 w-40 text-left">Mobile</th>
                  <th className="p-3 w-28 text-left">Time Zone</th>
                  <th className="p-3 w-32 text-left">Best Time</th>
                  {/* <th className="p-3 w-40 text-left">Subject</th>
                  <th className="p-3 w-60 text-left">Message</th> */}
                  <th className="p-3 w-32 text-left">Created</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {currentLeads.length > 0 ? (
                  currentLeads.map((lead) => (
                    <tr key={lead._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 truncate">{lead.fullName || "-"}</td>

                      <td className="p-3 truncate text-blue-600">
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>

                      <td className="p-3">
                        {lead.countryCode
                          ? `${lead.countryCode} ${lead.mobileNumber}`
                          : lead.mobileNumber}
                      </td>

                      <td className="p-3">{lead.timeZone || "-"}</td>

                      <td className="p-3">{lead.bestTimeToConnect || "-"}</td>

                      {/* <td className="p-3 truncate">{lead.subject || "-"}</td>

                      <td className="p-3 truncate">{lead.message || "-"}</td> */}

                      <td className="p-3 text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-1.5 text-sm border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-1.5 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactLeads;
