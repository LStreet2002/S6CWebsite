var hold = []
var thecount = 0
var slideIndex = 0;


window.addEventListener("DOMContentLoaded", async function () {
  await carouses()
  showSlides();
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
      document.querySelector(".imgCar").appendChild(item)
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


