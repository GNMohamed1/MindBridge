const signupForm = document.getElementById('signup-form');
const signupUrl = 'http://127.0.0.1:8000/api/register/';  // Adjust this to your actual endpoint

if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        fetch(signupUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.access) {
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    window.location.href = '../homepage/index.html';  // Redirect to home page or any other page
                } else {
                    responseMessage.textContent = 'Signup failed: ' + (data.detail || 'Unknown error');
                }
            })
            .catch(error => {
                responseMessage.textContent = 'Error: ' + error;
            });
    });
}
