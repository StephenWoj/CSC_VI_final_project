document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const submitButton = form.querySelector("button");
        submitButton.disabled = true; // Disable button to prevent multiple clicks
        submitButton.textContent = "Logging in..."; // Show loading state

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "X-CSRFToken": csrfToken },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect_url; // Redirect on success
            } else {
                displayErrors(data.errors);
                submitButton.disabled = false; // Re-enable button on error
                submitButton.textContent = "Login";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
            submitButton.disabled = false;
            submitButton.textContent = "Login";
        });
    });

    function displayErrors(errors) {
        const errorDiv = document.querySelector("#error-messages");
        errorDiv.innerHTML = ""; // Clear previous errors
        Object.values(errors).forEach(errList => {
            errList.forEach(error => {
                const p = document.createElement("p");
                p.textContent = error;
                p.style.color = "red";
                errorDiv.appendChild(p);
            });
        });
    }
});
