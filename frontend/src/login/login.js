// API URL
const loginUrl = 'http://127.0.0.1:8000/api/token/';

// login form deceleration
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.access) {
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    window.location.href = '../homepage/index.html';
                } else {
                    console.log('Login failed: ' + (data.detail || 'Unknown error'));
                }
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
    });
}