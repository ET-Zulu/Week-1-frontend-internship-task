document.addEventListener("DOMContentLoaded", () => {

  const taskInput = document.getElementById("taskInput");

  const addBtn = document.getElementById("addBtn");

  const taskList = document.getElementById("taskList");

  const filters = document.querySelectorAll(".filter");



  let tasks = [];



  addBtn.addEventListener("click", () => {



    const text = taskInput.value.trim();



    if (text.length < 3) {

      alert("Task must be at least 3 characters");

      return;

    }



    const task = {

      id: Date.now(),

      title: text,

      completed: false

    };



    tasks.push(task);



    taskInput.value = "";



    renderTasks();

  });



  function renderTasks(filter = "all") {



    taskList.innerHTML = "";



    let filteredTasks = tasks;



    if (filter === "active") {

      filteredTasks = tasks.filter(t => !t.completed);

    }



    if (filter === "completed") {

      filteredTasks = tasks.filter(t => t.completed);

    }



    if (filteredTasks.length === 0) {

      taskList.innerHTML = "<p class='empty'>No tasks for today!</p>";

      return;

    }



    filteredTasks.forEach(task => {



      const div = document.createElement("div");



      div.classList.add("task");



      if (task.completed) {

        div.classList.add("completed");

      }



      div.innerHTML = `

<div>

<input type="checkbox" ${task.completed ? "checked" : ""}>

<span>${task.title}</span>

</div>



<button class="delete">Delete</button>

`;



      div.querySelector("input").addEventListener("change", () => {

        task.completed = !task.completed;

        renderTasks(filter);

      });



      div.querySelector(".delete").addEventListener("click", () => {

        tasks = tasks.filter(t => t.id !== task.id);

        renderTasks(filter);

      });



      taskList.appendChild(div);

    });



  }



  filters.forEach(btn => {

    btn.addEventListener("click", () => {

      renderTasks(btn.dataset.filter);

    });

  });



});