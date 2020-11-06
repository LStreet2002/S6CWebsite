social = []
window.addEventListener("DOMContentLoaded", function () {
    footer()
})
async function footer() {
    await db.collection("links")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                social.push(doc.data())
            })
            document.querySelector("#facebook").href = social[0].name
            document.querySelector("#instagram").href = social[1].name
            document.querySelector("#twitter").href = social[2].name
        })
}