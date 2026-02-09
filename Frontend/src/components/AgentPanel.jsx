import { useState, useEffect } from "react";
import API from "../services/api";
import { User, Phone, FileText, RefreshCw } from "lucide-react"; 

const AgentPanel = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyLeads = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/leads"); 
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            My Assigned Leads
          </h2>
          <p className="text-gray-500">You have {leads.length} active tasks.</p>
        </div>
        <button
          onClick={fetchMyLeads}
          className="flex items-center px-4 py-2 text-blue-600 transition bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh List
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="relative p-5 transition-shadow bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
            >
              <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full 
                ${lead.status === "New" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
              >
                {lead.status}
              </span>

              {/* Lead Details */}
              <div className="flex items-center mb-3">
                <div className="p-2 mr-3 bg-gray-100 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {lead.firstName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Added: {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-mono text-sm">{lead.phone}</span>
                </div>

                <div className="p-3 mt-3 text-sm text-gray-600 rounded bg-gray-50">
                  <div className="flex items-center mb-1 font-semibold text-gray-500">
                    <FileText className="w-3 h-3 mr-1" /> Notes:
                  </div>
                  {lead.notes || "No notes provided."}
                </div>
              </div>

           
              <div className="mt-4 pt-4 border-t flex gap-2">
                <button className="flex-1 py-1.5 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700">
                  Call Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500 col-span-full bg-white rounded-lg">
            <p className="text-lg">No leads assigned to you yet.</p>
            <p className="text-sm">Ask your admin to upload a list!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPanel;
