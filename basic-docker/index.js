const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", require("./src/route"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
