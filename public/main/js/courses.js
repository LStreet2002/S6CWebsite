window.addEventListener("DOMContentLoaded", function () {
	getDatabase();
	getPages();
	listadd()
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
async function listadd() {
	const ref = db.collection("courses");
	const snapshot = await ref.get();
	snapshot.forEach((doc) => {
		//Course title
		var courseId = document.createElement("a");
		courseId.innerHTML = doc.data().pageName + "<br>";
		courseId.href = "/course?page=" + doc.data().pageName.toLowerCase();
		//Add course div to page
		document.getElementById("searchblob").appendChild(courseId);
	});
}
var searchBox = document.querySelector(".search");
events = ["keyup", "focus", "blur"];
events.forEach((event) => {
	switch (event) {
		case "keyup":
			//SEARCH FUNCTION
			searchBox.addEventListener("keyup", function () {
				var input = document.querySelector(".search");
				var filter = input.value.toUpperCase();
				var ul = document.getElementById("searchblob");
				var li = ul.getElementsByTagName("a");

				for (i = 0; i < li.length; i++) {
					//LOOPS THROUGH ALL TEXT VALUES
					var txtValue = li[i].innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						li[i].style.display = "";
					} else {
						li[i].style.display = "none";
					}
				}
			});
		case "blur":
			searchBox.addEventListener("blur", function () {
				setTimeout(() => {
					document.querySelector("#searchblob").style.display = "none";
				}, 600);
				searchBox.value = "";
			});
		case "focus":
			searchBox.addEventListener("focus", function () {
				document.querySelector("#searchblob").style.display = "block";
			});
	}
});
