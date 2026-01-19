const form = document.getElementById("regForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const department = document.getElementById("department").value.trim();
    const year = document.getElementById("year").value;
    const phone = document.getElementById("phone").value.trim();

    const selectedEvents = [];
    document.querySelectorAll('input[name="event"]:checked')
        .forEach(e => selectedEvents.push(e.value));

    // Validation
    if (!name || !email || !college || !department || !year || !phone) {
        showMessage("❌ Please fill all fields", "red");
        return;
    }

    if (selectedEvents.length === 0) {
        showMessage("❌ Select at least one event", "red");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("❌ Invalid email format", "red");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        showMessage("❌ Mobile number must be 10 digits", "red");
        return;
    }

    if (year < 1 || year > 5) {
        showMessage("❌ Enter valid year (1–5)", "red");
        return;
    }

    // Create registration object
    const registration = {
        name,
        email,
        college,
        department,
        year,
        phone,
        events: selectedEvents,
        time: new Date().toLocaleString()
    };

    // Get existing data or create new array
    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push(registration);

    // Save to localStorage
    localStorage.setItem("registrations", JSON.stringify(registrations));

    showMessage("✅ Registration saved successfully!", "green");
    form.reset();
});

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}
