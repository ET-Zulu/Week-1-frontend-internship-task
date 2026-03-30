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
    if (tasks.length === 0) {
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
    
    console.log('Task added:', newTask);
    updateEmptyState();
}


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

updateEmptyState();
console.log('Task Manager initialized');