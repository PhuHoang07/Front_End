function Authenticate(){
    let token = localStorage.getItem('token');
    fetch('https://swp-esms-api.azurewebsites.net/api/auth', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok){
        logOut();
      }
    });
}

function fetchAPIData(url, method, data){
    let token = localStorage.getItem('token');
    fetch(url, {
      method: method, // or 'POST', 'PUT', etc.
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => 
       response.json()
    );
}

function logOut(){
    localStorage.removeItem('token');
    window.location.href = "login.html";
}