var carouse = []
var lonk = []
var newt = []

document.addEventListener("DOMContentLoaded", async function init() {
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

            })
            for (i = 0; i < carouse.length; i++) {
                var box = document.createElement("div")
                box.classList.add("caropic")
                var name = document.createElement("p")
                name.setAttribute("onclick", "select()")
                name.innerText = carouse[i].file
                name.setAttribute("value", carouse[i].file)
                name.classList.add("file")
                name.id = "link" + (i + 1)
                var upl = document.createElement("div")
                upl.classList.add("upload")
                upl.innerText = "upload"
                upl.setAttribute("onclick", "getting(this)")
                var image = document.createElement("input")
                image.classList.add("unknown")
                image.style.display = "none"
                image.type = "file"
                image.accept = ".png,.jpg,.gif,.tif,.webp"

                box.appendChild(name)
                box.appendChild(upl)
                box.appendChild(image)

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

            })
            document.querySelector("#editnews").value = newt[0].name
            document.getElementById('characters').innerHTML = document.getElementById('editnews').value.length + "/360 Characters"
        }
        )
}

async function save() {
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();
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
    for (i = 1; i < 6; i++) {
        var newfile = document.querySelector("#link" + i)

        if (newfile.innerHTML == newfile.getAttribute("value")) {

        }
        else {

            storageRef.child("carousel/" + newfile.getAttribute("value")).delete()

            var filt = newfile.parentNode.querySelector(".unknown").files[0]

            var storagechange = firebase.storage().ref("carousel/" + newfile.innerHTML);
            // Upload file
            var task = storagechange.put(filt);

            db.collection("carousels").doc("link" + i).update({
                file: newfile.innerHTML
            })
        }
        var saver = document.querySelector("#save")
        saver.style.backgroundColor = "green"
        saver.innerHTML = "SAVED!"
        setTimeout(() => {
            saver.style.backgroundColor = "#663399"
            saver.innerHTML = "Save changes"
        }, 2500);
    }

}
function getting(x) {
    var choicer = x.parentNode.querySelector(".unknown")
    choicer.click()
    choicer.addEventListener("change", function (e) {
        file = e.target.files[0];

        x.parentNode.querySelector(".file").innerHTML = file.name
    })

}

document.getElementById('editnews').onkeyup = function () {
    document.getElementById('characters').innerHTML = this.value.length + "/360 Characters";
};
