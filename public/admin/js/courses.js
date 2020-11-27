var newt = [];
var courseNameInput = document.getElementsByClassName("courseName")[0];
var qualificationInput = document.getElementsByClassName("qualification")[0];
var examInput = document.getElementsByClassName("examBoard")[0];
var entryInput = document.getElementsByClassName("entryInput")[0];
var assessmentInput = document.getElementsByClassName("assessmentInput")[0];
var descriptionInput = document.getElementsByClassName("descriptionInput")[0];
var saveButton = document.getElementsByClassName("saveButton")[0];
var pageName = document.getElementsByClassName("pageNameInput")[0];
var courseImage = document.getElementsByClassName("courseImage")[0];
var loading = document.getElementsByClassName("loading")[0];
var file = document.getElementsByClassName("file")[0];

window.addEventListener("DOMContentLoaded", function () {
  getDatabase();
});

async function getDatabase() {
  await db
    .collection("courses")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newt.push(doc.data());
      });
      var bodyDiv = document.getElementsByClassName("courselist")[0];
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
          sections = [doc.qualification, doc.examBoard];
          try {
            sections.forEach(function (section) {
              document.getElementById(section).checked = true;
              courseImage.setAttribute("src", doc.courseImage);
            });
          } catch {
            console.log("ignore this it's just a new page");
          }
          pageName.innerText = doc.pageName;
          entryInput.value = doc.entry;
          assessmentInput.value = doc.assessments;
          descriptionInput.value = doc.description;
          saveButton.innerHTML = "Save:" + doc.pageName;
          document.querySelector(".editcourse").style.display = "block";
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
  qualification = getRadioButtons()[0];
  examBoard = getRadioButtons()[1];
  if (qualification != null && examBoard != null) {
    await db
      .collection("courses")
      .doc(pageName.innerText.toLowerCase())
      .delete();
  }
  let image = file.files[0];
  let fileName = Date.now();
  var uploadTask = firebase
    .storage()
    .ref()
    .child("images/" + fileName)
    .put(image);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      loading.innerHTML = "Uploading: " + progress + "%";
      switch (snapshot.state) {
        case firebase.storage().TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage().TaskState.RUNNING: // or 'running'
          console.log("Upload is running");

          break;
      }
    },
    function (error) {
      // Handle unsuccessful uploads
    },
    function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasefirebase.storage().googleapis.com/...
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(async function (downloadURL) {
          console.log("File available at", downloadURL);
          await db
            .collection("courses")
            .doc(pageName.innerText.toLowerCase())
            .set({
              pageName: pageName.innerText,
              courseImage: downloadURL,
              qualification: qualification,
              examBoard: examBoard,
              entry: entryInput.value,
              assessment: assessmentInput.value,
              description: descriptionInput.value,
            });
          location.reload();
        });
    }
  );
}
async function getDoc(url) {
  const docRef = db.collection("courses").doc(url);
  const doc = await docRef.get();
  if (doc.exists) {
    return doc.data();
  }
}
async function addCourse() {
  var input = document.getElementsByClassName("addCourseInput")[0].value;
  var titl = input.toLowerCase();
  await db.collection("courses").doc(titl).set({
    pageName: input,
  });
  location.reload();
}
function getRadioButtons() {
  radioButtons = [];
  sections = ["qualification", "examBoard"];
  sections.forEach(function (section) {
    for (radio = 0; radio < 4; radio++) {
      if (document.getElementsByClassName(section)[radio].checked) {
        radioButtons.push(
          document.getElementsByClassName(section)[radio].value
        );
      }
    }
  });
  return radioButtons;
}
async function deletePage() {
  await db
    .collection("courses")
    .doc(pageName.innerText.toLowerCase())
    .delete()
    .then(() => {
      location.reload();
    });
}
