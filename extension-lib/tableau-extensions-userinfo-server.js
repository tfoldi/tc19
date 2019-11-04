{
    console.log("Custom startup");
    var a = JSON.parse(document.getElementById('tsConfigContainer').innerText);
    var details = JSON.parse(a.stickySessionKey);
    console.log(a);
    var info = {
        id: a.current_user_id,
        sessHash: a.sessionIdHash,
        username: a.current_user_name,
        sessionId: a.sessionid,
        workbook_id: details.workbookId,
        view_id: details.viewId,
        wg_session_id: details.wgSession,
        session_key: a.stickySessionKey
    }
    const USERINFO_REQUEST_MESSAGE = "UserInfo-Request";
    const USERINFO_RESPONSE_MESSAGE = "UserInfo-Response";
    const SCROLLBAR_SYNC_REQUEST_MESSAGE = "ScrollbarSync-Request";
    window.addEventListener('message', function (event) {
        if (event.data == USERINFO_REQUEST_MESSAGE) {
            console.log("UserInfo request!");
            event.source.postMessage(USERINFO_RESPONSE_MESSAGE + JSON.stringify(info), "*");
        };
    });
}