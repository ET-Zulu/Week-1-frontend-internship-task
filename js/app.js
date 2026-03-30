"use strict";

/*
  Simple scaffold version.
  You fill in each TODO body step by step.
*/

// -----------------------------
// App State
// -----------------------------

const state = {
  tasks: [],
  activeFilter: "all", // "all" | "active" | "completed"
};

// -----------------------------
// DOM Elements
// -----------------------------

const addTaskButton = document.getElementById("addTaskBtn");
const modal = document.getElementById("addTaskModal");
const overlay = document.getElementById("addTaskModalOverlay");
const form = document.querySelector("#addTaskModal form");
const titleInput = document.getElementById("taskTitle");
const deadlineInput = document.getElementById("taskDeadline");
const cancelButton = document.querySelector(".cancel");

const filtersContainer = document.querySelector(".filters div");
const filterButtons = document.querySelectorAll(".filters button");

const listContainer = document.querySelector(".list");
const emptyState = document.querySelector(".empty_state");

// -----------------------------
// App Setup
// -----------------------------

function initApp() {
  bindEvents();
  renderApp();
}

function bindEvents() {
  // TODO: Open modal
  addTaskButton.addEventListener("click", openModal);
  // TODO: Close modal from cancel button
  cancelButton.addEventListener("click", closeModal);
  // TODO: Close modal from overlay click
  overlay.addEventListener("click", closeModal);
  // TODO: Handle add-task form submit
  form.addEventListener("submit", onFormSubmit);
  // TODO: Handle filter button clicks
  filtersContainer.addEventListener("click", onFilterClick);
  // TODO: Handle task actions using event delegation
  listContainer.addEventListener("click", onTaskListClick);
}

// -----------------------------
// Event Handlers
// -----------------------------

function onFormSubmit(event) {
  // 1) event.preventDefault()
  event.preventDefault();

  // 2) read titleInput.value and deadlineInput.value
  const title = titleInput.value.trim();
  const deadline = deadlineInput.value;

  // 3) validate title
  if (!validateTaskTitle(title).valid) {
    showValidationError(validateTaskTitle(title).message);
    return;
  }

  // 4) create task object
  const newTask = createTask(title, deadline);

  // 5) push task to state.tasks
  state.tasks.push(newTask);

  // 6) clear form
  clearForm();

  // 7) close modal
  closeModal();

  // 8) renderApp()
  renderApp();
  void event;
}

function onFilterClick(event) {
  // 1) detect clicked button
  const clickedBtn = event.target;

  // 2) update state.activeFilter
  state.activeFilter = clickedBtn.innerHTML.toLowerCase();

  // 3) renderApp()
  renderApp();

  void event;
}

function onTaskListClick(event) {
  // 1) detect action (toggle or delete)
  const action = event.target;

  // 2) read task id from clicked element dataset
  const taskId = action.parentElement.id;
  const clickType = action.id;

  // 3) call toggleTaskById or deleteTaskById
  if (clickType == "check") {
    toggleTaskById(taskId);
  } else if (clickType == "delete") {
    deleteTaskById(taskId);
  }
  console.log({ clickType, taskId });
  // 4) renderApp()
  renderApp();
  void event;
}

// -----------------------------
// Task Operations
// -----------------------------

function createTask(title, dueAtValue) {
  // TODO: return task object with id, title, createdAt, dueAt, completed
  return {
    id: generateTaskId(),
    title,
    createdAt: new Date().toISOString(),
    dueAt: dueAtValue || null,
    completed: false,
  };
}

function validateTaskTitle(title) {
  if (!title) {
    return { valid: false, message: "Title is required" };
  }
  if (title.length < 3) {
    return {
      valid: false,
      message: "Title must be at least 3 characters long",
    };
  }
  return { valid: true, message: "" };
}

function toggleTaskById(taskId) {
  // TODO: find task in state.tasks and flip completed
  const task = state.tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
  void taskId;
}

function deleteTaskById(taskId) {
  // TODO: remove task from state.tasks
  const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    state.tasks.splice(taskIndex, 1);
  }

  void taskId;
}

function getVisibleTasks() {
  // TODO: filter by state.activeFilter
  const tasks = state.tasks.filter((t) => {
    if (state.activeFilter === "active") {
      return !t.completed;
    }
    if (state.activeFilter === "completed") {
      return t.completed;
    }
    return true;
  });
  return tasks;
}

function generateTaskId() {
  // TODO: return unique id string
  const uuid = Date.now().toString();
  return uuid;
}

// -----------------------------
// Modal + Form Helpers
// -----------------------------

function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function clearForm() {
  titleInput.value = "";
  deadlineInput.value = "";
}

function showValidationError(message) {
  alert(message);
  void message;
}

function clearValidationError() {
  // TODO: clear validation message from UI
}

// -----------------------------
// Render Functions
// -----------------------------

function renderApp() {
  renderTasks();
  renderEmptyState();
  renderFilters();
}

function renderTasks() {
  // 1) clear listContainer
  listContainer.innerHTML = "";

  // 2) get visible tasks
  const tasks = getVisibleTasks();

  // 3) create HTML string per task
  for (const task of tasks) {
    const taskHtml = createTaskElement(task);
    // 4) append to listContainer
    listContainer.insertAdjacentHTML("beforeend", taskHtml);
  }
}

function renderEmptyState() {
  // TODO: if no visible tasks, show emptyState, else hide it
  const visibleTasks = getVisibleTasks();
  if (visibleTasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

function renderFilters() {
  // TODO: set selected_filter class on active filter button only
  filterButtons.forEach((btn) => {
    if (btn.innerHTML.toLowerCase() === state.activeFilter) {
      btn.classList.add("selected_filter");
    } else {
      btn.classList.remove("selected_filter");
    }
  });
}

function createTaskElement(task) {
  const taskHTML = `
    <article class="task_item">
      <div id="${task.id}" class="article_btn mark_complete ${task.completed ? "marked" : ""}">
        <svg
        id="check"
          class="mark_sign"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      
      <div>
        <h3 class="task_title">${task.title}</h3>
        <p class="task_detail">Created: ${formatCreatedDate(task.createdAt)}</p>
        <p class="task_detail">Due: ${task.dueAt ? formatDueDate(task.dueAt) : "--"}</p>
      </div>
      
      
      <div id="${task.id}" class="article_btn delete">
        <svg
        id="delete"
          class="delete_btn"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </article>
    `;

  return taskHTML;
}

function formatCreatedDate(isoDate) {
  const createdAt = new Date(isoDate);

  if (Number.isNaN(createdAt.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs <= 0) {
    return "just now";
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 6) {
    if (diffMinutes < 1) {
      return `${diffSeconds} ${diffSeconds === 1 ? "second" : "seconds"} ago`;
    }

    if (diffHours < 1) {
      return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
    }

    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }

  return createdAt.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDueDate(isoDate) {
  // TODO: return readable "Due" text
  return isoDate || "No deadline";
}

// -----------------------------
// Start App
// -----------------------------

initApp();
