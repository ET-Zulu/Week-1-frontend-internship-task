const taskInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const remove = document.querySelector(".btn--remove");
const taskList = document.querySelector(".task-list");
const miniNav = document.querySelector(".mini--nav");

let taskes = [];
const completedTask = [];
taskList.innerHTML = "";

/////Adding the task to the DOM

function renderTaskList(taskes) {
  taskList.innerHTML = "";

  taskes?.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = task.id;

    li.innerHTML = `
    <div class='task--wrapper'>
    <input type="checkbox"class='check-box' />
    <div class="task--content">

        <p class="task-desc">${task.title}</p>
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

  if (newTask.completed === true) {
    completedTask.push(newTask);
  }

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

taskList.addEventListener("click", (e) => {
  const checkbox = e.target.closest("input[type='checkbox']");
  if (!checkbox) return;

  const li = checkbox.closest(".task");
  const id = Number(li.dataset.id);
});

///// Handling the line througn property
taskList.addEventListener("change", function (e) {
  if (e.target.classList.contains("check-box")) {
    const isChecked = e.target.checked;
    const task = e.target.closest(".task");
    const taskDesc = task.querySelector(".task-desc");

    const id = +task.dataset.id;

    const completArray = taskes.find((task) => task.id == id);
    console.log("INITIAL:", completedTask);
    if (isChecked) {
      taskDesc.style.textDecoration = "line-through";
      completedTask.unshift(completArray);
    } else {
      taskDesc.style.textDecoration = "none";

      const index = completedTask.findIndex((t) => t.id == id);
      if (index !== -1) {
        completedTask.splice(index, 1);
      }
    }
  }
  // console.log(completedTask);
});

/////Handling the delete task

// function handleDelete(e) {}
taskList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) return;
  const task = e.target.closest(".task");
  const id = +task.dataset.id;

  if (e.target.classList.contains("remove")) {
    taskes = taskes.filter((task) => task.id !== id);
    renderTaskList(taskes);
    console.log(taskes);
  }
});
if (taskes.length === 0) {
  const noItem = document.createElement("p");
  noItem.textContent = "There is no Task to show!!";
  noItem.style.fontSize = "18px";
  noItem.style.paddingTop = "20px";
  taskList.appendChild(noItem);
}
