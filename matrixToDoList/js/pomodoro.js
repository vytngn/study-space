document.addEventListener("DOMContentLoaded", () => {
    let floatingTimer = null;
    let floatingTimeLeft = 25 * 60; // Default: 25 minutes
    const floatingTimerDisplay = document.getElementById("floatingTimer");
    const startFloatingButton = document.getElementById("startFloatingTimer");
    const resetFloatingButton = document.getElementById("resetFloatingTimer");
    const toggleButton = document.getElementById("toggleTimer");
    const pomodoroWidget = document.querySelector(".pomodoro-widget");
    const timerSelect = document.getElementById("timerSelect");

    function updateFloatingTimerDisplay() {
        const minutes = Math.floor(floatingTimeLeft / 60);
        const seconds = floatingTimeLeft % 60;
        floatingTimerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startFloatingTimer() {
        if (!floatingTimer) {
            floatingTimer = setInterval(() => {
                if (floatingTimeLeft > 0) {
                    floatingTimeLeft--;
                    updateFloatingTimerDisplay();
                } else {
                    clearInterval(floatingTimer);
                    floatingTimer = null;
                    alert("Pomodoro complete! Take a break. ☕");
                }
            }, 1000);
        }
    }

    function resetFloatingTimer() {
        clearInterval(floatingTimer); // Stop the running timer
        floatingTimer = null;
        floatingTimeLeft = parseInt(timerSelect.value) * 60; // Set correct time
        updateFloatingTimerDisplay();
    }

    // Ensure the timer resets properly when changing selection
    timerSelect.addEventListener("change", resetFloatingTimer);

    // Toggle Minimize/Expand
    toggleButton.addEventListener("click", () => {
        pomodoroWidget.classList.add("hidden");
    });

    startFloatingButton.addEventListener("click", startFloatingTimer);
    resetFloatingButton.addEventListener("click", resetFloatingTimer);

    updateFloatingTimerDisplay();
});
