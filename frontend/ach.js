// Sample Competitions Data
const competitions = [
    { name: "DSA Challenge", date: "2025-02-20", rank: 2, status: "Completed" },
    { name: "AI Hackathon", date: "2025-02-25", rank: 5, status: "Completed" },
    { name: "Web Dev Contest", date: "2025-03-10", rank: "N/A", status: "Upcoming" }
];

// Sample Achievements Data
const achievements = [
    { title: "Top 5 in DSA Challenge", date: "2025-02-20" },
    { title: "Best AI Project Award", date: "2025-02-25" }
];

// Function to Load Competitions
function loadCompetitions() {
    const compList = document.getElementById("competitions-list");
    compList.innerHTML = "";
    
    competitions.forEach(comp => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `📅 <strong>${comp.name}</strong> - ${comp.date} (${comp.status}, Rank: ${comp.rank})`;
        compList.appendChild(listItem);
    });
}

// Function to Load Achievements
function loadAchievements() {
    const achList = document.getElementById("badges-list");
    achList.innerHTML = "";
    
    achievements.forEach(ach => {
        let badge = document.createElement("span");
        badge.classList.add("badge");
        badge.innerText = ach.title;
        achList.appendChild(badge);
    });
}

// Function to Update Progress Bar
function updateProgress() {
    let points = 500;  // Example: Fetch dynamically later
    let progressBar = document.getElementById("progress-bar");
    let percentage = (points / 1000) * 100;
    progressBar.style.width = `${percentage}%`;
}

// Function to Load Milestones
function loadMilestones() {
    const milestonesList = document.getElementById("milestones-list");
    milestonesList.innerHTML = `
        <li>✅ First 10 Sales Completed</li>
        <li>✅ ₹1,00,000 Revenue Earned</li>
        <li>${competitions.length >= 5 ? '✅' : '🔒'} 5 Competitions Participated</li>
    `;
}

// Load All Data on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadCompetitions();
    loadAchievements();
    updateProgress();
    loadMilestones();
});
