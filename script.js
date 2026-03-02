let workspaces = JSON.parse(localStorage.getItem("workspaces")) || {};
let currentWorkspace = null;

function saveData() {
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
}

function createWorkspace() {
  const name = document.getElementById("workspaceInput").value.trim();
  if (!name) return;

  workspaces[name] = [];
  saveData();
  document.getElementById("workspaceInput").value = "";
  renderWorkspaces();
}

function renderWorkspaces() {
  const list = document.getElementById("workspaceList");
  list.innerHTML = "";

  for (let name in workspaces) {
    const div = document.createElement("div");
    div.className = "workspace";
    div.innerText = name;
    div.onclick = () => openWorkspace(name);
    list.appendChild(div);
  }
}

function openWorkspace(name) {
  currentWorkspace = name;
  document.getElementById("taskSection").classList.remove("hidden");
  document.getElementById("workspaceTitle").innerText = name;
  renderTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (!task) return;

  workspaces[currentWorkspace].push({ text: task, done: false });
  saveData();
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  workspaces[currentWorkspace].forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    span.style.textDecoration = task.done ? "line-through" : "none";
    span.onclick = () => toggleTask(index);

    const del = document.createElement("button");
    del.innerText = "X";
    del.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function toggleTask(index) {
  workspaces[currentWorkspace][index].done =
    !workspaces[currentWorkspace][index].done;
  saveData();
  renderTasks();
}

function deleteTask(index) {
  workspaces[currentWorkspace].splice(index, 1);
  saveData();
  renderTasks();
}

renderWorkspaces();
