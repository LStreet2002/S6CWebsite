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
        var time = document.createElement("h2")
        time.innerText = decay[i].date
        var edit = document.createElement("span")
        edit.classList.add("edit", "material-icons")
        edit.innerText = "edit"
        edit.setAttribute("onclick", "edit()")
        var del = document.createElement("span")
        del.classList.add("delete", "material-icons")
        del.innerText = "delete"
        del.setAttribute("onclick", "delet()")
        var title = document.createElement("input")
        title.classList.add("postit")
        title.setAttribute("type", "text")
        title.setAttribute("value", decay[i].title)
        var desc = document.createElement("input")
        desc.classList.add("postesc")
        desc.setAttribute("type", "text")
        desc.setAttribute("value", decay[i].desc)
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