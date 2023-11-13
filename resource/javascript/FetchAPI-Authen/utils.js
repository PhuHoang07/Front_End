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
            if (response !== 'Valid') {
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

function fetchAPIDataS(url, method, data = {}) {
    const token = localStorage.getItem('token');

    if (method === 'GET' && data.params) {
        const queryParams = Object.entries(data.params).reduce(
            (acc, [key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => acc.append(key, item));
                } else {
                    acc.append(key, value);
                }
                return acc;
            },
            new URLSearchParams()
        );

        const queryString = queryParams.toString();

        return fetch(url + `?${queryString}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        const body = JSON.stringify(data.body ?? '');

        return fetch(url, {
            method: method,
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    } else {
        // Handle other cases if needed
        return Promise.reject(new Error('Unsupported method'));
    }
}
