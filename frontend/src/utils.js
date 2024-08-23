const refreshUrl = 'http://127.0.0.1:8000/api/token/refresh/';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
}

// Function to refresh the token
function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        fetch(refreshUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.access && data.refresh) {
                    // Store the new tokens
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    console.log('Tokens refreshed successfully');
                } else {
                    console.log('Failed to refresh token: ', data);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error refreshing token: ', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = 'login.html';
            });
    }
}