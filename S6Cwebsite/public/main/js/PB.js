var social = []
var bloggit = []
var thecount = 0
window.addEventListener("DOMContentLoaded", function () {
    footer()
    carousels()
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
async function carousels() {
    await db.collection("Firth").orderBy("timestamp", "desc")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                bloggit.push(doc.data())

            })
            for (i = 0; i < bloggit.length; i++) {
                var car = document.createElement("div")
                car.classList.add("item")
                car.id = "c" + i
                var dat = document.createElement("h2")
                dat.innerText = bloggit[i].date
                dat.classList.add("blogDate")
                var til = document.createElement("h2")
                til.innerText = bloggit[i].title2
                til.classList.add("blogTitle")
                var full = document.createElement("p")
                full.innerHTML = bloggit[i].desc
                full.classList.add("full")
                if (i == 0) {
                } else {
                    var next = document.createElement("div")
                    next.classList.add("next")
                    var nexth = document.createElement("h3")
                    nexth.classList.add("posts")
                    nexth.innerText = "Next post"
                    var nextl = document.createElement("div")
                    nextl.classList.add("nextPost")
                    nextl.innerText = bloggit[(i - 1)].title2
                    nextl.setAttribute("onclick", "backward(this)")
                }
                if (i == (bloggit.length - 1)) { }
                else {
                    var last = document.createElement("div")
                    last.classList.add("last")
                    var lasth = document.createElement("h3")
                    lasth.classList.add("posts")
                    lasth.innerText = "Previous post"
                    var lastl = document.createElement("div")
                    lastl.classList.add("lastPost")
                    lastl.innerText = bloggit[(i + 1)].title2
                    lastl.setAttribute("onclick", "forward(this)")
                }
                var other = document.createElement("section")
                other.classList.add("otherPosts")

                car.appendChild(dat)
                car.appendChild(til)
                car.appendChild(full)
                if (i == 0) {
                } else {
                    next.appendChild(nexth)
                    next.appendChild(nextl)
                    other.appendChild(next)
                }
                if (i == (bloggit.length - 1)) { }
                else {
                    last.appendChild(lasth)
                    last.appendChild(lastl)
                    other.appendChild(last)
                }
                car.appendChild(other)

                document.querySelector(".main").appendChild(car)
            }
        })
}
function forward(e) {
    thecount++
    console.log(thecount)
    e.parentNode.parentNode.parentNode.style.display = "none"
    document.querySelector("#c" + thecount).style.display = "block"
}
function backward(e) {
    thecount--
    console.log(thecount)
    e.parentNode.parentNode.parentNode.style.display = "none"
    document.querySelector("#c" + thecount).style.display = "block"
}