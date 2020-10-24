var newt = [];
var pageNameInput = document.getElementsByClassName("pageNameInput")[0];
var headerInput = document.getElementsByClassName("headerInput")[0];
var contentInput = document.getElementsByClassName("contentInput")[0];
var updateButton = document.getElementsByClassName("updateButton")[0];
async function addTab() {
  var input = document.getElementsByClassName("addTabInput")[0].value;
  await db.collection("infoTabs").doc(input).set({
    pageName: input,
  });
  location.reload();
}

async function getDatabase() {
  await db
    .collection("infoTabs")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newt.push(doc.data());
      });
      var bodyDiv = document.getElementsByClassName("body")[0];
      for (i = 0; i < newt.length; i++) {
        // List item
        var listItem = document.createElement("li");
        listItem.innerHTML = newt[i]["pageName"];
        // div
        var child = document.createElement("div");
        child.className = "listItem";
        // Edit button
        var editButton = document.createElement("button");
        editButton.className = newt[i]["pageName"];
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", async function () {
          doc = await getDoc(this.className);
          pageNameInput.value = doc.pageName;
          headerInput.value = doc.header;
          contentInput.value = doc.main;
          updateButton.innerHTML = "Update page:" + doc.pageName;
          updateButton.className = "updateButton " + doc.pageName;
        });
        // Add to div
        child.appendChild(listItem);
        child.appendChild(editButton);
        bodyDiv.appendChild(child);
        console.log(newt[i]["pageName"]);
      }
    });
}

async function updatePage() {
  await db
    .collection("infoTabs")
    .doc(updateButton.classList[1])
    .delete()
    .then(async function () {
      await db.collection("infoTabs").doc(pageNameInput.value).set({
        pageName: pageNameInput.value,
        header: headerInput.value,
        main: contentInput.value,
      });
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
  location.reload();
}

async function deletePage() {
  await db.collection("infoTabs").doc(updateButton.classList[1]).delete();
  location.reload();
}

async function getDoc(url) {
  const docRef = db.collection("infoTabs").doc(url);
  const doc = await docRef.get();
  if (doc.exists) {
    return doc.data();
  }
}

window.addEventListener("DOMContentLoaded", function () {
  getDatabase();
});
