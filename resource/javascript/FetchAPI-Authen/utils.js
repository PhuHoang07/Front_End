Authenticate(); // authentication before accessing website

function Authenticate() {
    let token = localStorage.getItem('token');
    fetch('https://swp-esms-api.azurewebsites.net/api/auth/validate', {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.text())
        .then((response) => {
            if (response == 'Invalid') {
                logOutput();
            }
        });
}

function logOut() {
    localStorage.removeItem('token');
    window.location.href = '../../../html/login-Google/index.html';
}

function fetchAPIData(url, method, data) {
    let token = localStorage.getItem('token');

    return fetch(url, {
        method: method, // or 'POST', 'PUT', etc.
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json());
}
