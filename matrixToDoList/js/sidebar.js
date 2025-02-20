document.addEventListener("DOMContentLoaded", () => {
    const pomodoroWidget = document.querySelector(".pomodoro-widget");
    const showTimerButton = document.getElementById("showTimer");

    showTimerButton.addEventListener("click", () => {
        pomodoroWidget.classList.remove("hidden");
    });
});
