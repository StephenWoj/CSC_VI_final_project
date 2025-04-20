document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.querySelector("img");
    const fileInput = document.querySelector("input[type='file']");
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    const usernameInput = document.querySelector("input[name='username']");
    const passwordInput = document.querySelector("input[name='password']");
    
    // Save initial form values
    const initialState = {
        username: usernameInput.value,
        password: passwordInput.value,
        profileImageSrc: profileImage.src,
    };

    // Add password toggle
    const togglePassword = document.createElement("span");
    togglePassword.textContent = "Show Password";
    togglePassword.style.fontSize = "13px";
    togglePassword.style.fontStyle = "italic";
    togglePassword.style.fontWeight = "bold";
    togglePassword.style.textDecoration = "underline";
    togglePassword.style.cursor = "pointer";
    togglePassword.style.marginLeft = "10px";
    passwordInput.parentNode.insertBefore(togglePassword, passwordInput.nextSibling);

    togglePassword.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePassword.textContent = isPassword ? "Hide Password" : "Show Password";
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

        // Check for changes
        const currentState = {
            username: usernameInput.value,
            password: passwordInput.value,
            profileImageSrc: profileImage.src,
        };

        const hasChanges =
            currentState.username !== initialState.username ||
            currentState.password !== initialState.password ||
            currentState.profileImageSrc !== initialState.profileImageSrc;

        if (!hasChanges) {
            // Prevent update if no changes were made
            console.log("No changes detected.");
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

        .then(response => {
            if(hasChanges) {
                    // If changes where made
                    alert("Profile Has Been Updated!⬆");
                    window.location.href = "/profile";
                }
        })
        
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
            submitButton.disabled = false;
            submitButton.textContent = "Update";
        });
    });
});