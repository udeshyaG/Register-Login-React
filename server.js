const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

//Importing the route files
const contacts = require("./routes/contacts");
const users = require("./routes/users");
const auth = require("./routes/auth");

//Connect To DataBase
connectDB();

//Init Middleware
app.use(express.json());

//Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

//Serve static assets in production (React)
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
