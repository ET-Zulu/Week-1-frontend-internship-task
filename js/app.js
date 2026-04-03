const taskInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const remove = document.querySelector(".btn--remove");
const taskList = document.querySelector(".task-list");
const miniNav = document.querySelector(".mini--nav");
const noItem = document.querySelector(".message");

let taskes = [];
let completedTask = [];

/////Adding the task to the DOM

function renderTaskList(taskes) {
  taskList.innerHTML = "";

  if (taskes.length === 0) {
    noItem.style.display = "flex";
    return;
  } else {
    noItem.style.display = "none";
  }
  if (taskes.length > 0)
    taskes?.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";
      li.dataset.id = task.id;

      li.innerHTML = `
    <div class='task--wrapper'>
    <input type="checkbox" class='check-box' ${task.completed ? "checked" : ""}   />
    <div class="task--content">

        <p class="task-desc" }>${task.title}</p>
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
  const task = e.target.closest(".task");
  const id = +task.dataset.id;
  // console.log(task.completed);

  if (e.target.classList.contains("remove")) {
    taskes = taskes.filter((task) => task.id !== id);
    renderTaskList(taskes);
    ////For completed task
    completedTask = completedTask.filter((task) => task.id !== id);
    renderTaskList(completedTask);
  }
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

  // Update line-through style
  taskDesc.style.textDecoration = currentTask.completed
    ? "line-through"
    : "none";

  // Update completedTask array
  if (currentTask.completed) {
    if (!completedTask.some((t) => t.id === id)) {
      completedTask.unshift(currentTask);
    }
  }

  console.log("Completed tasks:", completedTask);
});

// Handle miniNav filter clicks
miniNav.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");

  if (href === "all") {
    renderTaskList(taskes);
  }
  if (href === "active") {
    const active = taskes.filter((task) => task.completed == false);

    renderTaskList(active);
  }
  if (href === "completed") {
    renderTaskList(completedTask);
  }
});
