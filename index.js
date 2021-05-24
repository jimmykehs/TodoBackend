require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

const { client } = require("./db");
client.connect();

app.use(express.json());

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});
app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
