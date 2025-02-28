document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.querySelector("img");
    const fileInput = document.querySelector("input[type='file']");
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    const usernameInput = document.querySelector("input[name='username']");
    const passwordInput = document.querySelector("input[name='password']");
    
    // Add password toggle
    const togglePassword = document.createElement("span");
    togglePassword.style.cursor = "pointer";
    togglePassword.style.marginLeft = "10px";
    passwordInput.parentNode.insertBefore(togglePassword, passwordInput.nextSibling);

    togglePassword.addEventListener("click", function () {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    // Live preview of selected image
    if (fileInput) {
        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profileImage.src = e.target.result; // Update image preview
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // AJAX form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent full-page reload

        // Simple validation
        if (!usernameInput.value.trim()) {
            alert("Username cannot be empty!");
            return;
        }

        const formData = new FormData(form);
        const submitButton = form.querySelector("button");
        submitButton.disabled = true;
        submitButton.textContent = "Updating..."; // Show loading state

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "X-CSRFToken": csrfToken },
        })
        .then(response => response.text()) // Expecting HTML response
        .then(html => {
            // Create a temporary container to extract the new content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            // Replace only the profile content instead of reloading the entire page
            document.querySelector(".content-profile").innerHTML = tempDiv.querySelector(".content-profile").innerHTML;

            submitButton.disabled = false;
            submitButton.textContent = "Update";

            // Scroll to top smoothly to show the message
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
            submitButton.disabled = false;
            submitButton.textContent = "Update";
        });
    });
});
