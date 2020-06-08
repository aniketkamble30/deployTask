$(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
$("#login").click(function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  email == "" || password == ""
    ? alert("Please fill all details")
    : ($("#sign,#wait").toggleClass("d-none"),
      $(".erst").addClass("d-none"),
      $.ajax({
        type: "POST",
        timeout: 8000,
        data: JSON.stringify({
          email: email,
          password: password,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:5000/login",
      })
        .done(function (response) {
          $("#email,#password,#keepmein").val("");
          $("#done,#wait").toggleClass("d-none");
          $("#login").toggleClass("btn-primary").toggleClass("btn-success");
          $("#keepmein").is(":checked")
            ? (localStorage.setItem(
                "asghbi823ybe89e9quindb121a.ali9si",
                response.access_token + "++" + response.user
              ),
              localStorage.setItem(
                "cbjsdc45cn43o4ampc61asc9mo:aKomsi",
                "stoloc"
              ))
            : (sessionStorage.setItem(
                "asghbi823ybe89e9quindb121a.ali9si",
                response.access_token + "++" + response.user
              ),
              localStorage.setItem(
                "cbjsdc45cn43o4ampc61asc9mo:aKomsi",
                "stoses"
              ));
          window.location.href = "home.html";
        })
        .fail(function (data, textstatus, xhr) {
          if (data.responseJSON !== undefined) {
            $(".errstatus").html(data.responseJSON.message);
            $("#sign,#wait").toggleClass("d-none");
            $(".erst").removeClass("d-none");
          } else {
            $(".errstatus").html(
              "Cannot connect to server ! Try again later !"
            );
            $("#sign,#wait").toggleClass("d-none");
            $(".erst").removeClass("d-none");
          }
        }));
});

function verify() {
  if (
    localStorage.getItem("cbjsdc45cn43o4ampc61asc9mo:aKomsi") === "stoloc" &&
    localStorage.getItem("asghbi823ybe89e9quindb121a.ali9si") !== null
  ) {
    window.location.href = "./home.html";
  } else if (
    localStorage.getItem("cbjsdc45cn43o4ampc61asc9mo:aKomsi") === "stoses" &&
    sessionStorage.getItem("asghbi823ybe89e9quindb121a.ali9si") !== null
  ) {
    window.location.href = "./home.html";
  }
}
verify();
