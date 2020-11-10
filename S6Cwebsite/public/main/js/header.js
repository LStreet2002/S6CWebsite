window.addEventListener("DOMContentLoaded", function () {
    getDatabaseI()
})
async function getDatabaseI() {
    await db
        .collection("infoTabs")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data())
            });

        });
}
