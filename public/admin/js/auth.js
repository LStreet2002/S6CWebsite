firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.body.style.opacity = "100";
  } else {
    window.location.replace("adminLogin");
  }
});
