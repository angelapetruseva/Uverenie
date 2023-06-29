const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(express.static("public/student"));

app.listen(3001, () => {
  console.log("App is running on http://localhost:3001");
});

//Error pages:
app.get("/index.html", (req, res) => {
  res.sendStatus(404);
});
app.get("/index.js", (req, res) => {
  res.sendStatus(404);
});
app.get("/style.css", (req, res) => {
  res.sendStatus(404);
});
app.get("/ugd-logo.png", (req, res) => {
  res.sendStatus(404);
});
app.get("/header.png", (req, res) => {
  res.sendStatus(404);
});
app.get("/uverenie", (req, res) => {
  res.sendStatus(404);
});
app.get("/uverenie/index.html", (req, res) => {
  res.sendStatus(404);
});
app.get("/grb.png", (req, res) => {
  res.sendStatus(404);
});