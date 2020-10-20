var decay = []

document.addEventListener("DOMContentLoaded", async function init() {
    old()
}
)
async function old() {
    await db.collection("Firth")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                decay.push(doc.data())

            })
        })
    for (i = 0; i < decay.length; i++) {
        var hold = document.createElement("div")
        hold.classList.add("post")
        hold.id = decay[i].title
        var time = document.createElement("h2")
        time.innerText = decay[i].date
        var edit = document.createElement("span")
        edit.classList.add("edit", "material-icons")
        edit.innerText = "edit"
        edit.setAttribute("onclick", "edit(this)")
        var del = document.createElement("span")
        del.classList.add("delete", "material-icons")
        del.innerText = "delete"
        del.setAttribute("onclick", "delet(this)")
        var title = document.createElement("input")
        title.classList.add("postit")
        title.setAttribute("type", "text")
        title.setAttribute("value", decay[i].title2)
        var desc = document.createElement("textarea")
        desc.classList.add("postesc")
        desc.setAttribute("type", "text")
        desc.innerText = decay[i].desc
        var hr = document.createElement("hr")

        hold.appendChild(time)
        hold.appendChild(edit)
        hold.appendChild(del)
        hold.appendChild(title)
        hold.appendChild(desc)
        hold.appendChild(hr)

        document.querySelector("#postlist").appendChild(hold)
    }
}

function delet(e) {
    db.collection("Firth").doc(e.parentNode.id).delete()
    e.parentNode.style.display = "none"
}
function edit(e) {
    if (e.parentNode.querySelector(".postit").style.display == "none") {
        e.parentNode.querySelector(".postit").style.display = "block"
        e.parentNode.querySelector(".postesc").style.display = "block"
    }
    else {
        e.parentNode.querySelector(".postit").style.display = "none"
        e.parentNode.querySelector(".postesc").style.display = "none"
    }
}

async function make() {
    var tut = document.querySelector("#addPost")
    var dec = document.querySelector("#addContent")
    var det = document.querySelector("#addDate")
    db.collection("Firth").doc(document.querySelector("#addPost").value).set({
        title: tut.value,
        desc: dec.value,
        title2: tut.value,
        date: det.value
    })

    var hold = document.createElement("div")
    hold.classList.add("post")
    hold.id = tut.value
    var time = document.createElement("h2")
    time.innerText = det.value
    var edit = document.createElement("span")
    edit.classList.add("edit", "material-icons")
    edit.innerText = "edit"
    edit.setAttribute("onclick", "edit(this)")
    var del = document.createElement("span")
    del.classList.add("delete", "material-icons")
    del.innerText = "delete"
    del.setAttribute("onclick", "delet(this)")
    var title = document.createElement("input")
    title.classList.add("postit")
    title.setAttribute("type", "text")
    title.setAttribute("value", tut.value)
    var desc = document.createElement("textarea")
    desc.classList.add("postesc")
    desc.setAttribute("type", "text")
    desc.innerText = dec.value
    var hr = document.createElement("hr")

    hold.appendChild(time)
    hold.appendChild(edit)
    hold.appendChild(del)
    hold.appendChild(title)
    hold.appendChild(desc)
    hold.appendChild(hr)

    document.querySelector("#postlist").appendChild(hold)
    tut.value = ""
    dec.value = ""
    det.value = ""

}
async function save() {
    var blogs = document.getElementsByClassName("post")
    for (i = 0; i < blogs.length; i++) {
        db.collection("Firth").doc(blogs[i].id).update({
            title2: blogs[i].querySelector(".postit").value,
            desc: blogs[i].querySelector(".postesc").value,
        })
    }
}