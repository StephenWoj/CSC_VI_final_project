document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    const messageDiv = document.createElement("div"); // Message container
    messageDiv.style.marginTop = "10px";
    form.prepend(messageDiv); // Add message div above the form fields

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent full-page reload

        const formData = new FormData(form);
        const submitButton = form.querySelector("button");
        submitButton.disabled = true;
        submitButton.textContent = "Registering..."; // Show loading state

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "X-CSRFToken": csrfToken },
        })
        .then(response => response.json())
        .then(data => {
            submitButton.disabled = false;
            submitButton.textContent = "Register";

            if (data.success) {
                messageDiv.innerHTML = `<p style="color: green; background-color:rgb(230, 255, 230); width: fit-content;">Registration successful! You can now log in.</p>`;
                form.reset(); // Clear form fields
            } else {
                messageDiv.innerHTML = `<p style="color: red; background-color:rgb(255, 230, 230); width: fit-content;">${data.error}</p>`; // Show error messages
            }
        })
        .catch(error => {
            console.error("Error:", error);
            messageDiv.innerHTML = `<p style="color: red; background-color:rgb(255, 230, 230); width: fit-content;">An unexpected error occurred. Please try again.</p>`;
            submitButton.disabled = false;
            submitButton.textContent = "Register";
        });
    });
});
