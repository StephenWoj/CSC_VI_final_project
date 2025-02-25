document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.querySelector("img");
    const fileInput = document.querySelector("input[type='file']");
    const form = document.querySelector("form");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;

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

        const formData = new FormData(form);
        const submitButton = form.querySelector("button");
        submitButton.disabled = true;
        submitButton.textContent = "Updating..."; // Show loading state

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "X-CSRFToken": csrfToken },
        })
        .then(response => response.text())  // Expecting HTML response
        .then(html => {
            document.open();  
            document.write(html);  // Replace current page content with new HTML
            document.close();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
            submitButton.disabled = false;
            submitButton.textContent = "Update";
        });
    });
});
