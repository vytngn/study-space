document.addEventListener("DOMContentLoaded", () => {
    const widget = document.querySelector(".pomodoro-widget");
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    widget.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        widget.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        // Calculate new position
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;

        // Apply transformation (much smoother than `left/top`)
        widget.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        widget.style.cursor = "grab";
    });

    // Prevent text selection while dragging
    widget.addEventListener("dragstart", (e) => e.preventDefault());
});
