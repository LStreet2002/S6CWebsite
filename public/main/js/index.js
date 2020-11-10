const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]


function chang(e) {
  document.querySelector("#page").value = "bursary"
  document.querySelector("#form").submit()
}
function changs(e) {
  document.querySelector("#page2").value = "studytest"
  document.querySelector("#form2").submit()
}
