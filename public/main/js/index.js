var bloggit = [];
var hold = [];
var thecount = 0;
var slideIndex = 0;
var slides = document.getElementsByClassName("carosimg");
var texas = document.getElementsByClassName("cartext");
var imgCar = document.getElementsByClassName("imgCar")[0];
var noticeBox = document.getElementsByClassName("notice")[0];
var closeButton = document.getElementById("closeNotice");
var searchBox = document.querySelector(".search");
var cartext = [
	"IT'S ALL ABOUT YOU",
	"IT'S ALL ABOUT YOU",
	"IT'S ALL ABOUT YOU",
	"IT'S ALL ABOUT YOU",
	"IT'S ALL ABOUT YOU",
];
function newsclose() {
	noticeBoxChildren = [].slice.call(noticeBox.children);
	noticeBoxChildren.forEach(function (elem) {
		elem.style.display = "none";
	});
	noticeBox.style.display = "none";
}
window.addEventListener("load", async function () {
	getPages();
	await carouses();
	imgCar.style.opacity = "100";
	showSlides();
	newce();
	blosh();
	listadd();
});

async function carouses() {
	await db
		.collection("carousels")
		.get()
		.then(async function (querySnapshot) {
			var counter = 0;
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				var item = document.createElement("img");
				item.src = doc.data().link;
				console.log(doc.data());
				item.id = ["c" + counter];
				item.classList.add("carosimg", "fade");
				var texlc = document.createElement("h3");
				texlc.innerText = cartext[counter];
				texlc.classList.add("cartext", "fade");
				document.querySelector(".imgCar").appendChild(item);
				document.querySelector(".imgCar").appendChild(texlc);
				counter += 1;
				hold.push(doc.data());
			});
		});
}

function showSlides() {
	var i;
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
		texas[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	slides[slideIndex - 1].style.display = "block";
	texas[slideIndex - 1].style.display = "flex";
	setTimeout(showSlides, 6000); // Change image every 6 seconds
}
async function newce() {
	await db
		.collection("news")
		.get()
		.then(async function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				if (doc.data().status == "on") {
					var closs = document.createElement("div");
					closs.innerHTML = "X";
					closs.id = "closeNotice";
					closs.setAttribute("onclick", "newsclose()");
					var nees = document.createElement("p");
					nees.innerHTML = doc.data().name;
					document.querySelector(".notice").appendChild(closs);
					document.querySelector(".notice").appendChild(nees);
				} else {
					document.querySelector(".notice").style.display = "none";
				}
			});
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
async function blosh() {
	await db
		.collection("Firth")
		.orderBy("timestamp", "desc")
		.get()
		.then(async function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				bloggit.push(doc.data());
			});
			for (f = 0; f < 1; f++) {
				var car = document.createElement("div");
				car.classList.add("item");
				car.id = "c" + f;
				var dat = document.createElement("h2");
				dat.innerText = "Principal's Blog " + bloggit[f].date;
				dat.classList.add("blogDate");
				var til = document.createElement("h2");
				til.innerText = bloggit[f].title2;
				til.classList.add("blogTitle");
				var full = document.createElement("p");
				full.innerHTML = bloggit[f].desc;
				full.classList.add("full");
				var moar = document.createElement("a");
				moar.href = "PBlog";
				moar.classList.add("moar");
				moar.innerHTML = "Read More";

				car.appendChild(dat);
				car.appendChild(til);
				car.appendChild(full);
				car.appendChild(moar);

				document.querySelector(".blogMini").appendChild(car);
			}
		});
}
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
					document.querySelector("#searchblob").style.display =
						"none";
				}, 700);
				searchBox.value = "";
			});
		case "focus":
			searchBox.addEventListener("focus", function () {
				document.querySelector("#searchblob").style.display = "block";
			});
	}
});
