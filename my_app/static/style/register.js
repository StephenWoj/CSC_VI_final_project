const form = document.getElementById('registration-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch('/register/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Handle successful registration
            window.location.href = '/'; // Redirect to home page
        } else if (data.status === 'error') {
            // Handle registration errors
            // Display errors to the user
            console.log(data.errors)
        }
    });
});