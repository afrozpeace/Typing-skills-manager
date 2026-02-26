const textArea = document.getElementById("textArea");
const timerDisplay = document.getElementById("timer");
const clockDisplay = document.getElementById("clock");
const wpsDisplay = document.getElementById("wps");
const cpsDisplay = document.getElementById("cps");
const spmDisplay = document.getElementById("spm");
const resetBtn = document.getElementById("resetBtn");

// local variables for timer and stats
let timerInterval;
let seconds = 0;
let isRunning = false;

// Live Clock
function updateClock() {
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Format Timer
function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Start Timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
            calculateStats();
        }, 1000);
    }
}

// Stop Timer
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Calculate Stats
function calculateStats() {
    const text = textArea.value.trim();
    const words = text.length > 0 ? text.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    const timeInSeconds = seconds || 1;

    wpsDisplay.textContent = (words / timeInSeconds).toFixed(2);
    cpsDisplay.textContent = (chars / timeInSeconds).toFixed(2);
    spmDisplay.textContent = ((sentences / timeInSeconds) * 60).toFixed(2);
}

// Events
textArea.addEventListener("focus", startTimer);
textArea.addEventListener("blur", stopTimer);
textArea.addEventListener("input", calculateStats);

// Reset
resetBtn.addEventListener("click", () => {
    stopTimer();
    seconds = 0;
    timerDisplay.textContent = "00:00";
    textArea.value = "";
    wpsDisplay.textContent = 0;
    cpsDisplay.textContent = 0;
    spmDisplay.textContent = 0;
});