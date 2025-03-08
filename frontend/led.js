const players = [
    { name: "Aakriti", score: 350 },
    { name: "Rohan", score: 340 },
    { name: "Sneha", score: 420 },
    { name: "Vikram", score: 180 },
    { name: "Kavya", score: 390 },
    { name: "Aryan", score: 470 },
    { name: "Priya", score: 320 },
    { name: "Harshit", score: 410 },
    { name: "Ananya", score: 360 },
    { name: "Siddharth", score: 430 },
    { name: "Megha", score: 285 },
    { name: "Rahul", score: 290 },
    { name: "Pooja", score: 335 },
    { name: "Shubham", score: 480 },
    { name: "Ritika", score: 275 },
    { name: "Nitin", score: 310 },
    { name: "Sanya", score: 495 },
    { name: "Divyansh", score: 500 },
    { name: "Ishita", score: 365 },
    { name: "Gaurav", score: 350 },
    { name: "Simran", score: 200 },
    { name: "Neeraj", score: 450 },
    { name: "Tanmay", score: 315 },
    { name: "Alok", score: 230 },
    { name: "Komal", score: 270 }
];

function updateLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboard-body");
    leaderboardBody.innerHTML = "";

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        const tr = document.createElement("tr");
        let badge = "";

        if (index === 0) badge = "🥇 Gold";
        else if (index === 1) badge = "🥈 Silver";
        else if (index === 2) badge = "🥉 Bronze";

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${badge}</td>
        `;

        leaderboardBody.appendChild(tr);

        setTimeout(() => {
            tr.style.opacity = "1";
            tr.style.transform = "translateY(0)";
        }, index * 100);
    });
}

updateLeaderboard();
