const express = require("express");
const app = express();

//Importing the route files
const contacts = require("./routes/contacts");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to ContactKeeper API" });
});

//Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
