// Hackathon Data
const CP=[
    {
        id: 'cp-battle-2025',
        title: 'CP Battle 2025',
        description: 'Competitive Programming challenge.',
        startDate: 'April 3, 2025',
        endDate: 'April 4, 2025',
        location: 'Online',
        category: 'Competitive Programming',
        eligibility: 'Open to all',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    },
    {
        id: 'cp-masters-2025',
        title: 'CP Masters 2025',
        description: 'Master level CP contest.',
        startDate: 'April 18, 2025',
        endDate: 'April 19, 2025',
        location: 'Virtual',
        category: 'Competitive Programming',
        eligibility: 'Students & developers',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    },
    {
        id: 'algo-rush-2025',
        title: 'Algo Rush 2025',
        description: 'CP sprint with tough algorithms.',
        startDate: 'May 8, 2025',
        endDate: 'May 9, 2025',
        location: 'Hybrid',
        category: 'Competitive Programming',
        eligibility: 'Worldwide',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    },
    {
        id: 'code-wars-2025',
        title: 'Code Wars 2025',
        description: 'Intense CP competition.',
        startDate: 'June 18, 2025',
        endDate: 'June 19, 2025',
        location: 'Online',
        category: 'Competitive Programming',
        eligibility: 'Open for all',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    },
    {
        id: 'cp-marathon-2025',
        title: 'CP Marathon 2025',
        description: 'Non-stop coding marathon.',
        startDate: 'July 23, 2025',
        endDate: 'July 24, 2025',
        location: 'Virtual',
        category: 'Competitive Programming',
        eligibility: 'All students & developers',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    },
    {
        id: 'cp-worldcup-2025',
        title: 'CP World Cup 2025',
        description: 'Global CP tournament.',
        startDate: 'August 17, 2025',
        endDate: 'August 18, 2025',
        location: 'Hybrid',
        category: 'Competitive Programming',
        eligibility: 'Worldwide',
        registerButton: '<a href="/create"><button>Register Now</button></a>'
    }
];

// Current selected hackathon for registration
let currentHackathon = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderHackathons(hackathons);
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
        window.location.href = currentHackathon.registerLink;
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