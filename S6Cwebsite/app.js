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
  if (req.url == "/") {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.sendFile(__dirname + "/" + req.url.split(".")[0] + ".html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
