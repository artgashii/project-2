const router = require("express").Router();
const { updateStatus, getTasksByStatus } = require("../corntrollers/status");

router.put("/", updateStatus);
router.get("/:status", getTasksByStatus);

module.exports = router;
