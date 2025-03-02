function editProfile() {
    const newName = prompt("Enter new username:", "Jane Doe");
    const newRole = prompt("Enter new role:", "Web Developer");
    const newEmail = prompt("Enter new email:", "janedoe@example.com");
    const newLocation = prompt("Enter new location:", "Mumbai, India");

    if (newName && newRole && newEmail && newLocation) {
        // Update the profile data in the page
        document.querySelector('.username').innerText = newName;
        document.querySelector('.user-role').innerText = newRole;

        const details = document.querySelectorAll('.detail-item span');
        details[0].innerText = newEmail;      // Email
        details[1].innerText = newLocation;   // Location

        alert("Profile updated successfully!");
    } else {
        alert("Profile update cancelled or incomplete!");
    }
}

// Optional: You can add a welcome message when the page loads.
window.onload = function() {
    console.log("User Profile Page Loaded");
};
