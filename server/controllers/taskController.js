const Task = require("../models/Task");

// @desc    Get logged in user's tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const keyword = req.query.search
      ? {
          title: {
            $regex: req.query.search.trim(),
            $options: "i",
          },
        }
      : {};

    const statusFilter =
      req.query.status && req.query.status !== "all"
        ? { status: req.query.status }
        : {};

    const query = {
      userId: req.user.id,
      ...keyword,
      ...statusFilter,
    };

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Dashboard stats
    const total = await Task.countDocuments({
      userId: req.user.id,
    });

    const completed = await Task.countDocuments({
      userId: req.user.id,
      status: "completed",
    });

    const pending = await Task.countDocuments({
      userId: req.user.id,
      status: "pending",
    });

    res.status(200).json({
      tasks,
      page,
      pages: Math.ceil(totalTasks / limit),
      totalTasks,
      stats: {
        total,
        completed,
        pending,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Please add a task title",
      });
    }

    const task = await Task.create({
      title,
      description: description || "",
      status: status || "pending",
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }

    if (req.body.status !== undefined) {
      task.status = req.body.status;
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};