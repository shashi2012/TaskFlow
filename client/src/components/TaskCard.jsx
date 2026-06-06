import { FaTrash, FaCheck } from "react-icons/fa";

const TaskCard = ({ task, onDelete, onComplete }) => {
  const isDone = task.status === "completed";

  return (
    <div
      className={`p-5 rounded-2xl border shadow-sm transition hover:shadow-lg backdrop-blur
      ${isDone ? "bg-green-50/60" : "bg-white/80"}`}
    >

      {/* Title */}
      <h3
        className={`font-bold text-lg ${
          isDone ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 mt-2 text-sm">
        {task.description || "No description"}
      </p>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-5">

        {/* Status */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold transition
            ${
              isDone
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
        >
          {isDone ? "✔ Done" : "⏳ Pending"}
        </span>

        {/* Buttons */}
        <div className="flex gap-2">

          {/* Complete */}
          <button
            onClick={() => onComplete(task._id)}
            disabled={isDone}
            className={`p-2 rounded-lg transition
              ${
                isDone
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
          >
            <FaCheck />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition hover:scale-105"
          >
            <FaTrash />
          </button>

        </div>
      </div>
    </div>
  );
};

export default TaskCard;