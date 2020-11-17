
var bloggit = []
var thecount = 0
window.addEventListener("DOMContentLoaded", function () {
    carousels()
    getPages()
})

async function carousels() {
    await db.collection("Firth").orderBy("timestamp", "desc")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                bloggit.push(doc.data())

            })
            for (y = 0; y < bloggit.length; y++) {
                var car = document.createElement("div")
                car.classList.add("item")
                car.id = "c" + y
                var dat = document.createElement("h2")
                dat.innerText = bloggit[y].date
                dat.classList.add("blogDate")
                var til = document.createElement("h2")
                til.innerText = bloggit[y].title2
                til.classList.add("blogTitle")
                var full = document.createElement("p")
                full.innerHTML = bloggit[y].desc
                full.classList.add("full")
                if (y == 0) {
                } else {
                    var next = document.createElement("div")
                    next.classList.add("next")
                    var nexth = document.createElement("h3")
                    nexth.classList.add("posts")
                    nexth.innerText = "Next post"
                    var nextl = document.createElement("div")
                    nextl.classList.add("nextPost")
                    nextl.innerText = bloggit[(y - 1)].title2
                    nextl.setAttribute("onclick", "backward(this)")
                }
                if (y == (bloggit.length - 1)) { }
                else {
                    var last = document.createElement("div")
                    last.classList.add("last")
                    var lasth = document.createElement("h3")
                    lasth.classList.add("posts")
                    lasth.innerText = "Previous post"
                    var lastl = document.createElement("div")
                    lastl.classList.add("lastPost")
                    lastl.innerText = bloggit[(y + 1)].title2
                    lastl.setAttribute("onclick", "forward(this)")
                }
                var other = document.createElement("section")
                other.classList.add("otherPosts")

                car.appendChild(dat)
                car.appendChild(til)
                car.appendChild(full)
                if (y == 0) {
                } else {
                    next.appendChild(nexth)
                    next.appendChild(nextl)
                    other.appendChild(next)
                }
                if (y == (bloggit.length - 1)) { }
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