const taskInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const remove = document.querySelector(".btn--remove");
const taskList = document.querySelector(".task-list");
const miniNav = document.querySelector(".mini--nav");
const noItem = document.querySelector(".message");

let taskes = [];
let currentFilter = "all";
/////Adding the task to the DOM
function showMessage(taskes) {
  if (taskes.length === 0) {
    noItem.style.display = "flex";
    return;
  } else {
    noItem.style.display = "none";
  }
}

function renderTaskList(taskes) {
  taskList.innerHTML = "";
  showMessage(taskes);
  if (taskes.length > 0)
    taskes?.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";
      li.dataset.id = task.id;

      li.innerHTML = `
    <div class='task--wrapper'>
    <input type="checkbox" class='check-box' ${task.completed ? "checked" : ""}   />
    <div class="task--content">

        <p class="task-desc" style="text-decoration: ${
          task.completed ? "line-through" : "none"
        }">
  ${task.title}
</p>
        <time>${task.Timestamp}</time>

        </div>
        </div>
        <button class='btn--remove'>
        <ion-icon name="trash-outline" class='remove' role='button'></ion-icon></button>
     
    `;

      taskList.appendChild(li);
    });
}

////Adding new Task to array of taskes
function handleAddTask(e) {
  e.preventDefault();

  const value = taskInput.value.trim();
  if (!value) return;

  const newTask = {
    id: Math.random(),
    title: value,
    Timestamp: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(Date.now()),
    completed: false,
  };

  taskes.unshift(newTask);

  renderTaskList(taskes);
  // const span = document.createElement("span");

  // span.className = "task--length";

  // span.innerText = `${taskes.length}`;
  // miniNav.appendChild(span);
  taskInput.value = "";
}
addBtn.addEventListener("click", (e) => handleAddTask(e));

/////For Toggling mini nav

miniNav.addEventListener("click", function (e) {
  e.preventDefault();

  const link = e.target.closest("a");
  if (!link) return;

  document.querySelectorAll(".mini--nav a").forEach((el) => {
    el.classList.remove("nav--active");
  });

  link.classList.add("nav--active");
});

/////Handling the delete task

taskList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const id = +taskEl.dataset.id;

  // add animation class
  taskEl.classList.add("removing");

  // wait for animation to finish
  setTimeout(() => {
    taskes = taskes.filter((task) => task.id !== id);
    // taskes = taskes.filter((task) => task.completed !== true);

    renderTaskList(getFilteredTasks());
  }, 300);
});

// Handle task completion (checkbox change)
taskList.addEventListener("change", function (e) {
  if (!e.target.classList.contains("check-box")) return;

  const task = e.target.closest(".task");
  const taskDesc = task.querySelector(".task-desc");
  const id = +task.dataset.id;

  // Update the main task list
  const currentTask = taskes.find((t) => t.id === id);

  currentTask.completed = e.target.checked;

  renderTaskList(getFilteredTasks());
  // console.log("tasks:", taskes);
});

// Handle miniNav filter clicks
miniNav.addEventListener("click", (e) => {
  e.preventDefault();
  const link = e.target.closest("a");
  if (!link) return;

  currentFilter = link.getAttribute("href");

  renderTaskList(getFilteredTasks());
});

function getFilteredTasks() {
  if (currentFilter === "active") {
    return taskes.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return taskes.filter((task) => task.completed);
  }

  return taskes; // all
}
