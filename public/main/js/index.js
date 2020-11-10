var hold = []
var thecount = 0

window.addEventListener("DOMContentLoaded", async function () {
  await carouses()
  forward()
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
  for (i = 0; i < 5; i++) {
    // doc.data() is never undefined for query doc snapshots
    await storageRef.child("/" + hold[i].file).getDownloadURL().then(function (url) {
      var item = document.createElement("img")
      item.src = url
      item.id = ["c" + i]
      item.classList.add("carosimg")
      document.querySelector(".imgCar").appendChild(item)
    })
  }
}

function chang(e) {
  document.querySelector("#page").value = "bursary"
  document.querySelector("#form").submit()
}
function changs(e) {
  document.querySelector("#page2").value = "studytest"
  document.querySelector("#form2").submit()
}
function wait(ms) {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while (d2 - d < ms);
}

async function forward() {
  console.log("forward")
  var x = document.querySelectorAll(".carosimg")
  for (i = 0; i < 4; i++) {
    if (thecount == 4) {
      thecount - 4
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.querySelector("#c" + thecount).style.display = "block"
      wait(1000);
    }
    else {
      console.log("forward2")
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.querySelector("#c" + thecount).style.display = "block"
      thecount++
      console.log(thecount)
      wait(1000);
    }

  }
}

