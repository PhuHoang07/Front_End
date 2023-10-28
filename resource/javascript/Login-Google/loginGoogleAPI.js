const YOUR_CLIENT_ID =
  // "152037254951-huantq4jv2ljnuj6erobcc4oo0rggcoo.apps.googleusercontent.com";
  "281321846150-g02vjhoml4vs0rcqr6rb4lk5fmomio0i.apps.googleusercontent.com";
const YOUR_REDIRECT_URI = "http://127.0.0.1:5501/html/login.html";

function parseFragment(fragmentString) {
  const params = {};
  const regex = /([^&=]+)=([^&]*)/g;
  let match;
  while ((match = regex.exec(fragmentString))) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return params;
}

function saveParamsToLocalStorage(params) {
  localStorage.setItem("oauth2-test-params", JSON.stringify(params));
}

function trySampleRequest() {
  // Your sample request logic here
}

function googleLogin() {
  const params = parseFragment(location.hash.substring(1));
  saveParamsToLocalStorage(params);

  if (params.access_token) {
    const accessToken = params.access_token;
    const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", userInfoUrl);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.response);
        } else if (xhr.status === 401) {
          oauth2SignIn();
        }
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

function oauth2SignIn() {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id: YOUR_CLIENT_ID,
    redirect_uri: YOUR_REDIRECT_URI,
    scope: "openid profile email",
    state: "try_sample_request",
    include_granted_scopes: "true",
    response_type: "token",
    prompt: "select_account",
  };

  const form = document.createElement("form");
  form.method = "GET";
  form.action = oauth2Endpoint;

  for (const p in params) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = p;
    input.value = params[p];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}



function fetchData(url, method, data, callback) {
  const headers = {
      'Content-Type': 'application/json',
  };

  if (data) {
      data = JSON.stringify(data);
  }

  fetch(url, {
      method,
      body: data,
      headers,
      mode: 'cors',
  })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Request failed');
          }
      })
      .then(callback)
      .catch(error => {
          console.error(error);
      });
}

function parseFragment(fragmentString) {
  const params = {};
  const regex = /([^&=]+)=([^&]*)/g;
  let match;

  while ((match = regex.exec(fragmentString)) !== null) {
      const key = decodeURIComponent(match[1]);
      const value = decodeURIComponent(match[2]);
      params[key] = value;
  }

  return params;
}

const fragmentString = window.location.hash.substring(1);
const params = parseFragment(fragmentString);
const accessToken = params.access_token;

if (accessToken) {
  const googleUserInfoUrl = `https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessToken}`;
  fetchData(googleUserInfoUrl, 'GET', null, data => {
      console.log(data);
      getToken(data.email);
  });
}

function getToken(email) {
  const signInUrl =
      'https://swp-esms-api.azurewebsites.net/api/auth/signin';
  // 'https://localhost:7212/api/auth/signin';
  const data = { email };

  fetchData(signInUrl, 'POST', data, response => {
      console.log(response);
  });
}