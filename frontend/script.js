document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup-form");
    const loginForm = document.querySelector("#login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.querySelector("#signup-name").value.trim();
            const email = document.querySelector("#signup-email").value.trim();
            const password = document.querySelector("#signup-password").value.trim();
            const role = document.querySelector("#signup-role").value.trim();
            const skills = document.querySelector("#signup-skills").value.trim();
            const location = document.querySelector("#signup-location").value.trim();
            const experience = document.querySelector("#signup-experience").value.trim();

            if (!name || !email || !password || !role || !skills || !location || !experience) {
                showErrorMessage("All fields are required!");
                return;
            }
    
            const userData = {
                name,
                email,
                password,
                role,
                skills: skills.split(",").map(skill => skill.trim()),  // Convert skills to array
                location,
                experience
            };
    
            try {
                const response = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    showSuccessMessage("Account created successfully! Redirecting...");
                    setTimeout(() => window.location.href = "login.html", 2000);
                } else {
                    showErrorMessage(data.message || "Error signing up");
                }
            } catch (error) {
                showErrorMessage("Server connection failed. Please try again later.");
                console.error("Signup Error:", error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#login-email").value.trim();
            const password = document.querySelector("#login-password").value.trim();

            if (!email || !password) {
                showErrorMessage("Email and Password are required!");
                return;
            }

            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                showSuccessMessage("Login successful! Redirecting...");
                setTimeout(() => window.location.href = "home.html", 2000);
            } else {
                showErrorMessage(data.error || "Invalid credentials");
            }
        });
    }
});

function showSuccessMessage(message) {
    alert(message);
}

function showErrorMessage(message) {
    alert(message);
}
