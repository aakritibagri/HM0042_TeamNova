document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.querySelector("#eventForm");

    if (eventForm) {
        eventForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const title = document.querySelector("input[placeholder='e.g., Tech Innovation Hackathon 2025']").value.trim();
            const eventType = document.querySelector(".event-type-select").value;
            const startDate = document.querySelector("input[type='date']").value;
            const endDate = document.querySelectorAll("input[type='date']")[1].value;
            const startTime = document.querySelector("input[type='time']").value;
            const endTime = document.querySelectorAll("input[type='time']")[1].value;
            const location = document.querySelector("input[placeholder='Maximum members per team']").value.trim();
            const description = document.querySelector("textarea[placeholder='Describe your event, its objectives, and what participants can expect...']").value.trim();
            const category = document.querySelector("input[placeholder='e.g., Software']").value.trim();
            const teamSize = document.querySelector("input[placeholder='Maximum members per team']").value;
            const eligibilityCriteria = document.querySelector("textarea[placeholder='Describe the eligibility criteria for participants...']").value.trim();

            // Collect checkbox values
            const requirements = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(checkbox => checkbox.parentElement.textContent.trim());

            if (!title || !eventType || !startDate || !endDate || !startTime || !endTime || !location || !description) {
                alert("Please fill all required fields.");
                return;
            }

            const response = await fetch("http://localhost:5000/api/competitions/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    eventType,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    location,
                    description,
                    category,
                    teamSize: teamSize ? parseInt(teamSize) : undefined,
                    eligibilityCriteria,
                    requirements
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Competition created successfully!");
                eventForm.reset();
            } else {
                alert(data.error || "Error creating competition");
            }
        });
    }
});
