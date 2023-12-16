const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { full_name, role, email } = req.body;

    if (role !== "administrator" && role !== "employee") {
      return res.status(400).json({ error: "Role is invalid" });
    }
    const user = await prisma.users.create({
      data: {
        full_name,
        role,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const updateUser = async (req, res) => {
  try {
    const { full_name, email, new_name, new_email, new_role } = req.body;
    if (!full_name && !email) {
      return res.status(404).send("User not found");
    }

    const userToUpdate = await prisma.users.findUnique({
      where: {
        full_name,
        email,
      },
    });

    const updatedUser = await prisma.users.update({
      where: {
        id: userToUpdate.id,
      },
      data: {
        full_name: new_name || userToUpdate.full_name,
        email: new_email || userToUpdate.email,
        role: new_role || userToUpdate.role,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const viewTasksByUser = async (req, res) => {
  const { full_name, email } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        full_name,
        email,
      },
      include: {
        tasks: true,
      },
    });

    res.json(user.tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const deletUser = async (req, res) => {
  try {
    const { full_name, email } = req.body;
    const deleteUser = await prisma.users.delete({
      where: {
        full_name,
        email,
      },
    });
    res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  createUser,
  deletUser,
  viewTasksByUser,
  updateUser,
};
