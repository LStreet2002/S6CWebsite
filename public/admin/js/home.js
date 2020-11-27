var carouse = [];
var lonk = [];
var newt = [];
var nstatus = "";
var astatus = "";

document.addEventListener("DOMContentLoaded", async function init() {
	carousels();
	links();
	news();
	applys();
});

async function carousels() {
	await db
		.collection("carousels")
		.get()
		.then(async function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				carouse.push(doc.data());
			});
			for (i = 0; i < carouse.length; i++) {
				var box = document.createElement("div");
				box.classList.add("caropic");
				var name = document.createElement("p");
				name.innerText = carouse[i].file;
				name.setAttribute("value", carouse[i].file);
				name.classList.add("file");
				name.id = "link" + (i + 1);
				var upl = document.createElement("div");
				upl.classList.add("upload");
				upl.innerText = "Upload";
				upl.setAttribute("onclick", "getting(this)");
				var image = document.createElement("input");
				image.classList.add("unknown");
				image.classList.add("imglink" + (i + 1));
				image.style.display = "none";
				image.type = "file";
				image.accept = ".png,.jpg,.gif,.tif,.webp";

				box.appendChild(name);
				box.appendChild(upl);
				box.appendChild(image);

				document.querySelector("#carousel").appendChild(box);
			}
		});
}
async function links() {
	await db
		.collection("links")
		.get()
		.then(async function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				lonk.push(doc.data());
			});
			document.querySelector("#tlink").value = lonk[2].name;
			document.querySelector("#flink").value = lonk[0].name;
			document.querySelector("#ilink").value = lonk[1].name;
		});
}
async function news() {
	await db
		.collection("news")
		.get()
		.then(async function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				newt.push(doc.data());
				if (newt[0].status == "off") {
					document.querySelector("#activi").style.backgroundColor =
						"grey";
					document.querySelector("#activi").innerHTML =
						"NEWS INACTIVE";
				} else {
					document.querySelector("#activi").style.backgroundColor =
						"rgb(102, 51, 153)";
					document.querySelector("#activi").innerHTML = "NEWS ACTIVE";
				}
			});
			document.querySelector("#editnews").value = newt[0].name;
			nstatus = newt[0].status;
			document.getElementById("characters").innerHTML =
				document.getElementById("editnews").value.length +
				" Characters";
		});
}
async function applys() {
	await db
		.collection("apply")
		.doc("appli")
		.get()
		.then(function (doc) {
			if (doc.exists) {
				if (doc.data().status == "off") {
					document.querySelector("#activi2").style.backgroundColor =
						"grey";
					document.querySelector("#activi2").innerHTML =
						"APPLICATIONS INACTIVE";
				} else {
					document.querySelector("#activi2").style.backgroundColor =
						"rgb(102, 51, 153)";
					document.querySelector("#activi2").innerHTML =
						"APPLICATIONS ACTIVE";
				}

				astatus = doc.data().status;
			}
		});
}
var saver = document.querySelector("#save");
saver.addEventListener("click", function () {
	(saver.style.backgroundColor = "green"), (saver.innerHTML = "SAVING...");
});

async function save() {
	var storage = await firebase.storage();

	// Create a storage reference from our storage service
	db.collection("news")
		.doc("current")
		.update({
			name: document.querySelector("#editnews").value,
			status: nstatus,
		});
	db.collection("apply").doc("appli").update({
		status: astatus,
	});
	db.collection("links")
		.doc("facebook")
		.update({
			name: document.querySelector("#flink").value,
		});
	db.collection("links")
		.doc("twitter")
		.update({
			name: document.querySelector("#tlink").value,
		});
	db.collection("links")
		.doc("instagram")
		.update({
			name: document.querySelector("#ilink").value,
		});
	await yes();
}
async function yes() {
	var storageRef = storage.ref();
	for (let i = 1; i < 6; i++) {
		var newfile = document.querySelector("#link" + i);
		if (newfile.innerHTML == newfile.getAttribute("value")) {
		} else {
			try {
				let test = storageRef.child(
					"carousel/" + newfile.getAttribute("value")
				);
				test.delete();
			} catch (error) {
				console.log(error);
			}
			var filt = document.getElementsByClassName("imglink" + i)[0]
				.files[0];
			console.log(filt);
			let uploadTask = firebase.storage().ref("carousel/" + Date.now());

			uploadTask.put(filt).then(async function (snapshot) {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				await snapshot.ref
					.getDownloadURL()
					.then(async function (downloadURL) {
						console.log("File available at", downloadURL, i);
						await db
							.collection("carousels")
							.doc("link" + i)
							.set({
								file: document.getElementById("link" + i)
									.innerText,
								link: downloadURL,
							});
					});
			});
		}
	}
}
function getting(x) {
	var choicer = x.parentNode.querySelector(".unknown");
	choicer.click();
	choicer.addEventListener("change", function (e) {
		file = e.target.files[0];

		x.parentNode.querySelector(".file").innerHTML = file.name;
	});
}

document.getElementById("editnews").onkeyup = function () {
	document.getElementById("characters").innerHTML =
		this.value.length + " Characters";
};
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

var buttons = [
	[".boldit", "<b>Bold text here</b>"],
	[".headit", "<h3>Header text here</h3>"],
	[".breakit", "<br>"],
	[".linkit", "<a href='Link URL'>Text to click</a>"],
];
buttons.forEach((button) => {
	document.querySelector(button[0]).addEventListener("click", function () {
		document.querySelector("#editnews").focus();
		typeInTextarea(button[1]);
		document.getElementById("characters").innerHTML =
			document.getElementById("editnews").value.length + "Characters";
	});
});

function status() {
	if (nstatus == "off") {
		nstatus = "on";
		document.querySelector("#activi").style.backgroundColor =
			"rgb(102, 51, 153)";
		document.querySelector("#activi").innerHTML = "NEWS ACTIVE";
	} else {
		nstatus = "off";
		document.querySelector("#activi").style.backgroundColor = "grey";
		document.querySelector("#activi").innerHTML = "NEWS INACTIVE";
	}
}
function status2() {
	if (astatus == "off") {
		astatus = "on";
		document.querySelector("#activi2").style.backgroundColor =
			"rgb(102, 51, 153)";
		document.querySelector("#activi2").innerHTML = "APPLICATIONS ACTIVE";
	} else {
		astatus = "off";
		document.querySelector("#activi2").style.backgroundColor = "grey";
		document.querySelector("#activi2").innerHTML = "APPLICATIONS INACTIVE";
	}
}
