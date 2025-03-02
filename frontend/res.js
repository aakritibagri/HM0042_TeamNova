function sanitizeHTML(str) {
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function generateResume() {
    const fields = ["name", "email", "phone", "skills", "experience"];
    const data = {};

    for (const field of fields) {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            alert(`Please fill in the ${field} field!`);
            return;
        }
        data[field] = sanitizeHTML(value);
    }

    // Create new tab for resume
    const resumeWindow = window.open("", "_blank");
    if (!resumeWindow) {
        alert("Please allow popups to view your resume.");
        return;
    }

    const doc = resumeWindow.document;

    doc.write(`
        <html>
        <head>
            <title>${data.name} - Resume</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f5f3ff;
                    color: #4c1d95;
                }
                h1 {
                    color: #7e22ce;
                    text-align: center;
                    margin-bottom: 20px;
                }
                p {
                    margin: 8px 0;
                }
                .section-title {
                    font-weight: bold;
                    color: #6b21a8;
                    margin-top: 15px;
                }
                .resume-box {
                    border: 2px solid #9333ea;
                    padding: 15px;
                    border-radius: 10px;
                    background-color: white;
                    box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
                    animation: slideIn 0.8s ease-out;
                }
                @keyframes slideIn {
                    from { transform: translateY(-30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>
        </head>
        <body>
            <h1>${data.name}'s Resume</h1>
            <div class="resume-box">
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p class="section-title">Skills:</p>
                <p>${data.skills}</p>
                <p class="section-title">Experience:</p>
                <p>${data.experience}</p>
            </div>
        </body>
        </html>
    `);
    doc.close();
}

