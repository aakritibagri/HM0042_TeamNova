document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup-form");
    const loginForm = document.querySelector("#login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.querySelector("#signup-name").value.trim();
            const email = document.querySelector("#signup-email").value.trim();
            const password = document.querySelector("#signup-password").value.trim();

            if (!name || !email || !password) {
                showErrorMessage("All fields are required!");
                return;
            }

            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                showSuccessMessage("Account created successfully! Redirecting...");
                setTimeout(() => (window.location.href = "login.html"), 2000);
            } else {
                showErrorMessage(data.error || "Error signing up");
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
                localStorage.setItem("token", data.token); // Store token for authentication
                showSuccessMessage("Login successful! Redirecting...");
                setTimeout(() => (window.location.href = "home.html"), 2000);
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
