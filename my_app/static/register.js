document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.error').forEach(function(element) {
        element.textContent = '';
    });

    // Username validation
    const username = document.getElementById('username').value;
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters.';
        isValid = false;
    }

   // Password validation
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }
    
    if (!isValid) {
      event.preventDefault(); // Prevent form submission if validation fails
    } else {
        document.getElementById('registrationSuccess').textContent = "Registration Successful!";
        document.getElementById('registrationFailure').textContent = "";
    }
});