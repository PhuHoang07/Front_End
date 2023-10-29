Authenticate(); // authentication before accessing website
showUserName(); // show user name on header

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
                // log out when token is invalid
                logOut();
            }
        });
}

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '../../../html/login-Google/index.html';
}

function fetchAPIData(url, method, data = {}) {
    const token = localStorage.getItem('token');

    if (method === 'GET') {
        const params = new URLSearchParams(data.params ?? '');

        return fetch(url + `?${params}`, {
            method: method, // or 'POST', 'PUT', etc.
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    } else {
        const body = JSON.stringify(data.body ?? '');

        return fetch(url, {
            method: method, // or 'POST', 'PUT', etc.
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    }
}

function showUserName() {
    const userName = localStorage.getItem('name');
    const userField = document.getElementById('user-name');
    userField.innerText = userName;
}
