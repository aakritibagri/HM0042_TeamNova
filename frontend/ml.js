// Hackathon Data

const hackathons = [  {
    id: 'ml-hack-2025',
    title: 'ML Hack 2025',
    description: 'Machine Learning innovation hackathon.',
    startDate: 'April 5, 2025',
    endDate: 'April 6, 2025',
    location: 'Online',
    category: 'Machine Learning',
    eligibility: 'Open to all',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
},
{
    id: 'ai-challenge-2025',
    title: 'AI Challenge 2025',
    description: 'AI/ML problems solving contest.',
    startDate: 'April 25, 2025',
    endDate: 'April 26, 2025',
    location: 'Virtual',
    category: 'Machine Learning',
    eligibility: 'Open to students & professionals',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
},
{
    id: 'ml-masters-2025',
    title: 'ML Masters 2025',
    description: 'Advance your ML knowledge through contests.',
    startDate: 'May 15, 2025',
    endDate: 'May 16, 2025',
    location: 'Hybrid',
    category: 'Machine Learning',
    eligibility: 'Worldwide',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
},
{
    id: 'data-vision-2025',
    title: 'Data Vision 2025',
    description: 'ML-focused data analytics challenge.',
    startDate: 'June 10, 2025',
    endDate: 'June 11, 2025',
    location: 'Online',
    category: 'Machine Learning',
    eligibility: 'Open for all',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
},
{
    id: 'ml-champions-2025',
    title: 'ML Champions 2025',
    description: 'Top ML experts face-off.',
    startDate: 'July 30, 2025',
    endDate: 'July 31, 2025',
    location: 'Virtual',
    category: 'Machine Learning',
    eligibility: 'All students & developers',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
},
{
    id: 'ai-summit-2025',
    title: 'AI Summit 2025',
    description: 'Showcase your ML innovations.',
    startDate: 'August 12, 2025',
    endDate: 'August 13, 2025',
    location: 'Hybrid',
    category: 'Machine Learning',
    eligibility: 'Students & professionals',
    registerButton: '<a href="/create"><button>Register Now</button></a>'
}
]

;

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