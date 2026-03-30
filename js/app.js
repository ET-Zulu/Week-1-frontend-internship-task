"use strict";

const state = {
  tasks: [],
  activeFilter: "all",
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
  addTaskButton.addEventListener("click", openModal);
  cancelButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  form.addEventListener("submit", onFormSubmit);
  filtersContainer.addEventListener("click", onFilterClick);
  listContainer.addEventListener("click", onTaskListClick);
}

// -----------------------------
// Event Handlers
// -----------------------------

function onFormSubmit(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const deadline = deadlineInput.value;

  const validation = validateTaskTitle(title);
  if (!validation.valid) {
    showValidationError(validation.message);
    return;
  }

  clearValidationError();

  const newTask = createTask(title, deadline);

  state.tasks.push(newTask);

  clearForm();

  closeModal();

  renderApp();
}

function onFilterClick(event) {
  const clickedBtn = event.target.closest("button");
  if (!clickedBtn) {
    return;
  }

  state.activeFilter = clickedBtn.innerHTML.toLowerCase();

  renderApp();
}

function onTaskListClick(event) {
  const action = event.target.closest("[data-action]");
  if (!action) {
    return;
  }

  const taskId = action.dataset.taskId;
  const clickType = action.dataset.action;
  if (!taskId || !clickType) {
    return;
  }

  if (clickType === "toggle") {
    toggleTaskById(taskId);
  } else if (clickType === "delete") {
    deleteTaskById(taskId);
  }

  renderApp();
}

// -----------------------------
// Task Operations
// -----------------------------

function createTask(title, dueAtValue) {
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
  const task = state.tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
}

function deleteTaskById(taskId) {
  const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    state.tasks.splice(taskIndex, 1);
  }
}

function getVisibleTasks() {
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
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  // Validation currently uses alert, so there is no persistent message to clear.
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
  listContainer.innerHTML = "";

  const tasks = getVisibleTasks();

  for (const task of tasks) {
    const taskHtml = createTaskElement(task);
    listContainer.insertAdjacentHTML("beforeend", taskHtml);
  }
}

function renderEmptyState() {
  const visibleTasks = getVisibleTasks();
  if (visibleTasks.length === 0) {
    emptyState.hidden = false;
    emptyState.style.display = "block";
  } else {
    emptyState.hidden = true;
    emptyState.style.display = "none";
  }
}

function renderFilters() {
  filterButtons.forEach((btn) => {
    if (btn.innerHTML.toLowerCase() === state.activeFilter) {
      btn.classList.add("selected_filter");
    } else {
      btn.classList.remove("selected_filter");
    }
  });
}

function createTaskElement(task) {
  const safeTitle = escapeHtml(task.title);

  const taskHTML = `
    <article class="task_item">
      <div
        class="article_btn mark_complete ${task.completed ? "marked" : ""}"
        data-action="toggle"
        data-task-id="${task.id}"
        role="button"
        tabindex="0"
        aria-label="Toggle task completion"
      >
        <svg
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
        <h3 class="task_title">${safeTitle}</h3>
        <p class="task_detail">Created: ${formatCreatedDate(task.createdAt)}</p>
        <p class="task_detail">Due: ${formatDueDate(task.dueAt)}</p>
      </div>
      
      
      <div
        class="article_btn delete"
        data-action="delete"
        data-task-id="${task.id}"
        role="button"
        tabindex="0"
        aria-label="Delete task"
      >
        <svg
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

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
  if (!isoDate) {
    return "--";
  }

  const dueDate = new Date(isoDate);
  if (Number.isNaN(dueDate.getTime())) {
    return "No deadline";
  }

  return dueDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// -----------------------------
// Start App
// -----------------------------

initApp();
