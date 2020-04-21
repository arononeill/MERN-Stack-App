// Various programs needed to exexecute asynchornous data consumption from REST API
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();

// BodyParser Middleware
app.use(express.json());
// Database Configuration
const db = config.get("mongoURI");

//Connect to MongoDB Atlas
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo Connected..."))
  .catch((err) => console.log(err));

// Use Routes required by the app
app.use("/api/contacts", require("./routes/api/contacts"));
app.use("/api/tradespeople", require("./routes/api/tradespeople"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/editUser", require("./routes/api/editUser"));

// Serve static assests if in production (Heroku Development Purposes)
if (process.env.NODE_ENV === "production") {
  // Set static Folder
  app.use(express.static(""));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Assign server to listen on port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
