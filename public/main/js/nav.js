var tabs = ["infoTabs", "studyTabs"];
async function getPages() {
  pages = [];
  for (var i = 0; i < 2; i++) {
    const collection = db.collection(tabs[i]);
    const snapshot = await collection.get();
    snapshot.forEach((doc) => {
      pages.push([doc.data().pageName, tabs[i]]);
      newListItem = document.createElement("li");
      newListItem.innerText = doc.data().pageName;
      document.getElementsByClassName("page")[i];
      newListItem.collection = tabs[i];
      newListItem.addEventListener("click", function () {
        window.location =
          "information?page=" +
          this.innerText.toLowerCase() +
          "&collection=" +
          this.collection;
      });
      newListItem.style.cursor = "pointer";
      document.getElementById(tabs[i]).appendChild(newListItem);
    });
    await db.collection("apply").doc("appli").get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().status == "off") {
          document.querySelector(".apply-btn").style.display = "none"
        }
        else {
          document.querySelector(".apply-btn").style.display = "block"
        }
      }
    })
  }
  document.body.style.opacity = "100";
}


