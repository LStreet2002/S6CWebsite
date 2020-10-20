const express = require("express"),
  bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

//app.set('view engine', 'hbs')

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/adminLogin.html');
});
app.get("/menu", (req, res) => {
  res.sendFile(__dirname + '/menu.html');
});
app.get("/edit-info", (req, res) => {
  res.sendFile(__dirname + '/editInfo.html');
});
app.get("/edit-home", (req, res) => {
  res.sendFile(__dirname + '/editHome.html');
});
app.get("/edit-study", (req, res) => {
  res.sendFile(__dirname + '/editStudy.html');
});
app.get("/edit-courses", (req, res) => {
  res.sendFile(__dirname + '/editCourses.html');
});
app.get("/edit-PB", (req, res) => {
  res.sendFile(__dirname + "/editPB.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
