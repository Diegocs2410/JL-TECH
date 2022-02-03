// express server
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// DB
const connectDB = require("./db");
// Public folder
app.use("/public", express.static(__dirname + "/public"));
// Routes like documentation from algolia
app.use("/api/v1/users", require("./routes/user.route"));
app.use("/api/v1/clients", require("./routes/client.route"));
// Port
const PORT = process.env.PORT || 4000;

// Start server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
