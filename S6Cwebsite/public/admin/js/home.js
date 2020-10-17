var carouse = []
var lonk = []
var newt = []

document.addEventListener("DOMContentLoaded", function init() {
    carousels()
    links()
    news()
}
)


async function carousels() {
    await db.collection("carousels")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                carouse.push(doc.data())
                console.log(carouse)

            })
            for (i = 0; i < carouse.length; i++) {
                var box = document.createElement("div")
                box.classList.add("caropic")
                var name = document.createElement("p")
                name.setAttribute("onclick", "select()")
                name.innerText = carouse[i].file
                name.setAttribute("value", carouse[i].file)
                name.classList.add("file")
                var upl = document.createElement("div")
                upl.classList.add("upload")
                upl.innerText = "upload"

                box.appendChild(name)
                box.appendChild(upl)

                document.querySelector("#carousel").appendChild(box)

            }
        })
}
async function links() {
    await db.collection("links")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                lonk.push(doc.data())
                console.log(lonk)

            })
            document.querySelector("#tlink").value = lonk[2].name
            document.querySelector("#flink").value = lonk[0].name
            document.querySelector("#ilink").value = lonk[1].name
        }
        )
}
async function news() {
    await db.collection("news")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                newt.push(doc.data())
                console.log(lonk)

            })
            document.querySelector("#editnews").value = newt[0].name
        }
        )
}

function save() {
    db.collection("news").doc("current").update({
        name: document.querySelector("#editnews").value
    })
    db.collection("links").doc("facebook").update({
        name: document.querySelector("#flink").value
    })
    db.collection("links").doc("twitter").update({
        name: document.querySelector("#tlink").value
    })
    db.collection("links").doc("instagram").update({
        name: document.querySelector("#ilink").value
    })
    /*  if (e.parentNode.querySelector(".delete").getAttribute("label") == e.parentNode.querySelector(".upimg").getAttribute("label")) {
    
                db.collection(e.parentNode.name).doc(e.parentNode.querySelector(".name").innerText)
                    .update({
                        description: e.parentNode.querySelector(".desc").value,
                        price: e.parentNode.querySelector(".price").value
                    })*/
}