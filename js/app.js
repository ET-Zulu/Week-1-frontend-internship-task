
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';
let taskIdCounter = 1;


function getTimestamp() {
    const now = new Date();
    return now.toLocaleString();
}

function updateEmptyState() {
    const visibleTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });
    
    if (visibleTasks.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

function isValidTask(title) {
    if (!title.trim()) {
        alert('Please enter a task title');
        return false;
    }
    
    if (title.trim().length < 3) {
        alert('Task title must be at least 3 characters long');
        return false;
    }
    
    return true;
}


function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <div class="task-content">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-timestamp">Created: ${task.timestamp}</div>
        </div>
        <div class="task-actions">
            <button class="toggle-btn">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    return li;
}
     
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    updateEmptyState();
}

function addTask() {
    const title = taskInput.value;
    
    if (!isValidTask(title)) {
        return;
    }
    
    const newTask = {
        id: taskIdCounter++,
        title: title.trim(),
        timestamp: getTimestamp(),
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    taskInput.focus();
    
    renderTasks();
    console.log('Task added:', newTask);
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});


renderTasks();
console.log('Task Manager initialized');