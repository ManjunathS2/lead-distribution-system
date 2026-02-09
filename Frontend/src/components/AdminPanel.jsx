import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { UserPlus, Upload, FileText, Users, Trash2 } from 'lucide-react'; // Add Trash2

const AdminPanel = () => {

  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleDeleteAgent = async (agentId) => {
    if (
      window.confirm("Are you sure? This agent's leads will become unassigned.")
    ) {
      try {
        await API.delete(`/agents/${agentId}`);
        toast.success("Agent deleted successfully");
        fetchAgents(); 
        fetchLeads(); 
      } catch (error) {
        toast.error("Failed to delete agent");
      }
    }
  };


  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await API.delete(`/leads/${leadId}`);
        toast.success("Lead deleted");
        fetchLeads();
      } catch (error) {
        toast.error("Failed to delete lead");
      }
    }
  };

  const [leads, setLeads] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

 
  useEffect(() => {
    fetchAgents();
    fetchLeads();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await API.get("/agents");
      setAgents(data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchLeads = async () => {
    try {
      const { data } = await API.get("/leads");
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };


  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents", newAgent);
      toast.success("Agent Created Successfully!");
      setNewAgent({ name: "", email: "", mobile: "", password: "" }); 
      fetchAgents(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create agent");
    }
  };

  // Upload CSV 
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file); 

    setUploading(true);
    try {
      const { data } = await API.post("/leads/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      setFile(null);
      fetchLeads(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
   
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
            <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
            Add New Agent
          </h2>
          <form onSubmit={handleCreateAgent} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border rounded"
              value={newAgent.name}
              onChange={(e) =>
                setNewAgent({ ...newAgent, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded"
              value={newAgent.email}
              onChange={(e) =>
                setNewAgent({ ...newAgent, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mobile"
              required
              className="w-full p-2 border rounded"
              value={newAgent.mobile}
              onChange={(e) =>
                setNewAgent({ ...newAgent, mobile: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded"
              value={newAgent.password}
              onChange={(e) =>
                setNewAgent({ ...newAgent, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Create Agent
            </button>
          </form>
        </div>

       {/* upload csv */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
            <Upload className="w-5 h-5 mr-2 text-green-600" />
            Upload Leads (CSV/Excel)
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="p-4 text-center border-2 border-dashed rounded-lg bg-gray-50 border-gray-300">
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="mt-2 text-xs text-gray-400">
                Supported: .csv, .xlsx
              </p>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-2 text-white rounded ${uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {uploading ? "Processing..." : "Upload & Distribute"}
            </button>
          </form>

      
          <div className="mt-6">
      
            <div className="mt-6">
              <h3 className="flex items-center text-sm font-semibold text-gray-600">
                <Users className="w-4 h-4 mr-2" /> Active Agents:{" "}
                {agents.length}
              </h3>

              <div className="flex flex-col gap-2 mt-3">
                {agents.map((agent) => (
                  <div
                    key={agent._id}
                    className="flex items-center justify-between p-2 text-sm bg-gray-50 border rounded"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">
                        {agent.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        ({agent.email})
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAgent(agent._id)}
                      className="p-1 text-red-500 transition rounded hover:bg-red-100"
                      title="Delete Agent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {agents.length === 0 && (
                  <p className="text-xs text-gray-400">No agents found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
          <FileText className="w-5 h-5 mr-2 text-purple-600" />
          Distributed Leads ({leads.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-600 border-b bg-gray-50">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Notes</th>
                <th className="p-3">Assigned Agent</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{lead.firstName}</td>
                  <td className="p-3 font-mono text-sm">{lead.phone}</td>
                  <td className="p-3 text-sm text-gray-500">{lead.notes}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.assignedTo
                          ? "text-blue-800 bg-blue-100"
                          : "text-red-800 bg-red-100"
                      }`}
                    >
                      {lead.assignedTo?.name || "Unassigned"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      {lead.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteLead(lead._id)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};;

export default AdminPanel;
