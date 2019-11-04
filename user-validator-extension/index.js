const BACKEND_ENDPOINT = "https://tamas.starschema.com:8080/user-validator-backend/auth/";
(async function () {

  tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.initalizeAddonsAsync("userinfo").then(async function () {

      var resp = await tableau.extensions.getUserInfo();

      document.getElementById("username").value = resp.username;
      for (const el of document.querySelectorAll('.mdc-text-field')) {
        new mdc.textField.MDCTextField.attachTo(el);
      }
      document.getElementById("validate").removeAttribute("disabled");
      document.getElementById("status").innerText = "Waiting for validation...";
    });
  });

})()

async function validate() {
  document.getElementById("validate").setAttribute("disabled", "true");
  document.getElementById("status").innerText = "Getting user info...";
  var userInfo = await tableau.extensions.getUserInfo();
  var username = document.getElementById('username').value;
  if (username) {
    userInfo.username = username;
  }
  else {
    document.getElementById("status").innerText = "Invalid userid!";
    document.getElementById("validate").removeAttribute("disabled");
    return;
  }
  document.getElementById("status").innerText = "Validating...";
  const rawResponse = await fetch(BACKEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });
  const content = await rawResponse.json();
  document.getElementById("status").innerText = content.valid ? "Session is VALID" : "Session is INVALID";
  document.getElementById("validate").removeAttribute("disabled");

}