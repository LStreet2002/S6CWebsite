window.addEventListener("DOMContentLoaded", function () {
	getDatabase();
	getPages();
});
async function getDatabase() {
	const ref = db.collection("courses");
	const snapshot = await ref.get();
	snapshot.forEach((doc) => {
		var courses = [];
		console.log(doc.data().pageName, doc.data().courseImage);
		var a = document.createElement("a");
		a.setAttribute(
			"href",
			"course?page=" + doc.data().pageName.toLowerCase()
		);
		//Course title
		courseName = document.createElement("a");
		courseName.innerHTML = doc.data().pageName;
		//Course image
		courseImage = document.createElement("img");
		courseImage.setAttribute("src", doc.data().courseImage);
		//Course div
		courseDiv = document.createElement("div");
		courseDiv.classList.add("course");
		//Add to array
		courses.push(courseName);
		courses.push(courseImage);
		//Add to course div
		courses.forEach((element) => {
			courseDiv.appendChild(element);
		});
		a.appendChild(courseDiv);
		//Add course div to page
		document.getElementById("courses").appendChild(a);
	});
}
