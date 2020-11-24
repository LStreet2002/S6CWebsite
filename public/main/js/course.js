const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get("page");

window.addEventListener("DOMContentLoaded", function () {
	getDatabase();
	getPages();
});

async function getDatabase() {
	await db
		.collection("courses")
		.get()
		.then((doc = await getDoc(page)));
	document.querySelector(".banner").innerText = doc.pageName.toUpperCase();

	for (i in doc) {
		console.log(i);
		if (i == "courseImage") {
			document.getElementById("topper").style.backgroundImage =
				"url(" + doc[i] + ")";
		} else if (i == "pageName") {
			document.getElementsByClassName("pageName")[0].innerHTML =
				doc.pageName;
		} else {
			document.getElementsByClassName(i)[0].innerHTML =
				"<p>" + doc[i] + "</p>";
		}
	}
}
async function getDoc(url) {
	const docRef = db.collection("courses").doc(url);
	const doc = await docRef.get();
	if (doc.exists) {
		return doc.data();
	}
}
