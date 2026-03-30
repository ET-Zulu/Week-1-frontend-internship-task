let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");


addTaskBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (value.length < 3) {
    taskInput.focus();
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
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("task");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}


function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  renderTasks();
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}