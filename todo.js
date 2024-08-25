

let lastRemovedTask = null;
let removedTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskInput.value;
        
        const span = document.createElement('span');
        span.textContent = '✖';
        span.onclick = function() {
            removeTask(li);
        };
        
        li.appendChild(span);
        taskList.appendChild(li);
        
        taskInput.value = '';
        lastRemovedTask = null; // Reset the last removed task
        document.getElementById('undoButton').style.display = 'none'; // Hide undo button
        document.getElementById('undoAllButton').style.display = removedTasks.length > 0 ? 'inline-block' : 'none'; // Hide undo all button if no tasks are removed
    }
}

function removeTask(taskElement) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskElement);
    lastRemovedTask = taskElement;
    removedTasks.push(taskElement); // Store the removed task in the array
    document.getElementById('undoButton').style.display = 'inline-block'; // Show undo button
    document.getElementById('undoAllButton').style.display = 'inline-block'; // Show undo all button
}

function undoLastTask() {
    if (lastRemovedTask) {
        const taskList = document.getElementById('taskList');
        taskList.appendChild(lastRemovedTask);
        removedTasks.pop(); // Remove the last task from the removed tasks array
        lastRemovedTask = null; // Clear the last removed task after undo
        document.getElementById('undoButton').style.display = 'none'; // Hide undo button
        document.getElementById('undoAllButton').style.display = removedTasks.length > 0 ? 'inline-block' : 'none'; // Hide undo all button if no tasks are removed
    }
}

function undoAllTasks() {
    const taskList = document.getElementById('taskList');
    while (removedTasks.length > 0) {
        taskList.appendChild(removedTasks.pop()); // Reinsert all removed tasks
    }
    lastRemovedTask = null; // Clear the last removed task
    document.getElementById('undoButton').style.display = 'none'; // Hide undo button
    document.getElementById('undoAllButton').style.display = 'none'; // Hide undo all button
}
