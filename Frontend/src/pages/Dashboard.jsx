import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import AdminPanel from "../components/AdminPanel";
import AgentPanel from "../components/AgentPanel";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
    
        {user?.role === "admin" ? <AdminPanel /> : <AgentPanel />}
      </main>
    </div>
  );
};

export default Dashboard;
