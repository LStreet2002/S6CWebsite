var decay = []

document.addEventListener("DOMContentLoaded", async function init() {
    old()
}
)
async function old() {
    await db.collection("Firth").orderBy("timestamp", "desc")
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
        time.innerText = decay[i].date + " " + decay[i].title2
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
        var bolt = document.createElement("button")
        bolt.classList.add("bold")
        bolt.setAttribute("onclick", "bolden(this)")
        bolt.innerText = "Bold"
        var head = document.createElement("button")
        head.classList.add("header")
        head.setAttribute("onclick", "headen(this)")
        head.innerText = "Header"
        var brok = document.createElement("button")
        brok.classList.add("breaker")
        brok.innerText = "Line drop"
        brok.setAttribute("onclick", "drolp(this)")
        var lens = document.createElement("button")
        lens.classList.add("linker")
        lens.setAttribute("onclick", "linken(this)")
        lens.innerText = "Link"
        var desc = document.createElement("textarea")
        desc.classList.add("postesc")
        desc.setAttribute("type", "text")
        desc.innerText = decay[i].desc
        var hr = document.createElement("hr")

        hold.appendChild(time)
        hold.appendChild(edit)
        hold.appendChild(del)
        hold.appendChild(title)
        hold.appendChild(bolt)
        hold.appendChild(head)
        hold.appendChild(brok)
        hold.appendChild(lens)
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
    if (getComputedStyle(e.parentNode.querySelector(".postit")).display === "none") {
        e.parentNode.querySelector(".postit").style.display = "block"
        e.parentNode.querySelector(".postesc").style.display = "block"
        e.parentNode.querySelector(".bold").style.display = "inline"
        e.parentNode.querySelector(".header").style.display = "inline"
        e.parentNode.querySelector(".breaker").style.display = "inline"
        e.parentNode.querySelector(".linker").style.display = "inline"
    }
    else {
        e.parentNode.querySelector(".postit").style.display = "none"
        e.parentNode.querySelector(".postesc").style.display = "none"
        e.parentNode.querySelector(".bold").style.display = "none"
        e.parentNode.querySelector(".header").style.display = "none"
        e.parentNode.querySelector(".breaker").style.display = "none"
        e.parentNode.querySelector(".linker").style.display = "noness"
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
        date: det.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    var hold = document.createElement("div")
    hold.classList.add("post")
    hold.id = tut.value
    var time = document.createElement("h2")
    time.innerText = det.value + " " + tut.value
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
    var bolt = document.createElement("button")
    bolt.classList.add("bold")
    bolt.setAttribute("onclick", "bolden(this)")
    bolt.innerText = "Bold"
    var head = document.createElement("button")
    head.classList.add("header")
    head.setAttribute("onclick", "headen(this)")
    head.innerText = "Header"
    var brok = document.createElement("button")
    brok.classList.add("breaker")
    brok.innerText = "Line drop"
    brok.setAttribute("onclick", "drolp(this)")
    var lens = document.createElement("button")
    lens.classList.add("linker")
    lens.setAttribute("onclick", "linken(this)")
    lens.innerText = "Link"
    var desc = document.createElement("textarea")
    desc.classList.add("postesc")
    desc.setAttribute("type", "text")
    desc.innerText = dec.value
    var hr = document.createElement("hr")

    hold.appendChild(time)
    hold.appendChild(edit)
    hold.appendChild(del)
    hold.appendChild(title)
    hold.appendChild(bolt)
    hold.appendChild(head)
    hold.appendChild(brok)
    hold.appendChild(lens)
    hold.appendChild(desc)
    hold.appendChild(hr)

    var prev = document.getElementsByClassName("post")
    document.querySelector("#postlist").insertBefore(hold, prev[0])
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
        var saver = document.querySelector("#save")
        saver.style.backgroundColor = "green"
        saver.innerHTML = "SAVED!"
        setTimeout(() => {
            saver.style.backgroundColor = "#663399"
            saver.innerHTML = "Save changes"
        }, 2500);
    }
}
function typeInTextarea(newText, el = document.activeElement) {
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const before = text.substring(0, start)
    const after = text.substring(end, text.length)
    el.value = (before + newText + after)
    el.selectionStart = el.selectionEnd = start + newText.length
    el.focus()
}
function drolp(y) {
    y.parentNode.querySelector(".postesc").focus()
    typeInTextarea("<br>")
}
function bolden(y) {
    y.parentNode.querySelector(".postesc").focus()
    typeInTextarea("<b>Bold text here</b>")
}
function headen(y) {
    y.parentNode.querySelector(".postesc").focus()
    typeInTextarea("<h3>Header here</h3>")
}
function linken(y) {
    y.parentNode.querySelector(".postesc").focus()
    typeInTextarea("<a href=" + '"Link URL"' + ">Text to click</a>")
}
document.querySelector(".boldit").addEventListener("click", function () {
    document.querySelector("#addContent").focus()
    typeInTextarea("<b>Bold text here</b>")
})
document.querySelector(".headit").addEventListener("click", function () {
    document.querySelector("#addContent").focus()
    typeInTextarea("<h3>Header text here</h3>")
})
document.querySelector(".breakit").addEventListener("click", function () {
    document.querySelector("#addContent").focus()
    typeInTextarea("<br>")
})
document.querySelector(".linkit").addEventListener("click", function () {
    document.querySelector("#addContent").focus()
    typeInTextarea("<a href=" + '"Link URL"' + ">Text to click</a>")
})