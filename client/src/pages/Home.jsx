import { Link } from "react-router-dom";
import { FaTasks, FaLock, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Organize Your Tasks
          <span className="text-blue-600"> Efficiently</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          TaskFlow helps you manage your daily tasks, track
          progress, and stay productive with a simple and secure
          task management system.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow">
            <FaTasks className="text-blue-600 text-4xl mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Task Management
            </h3>

            <p className="text-gray-600">
              Create, update, complete, and delete tasks easily.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <FaLock className="text-green-600 text-4xl mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Secure Authentication
            </h3>

            <p className="text-gray-600">
              JWT-based authentication keeps your tasks private.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <FaCheckCircle className="text-purple-600 text-4xl mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Track Progress
            </h3>

            <p className="text-gray-600">
              Mark tasks as completed and stay organized.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                1
              </div>

              <h3 className="font-semibold mt-4">
                Create Account
              </h3>

              <p className="text-gray-600 mt-2">
                Register and securely login to your account.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                2
              </div>

              <h3 className="font-semibold mt-4">
                Add Tasks
              </h3>

              <p className="text-gray-600 mt-2">
                Create tasks with title and description.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                3
              </div>

              <h3 className="font-semibold mt-4">
                Stay Productive
              </h3>

              <p className="text-gray-600 mt-2">
                Complete tasks and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-6 text-center">
        <p>© 2026 TaskFlow. Built with React, Node.js & MongoDB.</p>
      </footer>
    </div>
  );
};

export default Home;