import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, {
      status:"completed",
    });
    fetchTasks();
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status !== "completed").length;
  

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

    <Navbar />

    <div className="max-w-6xl mx-auto p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Manage your tasks beautifully
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white/70 backdrop-blur shadow rounded-2xl p-4 border">
          <h2 className="text-gray-500 text-sm">Total</h2>
          <p className="text-2xl font-bold text-indigo-600">{total}</p>
        </div>

        <div className="bg-white/70 backdrop-blur shadow rounded-2xl p-4 border">
          <h2 className="text-gray-500 text-sm">Completed</h2>
          <p className="text-2xl font-bold text-green-600">{done}</p>
        </div>

        <div className="bg-white/70 backdrop-blur shadow rounded-2xl p-4 border">
          <h2 className="text-gray-500 text-sm">Pending</h2>
          <p className="text-2xl font-bold text-orange-500">{pending}</p>
        </div>

      </div>

      {/* TASKS SECTION (NOW FIRST) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No tasks yet 🚀</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onComplete={completeTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* TASK FORM (NOW SMALL + CLEAN + BELOW) */}
      <div className="bg-white/80 backdrop-blur p-4 md:p-5 rounded-2xl shadow border">

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          ✨ Quick Add Task
        </h2>

        <form onSubmit={createTask} className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
          >
            {loading ? "..." : "Add"}
          </button>

        </form>
      </div>

    </div>
  </div>
);
};

export default Dashboard;