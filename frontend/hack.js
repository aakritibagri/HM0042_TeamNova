// Hackathon Data
const hackathons = [
    {
        id: '67cb6f39081205ceb30f942d',
        title: 'HackMIT 2025',
        description: 'One of the biggest student hackathons by MIT.',
        startDate: 'April 7, 2025',
        endDate: 'April 22, 2025',
        location: 'MIT Campus & Virtual',
        category: 'Software, AI, Innovation',
        eligibility: 'Open to all students worldwide',
        registerLink: `reg.html?id=67cb6f39081205ceb30f942d`
    },
    {
        id: 'ethindia-2025',
        title: 'ETHIndia 2025',
        description: 'Focused on blockchain and web3 development.',
        startDate: 'August 15, 2025',
        endDate: 'August 30, 2025',
        location: 'Bangalore, India & Virtual',
        category: 'Blockchain, Web3, DeFi',
        eligibility: 'Open to developers worldwide',
        registerLink: 'https://ethindia.co'
    },
    {
        id: 'angelhack-2025',
        title: 'AngelHack Global Series 2025',
        description: 'International hackathon series for developers and entrepreneurs.',
        startDate: 'May 1, 2025',
        endDate: 'May 20, 2025',
        location: 'Multiple Locations & Virtual',
        category: 'Multiple Domains',
        eligibility: 'Open to all developers',
        registerLink: 'https://angelhack.com'
    },
    // Add all other hackathons here...
];

// Current selected hackathon for registration
let currentHackathon = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    renderHackathons(hackathons);
    const hackathonList = document.getElementById("hackathon-list");
    try {
        const response = await fetch("http://localhost:5000/api/competitions/hackathons/upcoming");
        const hackathons = await response.json();

        // Clear the list before adding new ones
        hackathonList.innerHTML = "";

        // Loop through hackathons and display them
        hackathons.forEach(hackathon => {
            const hackathonItem = document.createElement("div");
            hackathonItem.classList.add("hackathon-item");
            hackathonItem.innerHTML = `
                <h3>${hackathon.title}</h3>
                <p>${hackathon.description}</p>
                <p><strong>Location:</strong> ${hackathon.location}</p>
                <p><strong>Date:</strong> ${new Date(hackathon.startDate).toDateString()} - ${new Date(hackathon.endDate).toDateString()}</p>
            `;
            hackathonList.appendChild(hackathonItem);
        });
    } catch (error) {
        console.error("Error fetching hackathons:", error);
    }
});

// Render hackathon cards
function renderHackathons(hackathonList) {
    const grid = document.getElementById('hackathonGrid');
    grid.innerHTML = '';

    hackathonList.forEach(hackathon => {
        const card = document.createElement('div');
        card.className = 'hackathon-card';
        card.onclick = () => showPopup(hackathon);

        card.innerHTML = `
            <h3>${hackathon.title}</h3>
            <p>${hackathon.description}</p>
            <p><b>Start Date:</b> ${hackathon.startDate}</p>
            <p><b>End Date:</b> ${hackathon.endDate}</p>
        `;

        grid.appendChild(card);
    });
}

// Show popup with hackathon details
function showPopup(hackathon) {
    currentHackathon = hackathon;
    
    document.getElementById('popupTitle').textContent = hackathon.title;
    document.getElementById('popupLocation').textContent = hackathon.location;
    document.getElementById('popupDuration').textContent = `${hackathon.startDate} - ${hackathon.endDate}`;
    document.getElementById('popupCategory').textContent = hackathon.category;
    document.getElementById('popupEligibility').textContent = hackathon.eligibility;
    document.getElementById('popupDescription').textContent = hackathon.description;
    
    document.getElementById('popupOverlay').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    currentHackathon = null;
}

// Register for hackathon
function register() {
    if (currentHackathon) {
        // Redirect to reg.html with hackathon ID as query parameter
        window.location.href = `reg.html?id=${currentHackathon.id}`;
    }
}

// Save event for later
function saveEvent() {
    if (currentHackathon) {
        const savedEvents = JSON.parse(localStorage.getItem('savedHackathons') || '[]');
        if (!savedEvents.includes(currentHackathon.id)) {
            savedEvents.push(currentHackathon.id);
            localStorage.setItem('savedHackathons', JSON.stringify(savedEvents));
            alert('Event saved successfully!');
        } else {
            alert('Event already saved!');
        }
    }
}

// Filter hackathons by search input
function filterHackathons() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = hackathons.filter(hackathon => 
        hackathon.title.toLowerCase().includes(searchTerm) ||
        hackathon.description.toLowerCase().includes(searchTerm) ||
        hackathon.category.toLowerCase().includes(searchTerm)
    );
    renderHackathons(filtered);
}

// Filter hackathons by month
function filterByMonth(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const now = new Date();
    let filtered = hackathons;

    if (filter === 'upcoming') {
        filtered = hackathons.filter(hackathon => new Date(hackathon.startDate) > now);
    } else if (filter === 'thisMonth') {
        filtered = hackathons.filter(hackathon => {
            const startDate = new Date(hackathon.startDate);
            return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
        });
    }

    renderHackathons(filtered);
}

// Close popup when clicking outside
document.getElementById('popupOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('popupOverlay')) {
        closePopup();
    }
});