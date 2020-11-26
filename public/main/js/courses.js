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
		//Course title
		courseName = document.createElement("a");
		courseName.setAttribute(
			"href",
			"course?page=" + doc.data().pageName.toLowerCase()
		);
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
		//Add course div to page
		document.getElementById("courses").appendChild(courseDiv);
	});
}
