const express = require("express"),
  bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.engine('.hbs', exphbs({
  exphbsdefaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

const admin = require('firebase-admin');

const serviceAccount = require('./s6c-website-firebase-adminsdk-58r86-6263a6723f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getDoc(url) {
  const docRef = db.collection('infoTabs').doc("test");
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log("its there")
    return (doc.data())
  }
}

app.get("*", (req, res) => {
  async function go() {
    if (req.url.split("/")[1] == "info") {
      data = await getDoc(req.url.split("/")[2])
      res.render("main.hbs", data)
    } else if (req.url == "/") {
      res.sendFile(__dirname + "/index.html");
    } else {
      res.sendFile(__dirname + "/" + req.url.split(".")[0] + ".html");
    }
  }
  go()
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
