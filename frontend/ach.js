document.addEventListener("DOMContentLoaded", () => {
    const points = 500;
    const maxPoints = 1000;
    const progressBar = document.getElementById("progress-bar");

    const progress = (points / maxPoints) * 100;
    progressBar.style.width = progress + "%";
});
