const router = require("express").Router();
const {
  createUser,
  deletUser,
  viewTasksByUser,
  updateUser,
} = require("../corntrollers/users");

router.post("/", createUser);
router.delete("/", deletUser);
router.get("/:full_name/:email", viewTasksByUser);
router.put("/", updateUser);

module.exports = router;
