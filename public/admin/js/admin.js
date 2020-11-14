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
          window.location.replace("menu");
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
