var carouse = []

document.addEventListener("DOMContentLoaded", carousels()

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
