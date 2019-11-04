{
    const USERINFO_REQUEST_MESSAGE = "UserInfo-Request";
    const USERINFO_RESPONSE_MESSAGE = "UserInfo-Response";

    tableau.extensions.__proto__.getUserInfo = function () {
    return new Promise(function (resolve, reject) {
      window.addEventListener('message', function (event) {
        if (event.data && event.data.event_id === USERINFO_RESPONSE_MESSAGE) {
          resolve(event.data.data);
        }
      });
      window.parent.postMessage(USERINFO_REQUEST_MESSAGE, "*");
    });
  }
}