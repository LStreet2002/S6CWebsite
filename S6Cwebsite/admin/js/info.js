function addTab() {
  var text = document.getElementsByClassName("addTabInput")[0].value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      file: text,
    })
  );
  location.reload();
}
