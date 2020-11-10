var newt = []

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("page")
console.log(product);

window.addEventListener("DOMContentLoaded", function () {
    getDatabase()
})
async function getDatabase() {
    await db
        .collection("studyTabs")
        .get()
        .then(
            doc = await getDoc(product),
        );
    document.querySelector(".banner").innerText = doc.pageName.toUpperCase()

    var tex = document.createElement("p")
    tex.innerHTML = doc.main
    tex.classList.add("subext")

    document.querySelector(".block").appendChild(tex)

}
async function getDoc(url) {
    const docRef = db.collection("studyTabs").doc(url);
    const doc = await docRef.get();
    if (doc.exists) {
        return doc.data();
    }
}

function chang(e) {
    document.querySelector("#page").value = e.innerText
    document.querySelector("#submit").click()
}
