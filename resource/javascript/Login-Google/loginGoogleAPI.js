const curUrl = window.location.href;
const redirectURL =
  curUrl.substring(0, curUrl.lastIndexOf("/") + 1) + "loginSuccess.html";

const YOUR_CLIENT_ID =
  "281321846150-n9jioo0mk1uuqpnqsaehnrmtca0me5ul.apps.googleusercontent.com";
const YOUR_REDIRECT_URI = redirectURL;

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
