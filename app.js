const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
const admin = require("firebase-admin");

const serviceAccount = require("./s6c-website-firebase-adminsdk-58r86-6263a6723f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("*", (req, res) => {
  req.url = req.url.toLowerCase();
  if (req.url == "/") {
    res.sendFile(__dirname + "/index.html");
  } else if (req.url.split("?")[0] == "/information") {
    res.sendFile(__dirname + "/information.html", req.url.split("?")[1]);
  } else {
    res.sendFile(__dirname + "/" + req.url.split(".")[0] + ".html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
