{
    const USERINFO_REQUEST_MESSAGE = "UserInfo-Request";
    const USERINFO_RESPONSE_MESSAGE = "UserInfo-Response";

    console.log("Userinfo add-on loaded (Server)");

    var a = JSON.parse(document.getElementById('tsConfigContainer').innerText);
    var details = JSON.parse(a.stickySessionKey);
    var info = {
        user_id: a.current_user_id,
        sessHash: a.sessionIdHash,
        username: a.current_user_name,
        sessionId: a.sessionid,
        workbook_id: details.workbookId,
        view_id: details.viewId,
        wg_session_id: details.wgSession,
        session_key: a.stickySessionKey
    }
    window.addEventListener('message', function (event) {
        if (event.data == USERINFO_REQUEST_MESSAGE) {
            event.source.postMessage( {event_id: USERINFO_RESPONSE_MESSAGE, data: info}, "*");
        };
    });
}