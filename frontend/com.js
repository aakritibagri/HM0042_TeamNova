// Example: Show Alert When Page Loads
window.onload = function() {
    console.log("Page Loaded Successfully!");
    // alert("Welcome to Upcoming Events!");
};

// Example: Search Functionality (if you want to add a search bar in future)
function searchEvents() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("hackathon-card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Optional: Add Zoom Out Effect Using JS (if you want more control than CSS)
let cards = document.querySelectorAll('.hackathon-card');

cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = "scale(1)";
    });
});

// Optional: Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `© ${year} - Your Website`;
    }
});
