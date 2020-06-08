function gettoken() {
  token = [];
  if (
    localStorage.getItem("cbjsdc45cn43o4ampc61asc9mo:aKomsi") === "stoloc" &&
    localStorage.getItem("asghbi823ybe89e9quindb121a.ali9si") !== null
  ) {
    t = localStorage.getItem("asghbi823ybe89e9quindb121a.ali9si");
    token = t.split("++");
  } else if (
    localStorage.getItem("cbjsdc45cn43o4ampc61asc9mo:aKomsi") === "stoses" &&
    sessionStorage.getItem("asghbi823ybe89e9quindb121a.ali9si") !== null
  ) {
    t = sessionStorage.getItem("asghbi823ybe89e9quindb121a.ali9si");
    token = t.split("++");
  }
  return token;
}


function check() {
  var token = gettoken();
      $.ajax({
        type: "GET",
        headers: { Authorization: `Bearer ${token[0]}` },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `http://localhost:5000/verify`,
      })
        .done(() => $("body").show())
        .fail(() => (window.location.href = "login.html"));
    }
check();
