import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        `/tasks?search=${search}&status=${status}&page=${page}&limit=6`
      );

      setTasks(data.tasks);
      setPages(data.pages);

      // USE BACKEND STATS (IMPORTANT FIX)
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status, page]);

  // CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      setPage(1);

      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE STATUS (IMPORTANT FIX)
  const toggleTask = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500">
            Organize and track your tasks efficiently
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow border">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h2 className="text-3xl font-bold text-indigo-600">
              {stats.total}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow border">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.completed}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow border">
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-orange-500">
              {stats.pending}
            </h2>
          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow border mb-6">

          <div className="flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

          </div>
        </div>

        {/* TASKS */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow border">
              <p className="text-gray-500">No tasks found 🚀</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          )}

        </div>

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="flex justify-center items-center gap-3 mb-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-xl bg-white border shadow disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium text-gray-700">
              Page {page} of {pages}
            </span>

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}

        {/* ADD TASK */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow border">

          <h2 className="text-lg font-semibold mb-4">
            ✨ Quick Add Task
          </h2>

          <form
            onSubmit={createTask}
            className="flex flex-col md:flex-row gap-3"
          >

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 rounded-xl"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;