var newt = [];

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("page");
const collection = urlParams.get("collection");
console.log(product, collection);
document.body.style.opacity = "0";

window.addEventListener("DOMContentLoaded", function () {
  getDatabase()
  getPages();
});
async function getDatabase() {
  await db
    .collection(collection)
    .get()
    .then((doc = await getDoc(product)));
  document.querySelector(".banner").innerText = doc.pageName.toUpperCase();

  var tex = document.createElement("p");
  tex.innerHTML = doc.main;
  tex.classList.add("subext");

  document.querySelector(".block").appendChild(tex);
}
async function getDoc(url) {
  const docRef = db.collection(collection).doc(url);
  const doc = await docRef.get();
  if (doc.exists) {
    return doc.data();
  }
}
