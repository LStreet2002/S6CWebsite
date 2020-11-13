var bloggit = []
var hold = []
var thecount = 0
var slideIndex = 0;
var cartext = [
  "ITS ALL ABOUT YOU", 
  "ITS ALL ABOUT YOU", 
  "ITS ALL ABOUT YOU", 
  "ITS ALL ABOUT YOU", 
  "ITS ALL ABOUT YOU"
]


window.addEventListener("DOMContentLoaded", async function () {
  await carouses()
  showSlides();
  newce()
  getPages()
  blosh()

})
async function carouses() {
  var storageRef = storage.ref('carousel');
  await db.collection("carousels")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        hold.push(doc.data())

      })
    })
  for (y = 0; y < 5; y++) {
    // doc.data() is never undefined for query doc snapshots
    await storageRef.child("/" + hold[y].file).getDownloadURL().then(function (url) {
      var item = document.createElement("img")
      item.src = url
      item.id = ["c" + y]
      item.classList.add("carosimg", "fade")
      var texlc = document.createElement("h3")
      texlc.innerText = cartext[y]
      texlc.classList.add("cartext")
      document.querySelector(".imgCar").appendChild(item)
      document.querySelector(".imgCar").appendChild(texlc)
    })
  }

}
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("carosimg");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 6000); // Change image every 2 seconds
}
async function newce() {
  await db.collection("news")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        document.querySelector(".notice").innerHTML = doc.data().name

      })
    })
}
async function blosh() {
  await db.collection("Firth").orderBy("timestamp", "desc")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        bloggit.push(doc.data())

      })
      for (f = 0; f < 1; f++) {
        console.log(bloggit)
        var car = document.createElement("div")
        car.classList.add("item")
        car.id = "c" + f
        var dat = document.createElement("h2")
        dat.innerText = bloggit[f].date
        dat.classList.add("blogDate")
        var til = document.createElement("h2")
        til.innerText = bloggit[f].title2
        til.classList.add("blogTitle")
        var full = document.createElement("p")
        full.innerHTML = bloggit[f].desc
        full.classList.add("full")



        car.appendChild(dat)
        car.appendChild(til)
        car.appendChild(full)

        document.querySelector(".blogMini").appendChild(car)
      }
    })
}