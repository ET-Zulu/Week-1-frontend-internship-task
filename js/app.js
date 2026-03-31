const taskInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const taskList = document.querySelector(".task-list");

const taskes = [];

function handleAddTask(e) {
  e.preventDefault();
  taskList.innerHTML = "";

  if (taskes.length === 0) {
    const noItem = document.createElement("p");
    noItem.textContent = "There is no Task to show!!";
    taskList.appendChild(noItem);
    return;
  }

  const value = taskInput.value.trim();
  if (!value) return;

  const newTask = {
    title: value,
    Timestamp: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(Date.now()),
  };

  taskes.push(newTask);

  taskList.innerHTML = "";

  taskes.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <input type="checkbox" />
      <div class="task--content">
        <p>${task.title}</p>
        <time>${task.Timestamp}</time>
      </div>
    `;

    taskList.appendChild(li);
  });

  taskInput.value = "";
}
addBtn.addEventListener("click", handleAddTask);
