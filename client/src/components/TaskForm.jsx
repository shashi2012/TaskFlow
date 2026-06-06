import { useState } from "react";

const TaskForm = ({ onCreate, loading = false }) => {
  const [title, setTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreate({ title });

    setTitle("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex items-center gap-2 bg-white border shadow-sm p-2 rounded-xl mb-6"
    >

      {/* Input */}
      <input
        type="text"
        placeholder="✍️ Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 text-sm outline-none"
      />

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        {loading ? "..." : "Add"}
      </button>

    </form>
  );
};

export default TaskForm;