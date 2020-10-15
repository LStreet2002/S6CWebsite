const express = require("express"),
  bodyParser = require("body-parser");
const app = express();
const port = 3000;
var fs = require("fs");
app.use(express.static("admin"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/adminLogin.html");
});
app.get("/menu", (req, res) => {
  res.sendFile(__dirname + "/menu.html");
});
app.get("/edit-courses", (req, res) => {
  res.sendFile(__dirname + "/editCourses.html");
});
app.get("/edit-home", (req, res) => {
  res.sendFile(__dirname + "/editHome.html");
});
app.get("/edit-info", (req, res) => {
  var fileList = [];
  fs.readdirSync("infoTabs/").forEach((file) => {
    fileList.push(file);
  });
  console.log(fileList);
  res.sendFile(__dirname + "/editInfo.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  fs.writeFile("infoTabs/" + req.body["file"] + ".html", "", function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
});

app.get("/edit-study", (req, res) => {
  res.sendFile(__dirname + "/editStudy.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
