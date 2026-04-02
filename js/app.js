// Focus Flow - Vanilla JS Task Manager
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
  const taskCountEl = document.getElementById("taskCount");
  const filterBtns = document.querySelectorAll(".filters button");

  let tasks = [];
  let currentFilter = "all";

  // Render all tasks based on current filter
  function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true; // 'all'
    });

    if (filteredTasks.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.dataset.id = task.id;

      li.innerHTML = `
        <div class="task-checkbox">${task.completed ? "✓" : ""}</div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-timestamp">${task.timestamp}</div>
        </div>
        <button class="delete-btn">×</button>
      `;

      taskList.appendChild(li);
    });

    updateTaskCount();
  }

  function updateTaskCount() {
    const activeCount = tasks.filter((t) => !t.completed).length;
    taskCountEl.textContent = `${activeCount} active task${activeCount !== 1 ? "s" : ""}`;
  }

  // Add new task
  function addTask() {
    const title = taskInput.value.trim();

    if (title.length < 3) {
      alert("Task must be at least 3 characters long!");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      completed: false,
    };

    tasks.unshift(newTask); 
    taskInput.value = "";
    renderTasks();
  }

  // Toggle complete
  function toggleComplete(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    renderTasks();
  }

  // Delete task
  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  }

  // Event Listeners

  // Add button
  addBtn.addEventListener("click", addTask);

 
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Event Delegation 
  taskList.addEventListener("click", (e) => {
    const taskItem = e.target.closest(".task-item");
    if (!taskItem) return;

    const id = taskItem.dataset.id;

    if (
      e.target.classList.contains("task-checkbox") ||
      e.target.closest(".task-checkbox")
    ) {
      toggleComplete(id);
    }

    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Delete this task?")) {
        deleteTask(id);
      }
    }
  });

  
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  
  renderTasks();
});
