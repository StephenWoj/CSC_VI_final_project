function validateForm() {
    let isValid = true;

    // Reset error messages
    document.getElementById("usernameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";

    // Username validation
    const username = document.getElementById("username").value;
    if (username.trim() === "") {
        document.getElementById("usernameError").textContent = "Username is required";
        isValid = false;
    }

    // Email validation
    const email = document.getElementById("email").value;
    if (email.trim() === "") {
        document.getElementById("emailError").textContent = "Email is required";
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById("emailError").textContent = "Invalid email format";
        isValid = false;
    }

    // Password validation
    const password = document.getElementById("password").value;
    if (password.trim() === "") {
        document.getElementById("passwordError").textContent = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters long";
        isValid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword.trim() === "") {
        document.getElementById("confirmPasswordError").textContent = "Confirm password is required";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}