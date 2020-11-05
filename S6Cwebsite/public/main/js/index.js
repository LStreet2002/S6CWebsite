const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})
function chang(e) {
    document.querySelector("#page").value = "bursary"
    document.querySelector("#form").submit()
}
function changs(e) {
    document.querySelector("#page2").value = "studytest"
    document.querySelector("#form2").submit()
}
/*  <form id="form" style="display:none" action="information.html" method="GET">
        <input type="text" id="page" name="page">
      </form>
      <form id="form2" style="display:none" action="study.html" method="GET">
        <input type="text" id="page2" name="page">
      </form>*/