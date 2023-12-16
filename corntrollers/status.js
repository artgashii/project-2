const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const updateStatus = async (req, res) => {
  try {
    const { task_name, new_status } = req.body;
    const statusOptions = [
      "todo",
      "in_progrers",
      "blocked",
      "in_review",
      "done",
    ];

    if (!statusOptions.includes(new_status)) {
      console.log("Status option is invalid");
      return res.status(400).json({ error: "Status option is invalid" });
    }
    const task = await prisma.tasks.findUnique({
      where: {
        task_name,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    let taskStatus = await prisma.task_status.findFirst({
      where: {
        taskId: task.id,
      },
    });

    if (!taskStatus) {
      return res.status(404).json({ error: "Task status not found" });
    }

    taskStatus = await prisma.task_status.update({
      where: {
        id: taskStatus.id,
      },
      data: {
        status: new_status,
      },
    });

    res.json(taskStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    console.log("Status:", status);

    const tasks = await prisma.task_status.findMany({
      where: {
        status: status,
      },
      include: {
        task: {
          select: {
            id: true,
            task_name: true,
            description: true,
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

module.exports = { updateStatus, getTasksByStatus };
