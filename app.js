const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["hiiii"],
  })
);
var dir = __dirname + "/pages";

const serviceAccount = require("./s6c-website-firebase-adminsdk-58r86-6263a6723f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});
app.post("/adminLogin", (req, res) => {
  var idToken = req.body.idToken;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      var idToken = req.body.idToken.toString();
      // Set session expiration to 5 days.
      const expiresIn = 60 * 60 * 1000;
      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.
      admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
          (sessionCookie) => {
            // Set cookie policy for session cookie.
            const options = {
              maxAge: expiresIn,
              httpOnly: false,
              secure: false,
            };
            res.cookie("session", sessionCookie, options);
            res.send(JSON.stringify({ status: "success" }));
          },
          (error) => {
            res.sendFile(dir + "/adminLogin.html");
          }
        );
    })
    .catch(function (error) {
      // Handle error
    });
});
var pages = [
  "/menu",
  "/editInfo",
  "/editCourses",
  "/editStudy",
  "/editPB",
  "/editHome",
];
app.get(pages, (req, res) => {
  var sessionCookie = req.cookies.session || " ";
  if (!req.cookies.session) {
    res.sendFile(dir + "/adminLogin.html");
    return;
  }
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      res.sendFile(dir + req.url + ".html");
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.sendFile(dir + "/adminLogin.html");
      console.log(error);
    });
});

app.get("*", (req, res) => {
  if (req.url == "/") {
    res.sendFile(dir + "/index.html");
  } else if (req.url.split("?")[0] == "/information") {
    res.sendFile(dir + "/information.html", req.url.split("?")[1]);
  } else if (req.url.split("?")[0] == "/course") {
    res.sendFile(dir + "/course.html", req.url.split("?")[1]);
  } else {
    res.sendFile(dir + "/" + req.url.split(".")[0] + ".html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
