var newt = [];
var courseNameInput = document.getElementsByClassName("courseNameInput")[0];
var qualificationInput = document.getElementsByClassName("qualificationInput")[0];
var examInput = document.getElementsByClassName("examInput")[0];
var entryInput = document.getElementsByClassName("examInput")[0];
var assessmentInput = document.getElementsByClassName("examInput")[0];
var descriptionInput = document.getElementsByClassName("examInput")[0];
var saveButton = document.getElementsByClassName("saveButton")[0];
var page = document.getElementsByTagName("title")[0].className;

async function getFiles() {
    await db.collection("courses")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                carouse.push(doc.data())

            })
        })
}

db.collection("courses").doc("biology").update({
    name: document.querySelector("#editnews").value
})
