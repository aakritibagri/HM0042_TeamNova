// DSA Event Data
const DSA = [
    {
        id: 'dsa-challenge-2025',
        title: 'DSA Challenge 2025',
        description: 'Test your Data Structures & Algorithms skills.',
        startDate: 'April 5, 2025',
        endDate: 'April 6, 2025',
        location: 'Online',
        category: 'DSA',
        eligibility: 'Open to all',
        registerLink: '/create'
    },
    {
        id: 'dsa-masters-2025',
        title: 'DSA Masters 2025',
        description: 'Advanced-level DSA competition.',
        startDate: 'April 20, 2025',
        endDate: 'April 21, 2025',
        location: 'Virtual',
        category: 'DSA',
        eligibility: 'Students & professionals',
        registerLink: '/create'
    },
    {
        id: 'algo-expert-2025',
        title: 'Algo Expert 2025',
        description: 'Algorithm-heavy DSA contest.',
        startDate: 'May 10, 2025',
        endDate: 'May 11, 2025',
        location: 'Hybrid',
        category: 'DSA',
        eligibility: 'Worldwide',
        registerLink: '/create'
    },
    {
        id: 'dsa-arena-2025',
        title: 'DSA Arena 2025',
        description: 'Intense problem-solving battle.',
        startDate: 'June 20, 2025',
        endDate: 'June 21, 2025',
        location: 'Online',
        category: 'DSA',
        eligibility: 'Open to all',
        registerLink: '/create'
    },
    {
        id: 'dsa-marathon-2025',
        title: 'DSA Marathon 2025',
        description: 'Non-stop DSA marathon.',
        startDate: 'July 25, 2025',
        endDate: 'July 26, 2025',
        location: 'Virtual',
        category: 'DSA',
        eligibility: 'All students & developers',
        registerLink: '/create'
    },
    {
        id: 'dsa-worldcup-2025',
        title: 'DSA World Cup 2025',
        description: 'Global DSA championship.',
        startDate: 'August 19, 2025',
        endDate: 'August 20, 2025',
        location: 'Hybrid',
        category: 'DSA',
        eligibility: 'Worldwide',
        registerLink: '/create'
    }
];

// Current selected event
let currentEvent = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(DSA);
});

// Render event cards
function renderEvents(eventList) {
    const grid = document.getElementById('eventGrid');
    grid.innerHTML = '';

    eventList.forEach(event => {
        const card = document.createElement('div');
        card.className = 'hackathon-card';
        card.onclick = () => showPopup(event);

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><b>Start Date:</b> ${event.startDate}</p>
            <p><b>End Date:</b> ${event.endDate}</p>
        `;

        grid.appendChild(card);
    });
}

// Show popup with event details
function showPopup(event) {
    currentEvent = event;
    
    document.getElementById('popupTitle').textContent = event.title;
    document.getElementById('popupLocation').textContent = event.location;
    document.getElementById('popupDuration').textContent = `${event.startDate} - ${event.endDate}`;
    document.getElementById('popupCategory').textContent = event.category;
    document.getElementById('popupEligibility').textContent = event.eligibility;
    document.getElementById('popupDescription').textContent = event.description;

    document.getElementById('popupOverlay').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    currentEvent = null;
}

// Register for event
function register() {
    if (currentEvent) {
        window.location.href = currentEvent.registerLink;
    }
}

// Save event for later
function saveEvent() {
    if (currentEvent) {
        const savedEvents = JSON.parse(localStorage.getItem('savedDSAEvents') || '[]');
        if (!savedEvents.includes(currentEvent.id)) {
            savedEvents.push(currentEvent.id);
            localStorage.setItem('savedDSAEvents', JSON.stringify(savedEvents));
            alert('Event saved successfully!');
        } else {
            alert('Event already saved!');
        }
    }
}

// Filter events by search input
function filterEvents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = DSA.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.category.toLowerCase().includes(searchTerm)
    );
    renderEvents(filtered);
}

// Filter events by month
function filterByMonth(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const now = new Date();
    let filtered = DSA;

    if (filter === 'upcoming') {
        filtered = DSA.filter(event => new Date(event.startDate) > now);
    } else if (filter === 'thisMonth') {
        filtered = DSA.filter(event => {
            const startDate = new Date(event.startDate);
            return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
        });
    }

    renderEvents(filtered);
}

// Close popup when clicking outside
document.getElementById('popupOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('popupOverlay')) {
        closePopup();
    }
});
