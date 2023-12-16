const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTasks = async (req, res) => {
  try {
    const { task_name, description } = req.body;
    const task = await prisma.tasks.create({
      data: {
        task_name,
        description,
        task_status: {
          create: {
            status: "todo",
          },
        },
      },
    });
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};
const assignTask = async (req, res) => {
  try {
    const { full_name, task_name, email } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        full_name,
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = await prisma.tasks.findUnique({
      where: {
        task_name,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const assignedTask = await prisma.userTask.create({
      data: {
        userId: user.id,
        taskId: task.id,
      },
    });

    res.json(assignedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const updateTaskDetails = async (req, res) => {
  try {
    const { task_name, new_task_name, new_description } = req.body;

    const task = await prisma.tasks.findUnique({
      where: {
        task_name,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: {
        task_name: new_task_name || task.task_name,
        description: new_description || task.description,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task_name } = req.body;
    const task = await prisma.tasks.findUnique({
      where: {
        task_name,
      },
    });
    await prisma.task_status.deleteMany({
      where: {
        taskId: task.id,
      },
    });
    const deletedTask = await prisma.tasks.delete({
      where: {
        id: task.id,
      },
    });

    res.json(deletedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const getTasks = async (req, res) => {
  try {
    console.log(req.tasks);
    const tasks = await prisma.tasks.findMany();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};
const getUsersByTask = async (req, res) => {
  const { task_name } = req.params;

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        task_name,
      },
    });
    const usertask = await prisma.userTask.findMany({
      where: {
        taskId: task.id,
      },
    });
    const user = await prisma.users.findMany({
      where: {
        id: usertask.id,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  assignTask,
  updateTaskDetails,
  deleteTask,
  getTasks,
  getUsersByTask,
  createTasks,
};
