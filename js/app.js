const taskForm = document.getElementById('task-form');
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

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskIdCounter', taskIdCounter);
}

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCounter = localStorage.getItem('taskIdCounter');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    if (savedCounter) {
        taskIdCounter = parseInt(savedCounter);
    }
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
        alert('Task cannot be empty!');
        return false;
    }
    
    if (title.trim().length < 3) {
        alert('Task must be at least 3 characters long!');
        return false;
    }
    
    return true;
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        saveToLocalStorage();
    }
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
    
    if (taskElement) {
        taskElement.style.transform = 'translateX(100%)';
        taskElement.style.opacity = '0';
        
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
            saveToLocalStorage();
        }, 300);
    } else {
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks();
        saveToLocalStorage();
    }
}

function setFilter(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="toggleComplete(${task.id})"
        >
        <div class="task-content">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-timestamp">Created: ${task.timestamp}</div>
        </div>
        <div class="task-actions">
            <button class="toggle-btn" onclick="toggleComplete(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    
    return li;
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
    
    tasks.unshift(newTask);
    taskInput.value = '';
    taskInput.focus();
    
    renderTasks();
    saveToLocalStorage();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

loadFromLocalStorage();
renderTasks();