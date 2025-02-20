document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    // Change button text based on mode
    document.getElementById("darkModeToggle").textContent = isDarkMode ? "🌞 Toggle Normal Mode" : "🌙 Toggle Dark Mode";
});

// Apply dark mode on page load if previously enabled
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").textContent = "🌞 Toggle Normal Mode";
    }
});
