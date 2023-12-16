require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const userRouter = require("./routers/users");
app.use("/user", userRouter);
const taskRouter = require("./routers/tasks");
app.use("/task", taskRouter);
const statusRouter = require("./routers/status");
app.use("/status", statusRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
