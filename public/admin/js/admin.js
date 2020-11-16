firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    const loginHolder = document.querySelector("#login-holder");
    loginHolder.addEventListener("submit", (e) => {
      e.preventDefault(); //enter button
      console.log("did");
      const email = loginHolder["login-email"].value;
      const password = loginHolder["login-password"].value;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          document.querySelector("#login-email").style.border =
            "solid 1px green";
          return firebase
            .auth()
            .currentUser.getIdToken()
            .then((idToken) => {
              postToBack(idToken);
            });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          document.querySelector("#login-password").style.border =
            "solid 1px red";
          document.querySelector("#login-email").style.border = "solid 1px red";
        });
    });
  });
async function postToBack(idToken) {
  console.log(idToken);
  fetch("/adminLogin", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ idToken: idToken }),
  }).then((res) => {
    console.log("Request complete! response:", res);
    window.location.replace("menu");
  });
}
