
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const validationMsg = document.getElementById('validationMessage');
const filterBtns = document.querySelectorAll('.filter-btn');
const taskCount = document.getElementById('taskCount');


let tasks = [];
let currentFilter = 'all';


const savedTasks = localStorage.getItem('focusFlowTasks');
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
} else {
    tasks = [
        { id: Date.now(), title: 'Learn JavaScript', timestamp: new Date().toLocaleString(), completed: false },
        { id: Date.now() + 1, title: 'Build a project', timestamp: new Date().toLocaleString(), completed: false }
    ];
}


function saveTasks() {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
}

function getTime() {
    return new Date().toLocaleString();
}

function showMessage(msg, isError = true) {
    validationMsg.textContent = msg;
    validationMsg.style.color = isError ? '#ff5722' : '#4CAF50';
    if (!isError) setTimeout(() => validationMsg.textContent = '', 2000);
}


function addTask() {
    const title = taskInput.value.trim();
    
    if (!title) return showMessage('Task cannot be empty!');
    if (title.length < 3) return showMessage('Minimum 3 characters required!');
    
    tasks.unshift({
        id: Date.now(),
        title: title,
        timestamp: getTime(),
        completed: false
    });
    
    taskInput.value = '';
    saveTasks();
    renderTasks();
    showMessage('✅ Task added!', false);
}


function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    let filtered = tasks;
    if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);
    
    if (filtered.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">📝 No tasks for today!</div>';
        taskCount.textContent = `${tasks.length} total`;
        return;
    }
    
    tasksList.innerHTML = filtered.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div>
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-timestamp">📅 ${task.timestamp}</div>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? '✓' : '○'}</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    let countMsg = filtered.length;
    if (currentFilter === 'all') countMsg = `${tasks.length} total`;
    else if (currentFilter === 'active') countMsg = `${filtered.length} active`;
    else countMsg = `${filtered.length} completed`;
    taskCount.textContent = countMsg;
}


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});


function escapeHtml(text) {
    return text.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());


renderTasks();