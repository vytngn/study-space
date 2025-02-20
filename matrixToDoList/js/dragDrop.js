document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");

    // Handle quadrant clicks for adding tasks
    document.querySelectorAll(".quadrant").forEach(quadrant => {
        quadrant.addEventListener("click", () => {
            const taskText = taskInput.value.trim();
            if (taskText === "") return; // Ignore empty tasks

            addTaskToQuadrant(quadrant.id, taskText);
            taskInput.value = ""; // Clear input
        });
    });

    setupDragAndDrop(); // Enable drag & drop
    loadTasks(); // Load tasks on page load
});

// Function to add a task to a quadrant
function addTaskToQuadrant(quadrantId, taskText) {
    const taskList = document.querySelector(`#${quadrantId} .task-list`);

    const taskItem = document.createElement("li");
    taskItem.setAttribute("draggable", "true");
    taskItem.classList.add("task-item");

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

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-task");
    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    // Set drag event
    taskItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", taskText);
        taskItem.classList.add("dragging");
    });

    taskItem.addEventListener("dragend", () => {
        taskItem.classList.remove("dragging");
    });

    // Append elements
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    saveTasks();
}

// Function to enable drag & drop functionality
function setupDragAndDrop() {
    document.querySelectorAll(".quadrant").forEach(quadrant => {
        quadrant.addEventListener("dragover", (e) => {
            e.preventDefault();
            quadrant.classList.add("drag-over");
        });

        quadrant.addEventListener("dragleave", () => {
            quadrant.classList.remove("drag-over");
        });

        quadrant.addEventListener("drop", (e) => {
            e.preventDefault();
            quadrant.classList.remove("drag-over");

            const taskText = e.dataTransfer.getData("text/plain");
            if (taskText) {
                addTaskToQuadrant(quadrant.id, taskText);
                removeOriginalTask(taskText); // Remove from old quadrant
            }
        });
    });
}

// Function to remove the original task after moving it
function removeOriginalTask(taskText) {
    document.querySelectorAll(".task-item").forEach(task => {
        if (task.querySelector("span").textContent === taskText) {
            task.remove();
        }
    });
    saveTasks();
}
