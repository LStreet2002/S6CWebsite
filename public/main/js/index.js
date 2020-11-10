var hold = []
var thecount = 0

window.addEventListener("DOMContentLoaded", async function () {
  await carouses()
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
      item.classList.add("carosimg")
      document.querySelector(".imgCar").appendChild(item)
    })
  }

}



