let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchQuery = "";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filters button");
const popup = document.getElementById("popup");
const searchInput = document.getElementById("searchInput");

const dueDateInput = document.getElementById("dueDateInput");
const priorityInput = document.getElementById("priorityInput");


function showPopup(message) {
  popup.textContent = message;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 2000);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (value.length < 4) {
    showPopup("Task must be at least 4 characters.");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: value,
    completed: false,
    createdAt: new Date(),
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.toLowerCase();
  renderTasks();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks
    .filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchQuery)
    );

  emptyState.style.display =
    filteredTasks.length === 0 ? "block" : "none";

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = task.id;

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <div class="title">${task.title}</div>
        <div class="meta">
          ${task.priority} | ${task.dueDate || "No date"}
        </div>
      </div>
      <div>
        <button class="toggle-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

taskList.addEventListener("click", (e) => {
  const li = e.target.closest(".task");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("toggle-btn")) {
    toggleTask(id);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }
});

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

window.addEventListener("storage", (e) => {
  if (e.key === "tasks") {
    tasks = JSON.parse(e.newValue) || [];
    renderTasks();
  }
});

renderTasks();