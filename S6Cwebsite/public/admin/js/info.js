var newt = []
function addTab() {
    var input = document.getElementsByClassName("addTabInput")[0].value
    console.log(input)
    db.collection("infoTabs").doc(input).set({
        pageName: input
    })
}

async function getDatabase() {
    await db.collection("infoTabs")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                newt.push(doc.data())

            })
            var body = document.getElementsByClassName("body")
            for (i = 0; i < newt.length; i++) {
                var child = document.createElement("li")
                child.innerText = newt[i]["pageName"]
                document.body.appendChild(child)
                console.log(newt[i]["pageName"])
            }


        })
}

window.addEventListener("DOMContentLoaded", function () {
    getDatabase()
})