document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    const errorDiv = document.createElement("div"); // Error message container
    errorDiv.style.marginTop = "10px";
    form.prepend(errorDiv); // Add error div above the form fields
    
    // Find the password input field
    const passwordInput = document.querySelector('input[type="password"]');

    if (passwordInput) {
        // Create toggle button
        const togglePassword = document.createElement("span");
        togglePassword.textContent = "Show Password";
        togglePassword.style.fontSize = "13px";
        togglePassword.style.fontStyle = "italic";
        togglePassword.style.fontWeight = "bold";
        togglePassword.style.textDecoration = "underline";
        togglePassword.style.cursor = "pointer";
        togglePassword.style.marginLeft = "8px";

        // Insert the toggle after the password input
        passwordInput.parentNode.insertBefore(togglePassword, passwordInput.nextSibling);

        // Toggle visibility
        togglePassword.addEventListener("click", function () {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            togglePassword.textContent = isPassword ? "Hide Password" : "Show Password";
        });
    }
    

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const submitButton = form.querySelector("button");
        submitButton.disabled = true;
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
                errorDiv.innerHTML = `<p style="color: red; background-color:rgb(255, 230, 230); width: fit-content;">Incorrect username or password.</p>`; // Show error message
                submitButton.disabled = false;
                submitButton.textContent = "Login";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorDiv.innerHTML = `<p style="color: red; background-color:rgb(255, 230, 230); width: fit-content;">An unexpected error occurred. Please try again.</p>`;
            submitButton.disabled = false;
            submitButton.textContent = "Login";
        });
    });
});