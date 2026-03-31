const taskInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const remove = document.querySelector(".btn--remove");
const taskList = document.querySelector(".task-list");
const miniNav = document.querySelector(".mini--nav");

const taskes = [];
taskList.innerHTML = "";

if (taskes.length === 0) {
  const noItem = document.createElement("p");
  noItem.textContent = "There is no Task to show!!";
  taskList.appendChild(noItem);
}
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
  };

  taskes.push(newTask);
  // console.log(newTask);
  taskList.innerHTML = "";

  taskes.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
    <div class='task--wrapper'>
    <input type="checkbox" />
    <div class="task--content">

        <p>${task.title}</p>
        <time>${task.Timestamp}</time>

        </div>
        </div>
        <button class='btn--remove'>
        <ion-icon name="trash-outline"></ion-icon></button>
     
    `;

    taskList.appendChild(li);
  });

  taskInput.value = "";
}
addBtn.addEventListener("click", handleAddTask);

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
function handleDelet(id) {
  console.log(id);
  console.log("this was deleted");
  taskes.filter((task) => task.id !== id);
}

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn--remove")) {
    console.log("Delete button clicked");
  }

  console.log("the list was clicked");
});
