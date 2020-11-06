var newt = [];
var pageNameInput = document.getElementsByClassName("pageNameInput")[0];
var headerInput = document.getElementsByClassName("headerInput")[0];
var contentInput = document.getElementsByClassName("contentInput")[0];
var updateButton = document.getElementsByClassName("updateButton")[0];
async function addTab() {
  var input = document.getElementsByClassName("addTabInput")[0].value;
  var titl = input.toLowerCase();
  await db.collection("infoTabs").doc(titl).set({
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
        var listItem = document.createElement("h2");
        listItem.innerHTML = newt[i]["pageName"];
        // div
        var child = document.createElement("div");
        child.className = "listItem";
        // Edit button
        var editButton = document.createElement("span");
        editButton.name = newt[i]["pageName"];
        editButton.classList.add("editor", "material-icons");
        editButton.innerHTML = "edit";
        editButton.addEventListener("click", async function () {
          doc = await getDoc(this.name.toLowerCase());
          pageNameInput.innerText = doc.pageName;
          contentInput.value = doc.main;
          updateButton.innerHTML = "Update page:" + doc.pageName;
          document.querySelector(".edit").style.display = "block";
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
    .doc(pageNameInput.innerText.toLowerCase())
    .delete()
    .then(async function () {
      await db
        .collection("infoTabs")
        .doc(pageNameInput.innerText.toLowerCase())
        .set({
          pageName: pageNameInput.innerText,
          main: contentInput.value,
        });
    })

    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
  location.reload();
}

async function deletePage() {
  await db.collection("infoTabs").doc(pageNameInput.innerHTML).delete();
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
  for (i = 0; i < document.getElementsByClassName("buttons").length; i++) {
    document
      .getElementsByClassName("buttons")
      [i].addEventListener("click", function () {
        document.querySelector(".contentInput").focus();
        switch (this.classList[1]) {
          case "1":
            typeInTextarea("<b></b>\n");
            break;
          case "2":
            typeInTextarea("<br>\n");
            break;
        }
      });
  }
});

function typeInTextarea(newText, el = document.activeElement) {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = el.value;
  const before = text.substring(0, start);
  const after = text.substring(end, text.length);
  el.value = before + newText + after;
  el.selectionStart = el.selectionEnd = start + newText.length;
  el.focus();
}
