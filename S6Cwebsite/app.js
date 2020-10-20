const express = require("express"),
  bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("*", (req, res) => {
  if (req.url == "/") {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.sendFile(__dirname + "/" + req.url.split(".")[0] + ".html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
