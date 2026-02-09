import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">LeadDistributor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium capitalize">
                {user?.name} ({user?.role})
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
