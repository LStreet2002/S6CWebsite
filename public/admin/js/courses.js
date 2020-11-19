var newt = [];
var courseNameInput = document.getElementsByClassName("courseNameInput")[0];
var qualificationInput = document.getElementsByClassName("qualificationInput")[0];
var examInput = document.getElementsByClassName("examInput")[0];
var entryInput = document.getElementsByClassName("examInput")[0];
var assessmentInput = document.getElementsByClassName("examInput")[0];
var descriptionInput = document.getElementsByClassName("examInput")[0];
var saveButton = document.getElementsByClassName("saveButton")[0];
var page = document.getElementsByTagName("title")[0].className;

async function addCourse() {
    var input = document.getElementsByClassName("addCourseInput")[0].value;
    var titl = input.toLowerCase();
    await db.collection(page).doc(titl).set({
        pageName: input,
    });
    location.reload();
}