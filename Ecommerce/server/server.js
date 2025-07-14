require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const initRouter = require("./src/router");
const connectData = require("./connectionData");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initRouter(app);

connectData();

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${server.address().port}`);
});
