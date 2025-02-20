document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");

    // Handle quadrant clicks for adding tasks
    document.querySelectorAll(".quadrant").forEach(quadrant => {
        quadrant.addEventListener("click", () => {
            const taskText = taskInput.value.trim();
            if (taskText === "") return; // Ignore empty tasks

            addTaskToQuadrant(quadrant.id, taskText);
            taskInput.value = ""; // Clear input after adding
        });

        // Show placeholder if empty
        updatePlaceholder(quadrant);
    });

    loadTasks(); // Load saved tasks on page load
});

// Function to add a task to a quadrant
function addTaskToQuadrant(quadrantId, taskText) {
    const taskList = document.querySelector(`#${quadrantId} .task-list`);
    const placeholder = taskList.parentElement.querySelector(".empty-message");

    const taskItem = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", () => {
        taskItem.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    // Task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;

    // Remove button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.classList.add("delete-task");
    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
        updatePlaceholder(taskList.parentElement); // Ensure message updates after deletion
        saveTasks();
    });

    // Append elements
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // Hide empty message
    updatePlaceholder(taskList.parentElement);

    saveTasks();
}

// Function to update empty state message
function updatePlaceholder(quadrant) {
    const taskList = quadrant.querySelector(".task-list");
    let placeholder = quadrant.querySelector(".empty-message");

    if (!placeholder) {
        placeholder = document.createElement("p");
        placeholder.classList.add("empty-message");
        quadrant.appendChild(placeholder);
    }

    // Funny empty state messages
    const messages = [
        "Nothing to do? Must be nice! 😎",
        "Maybe add a task... or not! 🤷",
        "You have mastered procrastination!",
        "This list is empty, just like my fridge. 🍕",
        "Add something before your boss sees!"
    ];

    placeholder.textContent = messages[Math.floor(Math.random() * messages.length)];

    // Show the message if there are no tasks, otherwise fade it out
    if (taskList.children.length === 0) {
        placeholder.classList.remove("hidden");
    } else {
        placeholder.classList.add("hidden");
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = {};
    document.querySelectorAll(".quadrant").forEach(quadrant => {
        const taskList = quadrant.querySelector(".task-list");
        const tasksArray = [];

        taskList.querySelectorAll("li").forEach(taskItem => {
            const text = taskItem.querySelector("span").textContent;
            const completed = taskItem.querySelector(".task-checkbox").checked;
            tasksArray.push({ text, completed });
        });

        tasks[quadrant.id] = tasksArray;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    Object.keys(tasks).forEach(quadrantId => {
        const taskList = document.querySelector(`#${quadrantId} .task-list`);
        tasks[quadrantId].forEach(task => {
            addTaskToQuadrant(quadrantId, task.text);
            const lastTask = taskList.lastChild;
            lastTask.querySelector(".task-checkbox").checked = task.completed;
            if (task.completed) {
                lastTask.classList.add("completed");
            }
        });

        updatePlaceholder(document.getElementById(quadrantId));
    });
}
