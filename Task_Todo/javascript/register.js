$(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
$("#register").click(function (e) {
  e.preventDefault();
  var name = $("#name").val();
  var email = $("#email").val();
  var password = $("#password").val();
  $("#agreetnc").is(":checked")
    ? ($("#sign,#wait").toggleClass("d-none"),
      $(".erst").addClass("d-none"),
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:5000/register",
      })
        .done(function () {
          $("#name,#email,#password").val("");
          $("#done,#wait").toggleClass("d-none");
          $("#register").toggleClass("btn-primary").toggleClass("btn-success");
          window.location.href = "login.html";
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
        }))
    : ($(".errstatus").html("Please agree to T&C's"),
      $(".erst").removeClass("d-none"));
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
