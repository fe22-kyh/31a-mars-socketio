// Fasad för samtliga (alla möjliga) json anrop
async function sendData(url, method, data) {
  const headers = {
    "Content-Type": "application/json", // Media type json,
    "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
  }

  const fetchOptions = {
    method: method,
    body: JSON.stringify(data), // Gör om data till json
    headers
  }

  return await fetch(url, fetchOptions);
}

async function authenticate(authDetails) {
  let response = await sendData("http://127.0.0.1:9090/auth/login", "POST", authDetails);

  const accessToken = await response.text();

  // sessionStorage är webbläsarens session minne, när webbläsaren stängs så rensas minnet
  sessionStorage.setItem("accessToken", accessToken);
}
