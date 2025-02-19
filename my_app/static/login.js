const form = document.getElementById('login-form');
            const message = document.getElementById('message');
        
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(form);
        
                fetch("{% url 'login' %}", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                         window.location.href = data.redirect_url;
                    } else {
                        message.textContent = data.message;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    message.textContent = 'An error occurred. Please try again.';
                });
            });