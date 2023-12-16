const router = require("express").Router();
const {
  assignTask,
  updateTaskDetails,
  deleteTask,
  getTasks,
  getUsersByTask,
  createTasks,
} = require("../corntrollers/tasks");

router.put("/", assignTask);
router.put("/update", updateTaskDetails);
router.delete("/", deleteTask);
router.post("/", createTasks);
router.get("/", getTasks);
router.get("/get/:task_name", getUsersByTask);

module.exports = router;
