import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b shadow-sm">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-md">
            <FaTasks className="text-lg" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              TaskFlow
            </h1>
            <p className="text-xs text-gray-500">
              Smart Task Manager
            </p>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Welcome badge */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border">
            <span className="text-sm">👋</span>
            <span className="text-sm text-gray-600">
              Welcome back
            </span>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-xl shadow-md transition pointer"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;