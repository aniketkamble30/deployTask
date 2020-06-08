$("#logout").click(function (e) {
  e.preventDefault();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "./login.html";
});

$("#toggler").click(function (e) {
  e.preventDefault();
  $(".sidenav").toggleClass("sidenav-toggled");
  $("main").toggleClass("main-sidenav-toggled");
});

function handleClick() {
  $("body,.navbar,.sidenav,.modal-content,hr")
    .toggleClass("dark")
    .toggleClass("bg-light");
}

var checkbox = document.querySelector("#deadlineid");
checkbox.addEventListener("change", function () {
  checkbox.checked ? $("#deadline").slideDown() : $("#deadline").slideUp();
});

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

function getodos() {
  var token = gettoken();
  $.ajax({
    type: "GET",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todos/${token[1]}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}

function complete(id) {
  $(`#header${id}`).addClass("striked");
  $(`.completed${id},.notcomplete${id}`).toggleClass("d-none");
  $.ajax({
    type: "GET",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todos_mark_completed/${token[1]}/${id}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}
function notcomplete(id) {
  $(`#header${id}`).removeClass("striked");
  $(`.completed${id},.notcomplete${id}`).toggleClass("d-none");
  $.ajax({
    type: "GET",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todos_mark_completed/${token[1]}/${id}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}
function remove(id) {
  $.ajax({
    type: "DELETE",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todo_delete_completely/${token[1]}/${id}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}

function archiveTask(id) {
  $.ajax({
    type: "GET",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todo_archive/${token[1]}/${id}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}
function deleteTask(id) {
  $.ajax({
    type: "GET",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `http://localhost:5000/todo_deleted/${token[1]}/${id}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
}

var label = {
  Work: "background-color: rgb(209, 159, 255, 0.397);",
  Shopping: "background-color: rgba(135, 175, 250, 0.397)",
  Academic: "background-color: rgb(183, 253, 183, 0.397)",
  "Self Improvement": "background-color: rgba(255, 136, 136, 0.397)",
  Leisure: "background-color: rgb(255, 255, 169, 0.397)",
  Chore: "background-color: rgb(250, 167, 137, 0.397)",
  Hobby: "background-color: rgba(248, 123, 190, 0.397)",
  Other: "background-color: rgb(194, 191, 191, 0.397)",
};

function renderTodos(todolist) {
  var k = "";
  var all = "";
  let notcompleted = todolist.filter(
    (todo) =>
      todo.completed == false && todo.deleted == false && todo.archive == false
  );
  notcompleted.reverse();
  notcompleted.forEach((element) => {
    k += `
    <div class="col-md-6 p-3"> 
    <div class="card p-3 pb-2" style="${label[element.label]}">
    <div class="d-flex">
        <button 
          onclick="complete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "d-none" : ""
          } completed${element._id["$oid"]} ">
          <span class='lnr lnr-checkmark-circle h4'></span>
        </button> 
        <button 
          onclick="notcomplete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "" : "d-none"
          } notcomplete${element._id["$oid"]} ">
          <span class='lnr lnr-cross-circle h4'></span>
        </button>
        <h5 id='header${element._id["$oid"]}' class="card-title ${
      element.completed ? "striked" : ""
    } ">${element.task}</h5>
    </div>
      <div class="d-flex align-items-center flex-row justify-content-between">
        <div class="flex-1">          
        <span class="h5 ${
          element.priority >= 1 ? 'text-yellow ">&#9733;' : '">'
        }</span>
        <span class="h5 ${
          element.priority >= 2 ? 'text-yellow ">&#9733;' : '">'
        }</span>
        <span class="h5 ${
          element.priority >= 3 ? 'text-yellow ">&#9733;' : '">'
        }</span>
          <medium class="font-weight-bold ml-2">Due on ${element.date}</medium>
        </div>
        <div>
          <button title="Delete" class="btn card-icon " onclick="deleteTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-trash"></i></button>
          <button title="Archive" class="btn card-icon "  onclick="archiveTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-enter-down"></i></button>
        </div>
      </div>
    </div>
    </div>
`;
  });
  let alltasks = todolist.filter(
    (todo) => todo.deleted == false && todo.archive == false
  );
  alltasks.reverse();
  alltasks.forEach((element) => {
    all += `
    <div class="col-md-6 p-3"> 
    <div class="card p-3 pb-2" style="${label[element.label]}">
    <div class="d-flex">
        <button 
          onclick="complete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "d-none" : ""
          } completed${element._id["$oid"]} ">
          <span class='lnr lnr-checkmark-circle h4'></span>
        </button> 
        <button 
          onclick="notcomplete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "" : "d-none"
          } notcomplete${element._id["$oid"]} ">
          <span class='lnr lnr-cross-circle h4'></span>
        </button>
        <h5 id='header${element._id["$oid"]}' class="card-title ${
      element.completed ? "striked" : ""
    } ">${element.task}</h5>
    </div>
      <div class="d-flex align-items-center flex-row justify-content-between">
        <div class="flex-1">          
        <span class="h5 ${
          element.priority >= 1 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 2 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 3 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
          <medium class="font-weight-bold ml-2">Due on ${element.date}</medium>
        </div>
        <div>
          <button title="Delete" class="btn card-icon " onclick="deleteTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-trash"></i></button>
          <button title="${
            !element.archive ? "Archive" : "Unarchive"
          }" class="btn card-icon "  onclick="archiveTask('${
      element._id["$oid"]
    }')" type="button"><i class="lnr lnr-${
      !element.archive ? "enter-down" : "exit-up"
    }"></i></button>
          <button title="Edit" class="btn card-icon " type="button"><i class="lnr lnr-pencil"></i></button>
        </div>
      </div>
    </div>
    </div>
`;
  });
  $("#avd").html(k);
  $("#alltabs").html(all);
}

function addTabs() {
  var todos = JSON.parse(localStorage.getItem("todos"));
  if (todos.length > 0) {
    let deleted = todos.filter((todo) => todo.deleted == true);
    let archived = todos.filter((todo) => todo.archive == true);
    let completed = todos.filter((todo) => todo.completed == true);
    var d = "";
    var a = "";
    if (deleted.length <= 0) {
      d += `
      <div class="col-12 text-center"> 
      <p class='h3'>No Deleted Tasks Found !</p>
      </div>
      `;
    } else {
      deleted.reverse();
      deleted.forEach((element) => {
        d += `
    <div class="col-md-6 p-3"> 
    <div class="card p-3 pb-2" style="${label[element.label]}">
    <div class="d-flex">
        <button 
          onclick="complete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "d-none" : ""
          } completed${element._id["$oid"]} ">
          <span class='lnr lnr-checkmark-circle h4'></span>
        </button> 
        <button 
          onclick="notcomplete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "" : "d-none"
          } notcomplete${element._id["$oid"]} ">
          <span class='lnr lnr-cross-circle h4'></span>
        </button>
        <h5 id='header${element._id["$oid"]}' class="card-title ${
          element.completed ? "striked" : ""
        } ">${element.task}</h5>
    </div>
      <div class="d-flex align-items-center flex-row justify-content-between">
        <div class="flex-1">          
        <span class="h5 ${
          element.priority >= 1 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 2 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 3 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
          <medium class="font-weight-bold ml-2">Due on ${element.date}</medium>
        </div>
        <div>
          <button title="Restore" class="btn card-icon " onclick="deleteTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-undo"></i> Restore</button>
        </div>
      </div>
    </div>
    </div>`;
      });
    }
    if (archived.length <= 0) {
      a += `  <div class="col-12 text-center"> 
      <p class='h3'>No Archived Tasks Found !</p>
      </div>`;
    } else {
    archived.reverse();
    archived.forEach((element) => {
      a += `
    <div class="col-md-6 p-3"> 
    <div class="card p-3 pb-2" style="${label[element.label]}">
    <div class="d-flex">
        <button 
          onclick="complete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "d-none" : ""
          } completed${element._id["$oid"]} ">
          <span class='lnr lnr-checkmark-circle h4'></span>
        </button> 
        <button 
          onclick="notcomplete('${element._id["$oid"]}')" 
          class="btn btn-sm btn-info ${
            element.completed ? "" : "d-none"
          } notcomplete${element._id["$oid"]} ">
          <span class='lnr lnr-cross-circle h4'></span>
        </button>
        <h5 id='header${element._id["$oid"]}' class="card-title ${
        element.completed ? "striked" : ""
      } ">${element.task}</h5>
    </div>
      <div class="d-flex align-items-center flex-row justify-content-between">
        <div class="flex-1">          
        <span class="h5 ${
          element.priority >= 1 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 2 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
        <span class="h5 ${
          element.priority >= 3 ? 'text-yellow ">&#9733;' : '">&#9734'
        }</span>
          <medium class="font-weight-bold ml-2">Due on ${element.date}</medium>
        </div>
        <div>
          <button title="Delete" class="btn card-icon " onclick="deleteTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-trash"></i></button>
          <button title="Unarchive" class="btn card-icon "  onclick="archiveTask('${
            element._id["$oid"]
          }')" type="button"><i class="lnr lnr-exit-up"></i></button>
          <button title="Edit" class="btn card-icon " type="button"><i class="lnr lnr-pencil"></i></button>
        </div>
      </div>
    </div>
    </div>
`;
    });
  }
    $("#archivetab").html(a);
    $("#deletedtab").html(d);
  }
}

$(document).ready(function () {
  getodos();
  addTabs();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  document.querySelector("#deadline_date").setAttribute("min", today);
});

$("#netowdo").submit(function (e) {
  e.preventDefault();
  var tasktitle = $("input[name=tasktitle]").val();
  var deadline_date = $("input[name=deadline_date]").val() ?? 'None';
  var deadline_time = $("input[name=deadline_time]").val() ?? 'None';
  var importance = $("input[name=importance]").val();
  var tasklabel = $("#tasklabel").val();
  var today = new Date();
  var create =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var token = gettoken();
  $.ajax({
    type: "POST",
    headers: { Authorization: `Bearer ${token[0]}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      tasktitle: tasktitle,
      deadline_date: deadline_date,
      deadline_time: deadline_time,
      importance: importance,
      date: create,
      tasklabel: tasklabel,
    }),
    url: `http://localhost:5000/todo/add/${token[1]}`,
  })
    .done((response) => {
      localStorage.setItem("todos", JSON.stringify(response));
      addTabs();
      renderTodos(response);
      $("#exampleModal").modal("hide");
    })
    .fail((datea, status, xhr) => console.log(datea.responseText));
});
