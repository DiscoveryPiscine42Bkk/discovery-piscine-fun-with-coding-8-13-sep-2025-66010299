window.onload = function() {
  let saved = getCookie("todoList");
  if (saved) {
    let todos = JSON.parse(saved);
    todos.forEach(t => addTodo(t, false));
  }
};

function newTodo() {
  let task = prompt("Enter new task:");
  if (task && task.trim() !== "") {
    addTodo(task, true);
  }
}

function addTodo(task, save) {
  let div = document.createElement("div");
  div.className = "todo";
  div.textContent = task;

  div.onclick = function() {
    if (confirm("Do you want to delete this task?")) {
      div.remove();
      updateCookie();
    }
  };

  let list = document.getElementById("ft_list");
  list.appendChild(div);

  if (save) updateCookie();
}

function updateCookie() {
  let todos = [];
  let items = document.querySelectorAll(".todo");
  items.forEach(item => todos.push(item.textContent));
  setCookie("todoList", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  let cname = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i<ca.length;i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}