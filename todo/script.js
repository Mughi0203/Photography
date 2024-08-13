
function showNotification(message, type) {
    const notificationBar = document.getElementById('notificationBar');
    notificationBar.textContent = message;
    notificationBar.className = `notification-bar ${type}`;
    notificationBar.style.display = 'block';

    setTimeout(() => {
        notificationBar.style.opacity = 0;
        setTimeout(() => {
            notificationBar.style.display = 'none';
            notificationBar.style.opacity = 1; 
        }, 500); 
    }, 3000); 
}


function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        showNotification('Please enter a task!', 'error');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Delete</button>
    `;

    taskList.appendChild(listItem);
    input.value = '';
    showNotification('Task added successfully!', 'success');
}


function removeTask(button) {
    button.parentElement.remove();
    showNotification('Task removed successfully!', 'info');
}
