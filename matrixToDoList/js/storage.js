function saveTasks() {
    const tasks = {};
    document.querySelectorAll(".task-list").forEach(list => {
        const quadrantId = list.parentElement.id;
        tasks[quadrantId] = Array.from(list.children).map(task => task.textContent.replace("❌", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    Object.keys(tasks).forEach(quadrantId => {
        const list = document.querySelector(`#${quadrantId} .task-list`);
        tasks[quadrantId].forEach(taskText => {
            const taskItem = document.createElement("li");
            taskItem.textContent = taskText;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-task");
            deleteBtn.addEventListener("click", () => {
                taskItem.remove();
                saveTasks();
            });

            taskItem.appendChild(deleteBtn);
            list.appendChild(taskItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    document.body.addEventListener("click", saveTasks);
});
