let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filters button");

addTaskBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (value.length < 3) {
    alert("Task must be at least 3 characters.");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    renderTasks();
  });
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.title}</span>
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
  }

  if (e.target.classList.contains("delete-btn")) {
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

window.addEventListener("storage", (e) => {
  if (e.key === "tasks") {
    tasks = JSON.parse(e.newValue) || [];
    renderTasks();
  }
});

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}
renderTasks();