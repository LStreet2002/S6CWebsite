firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    (function () {
      const loginHolder = document.querySelector("#login-holder");
      loginHolder.addEventListener("submit", (e) => {
        e.preventDefault(); //enter button
        console.log("did");

        const email = loginHolder["login-email"].value;
        const password = loginHolder["login-password"].value;

        // firebase login
        auth
          .signInWithEmailAndPassword(email, password)
          .then((cred) => {
            document.querySelector("#login-email").style.border =
              "solid 1px green";
            window.location.replace("menu");
          })
          .catch(
            (error) =>
              (document.querySelector("#login-password").style.border =
                "solid 1px red"),
            (document.querySelector("#login-email").style.border =
              "solid 1px red")
          ),
          console.log(email),
          console.log(password);
      });
    })();
  });
