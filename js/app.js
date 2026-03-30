const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];


addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();


    if (text.length < 3) {
        alert("Task must be at least 3 characters!");
        return;
    }

    const task = {
        id: Date.now(),
        title: text,
        completed: false,
        time: new Date().toLocaleString()
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
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <br>
                <small>${task.time}</small>
            </div>
            <div class="actions">
                <button class="complete" data-id="${task.id}">✔</button>
                <button class="delete" data-id="${task.id}">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


taskList.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("complete")) {
        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id !== id);
    }

    renderTasks();
});


document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        renderTasks(btn.dataset.filter);
    });
});