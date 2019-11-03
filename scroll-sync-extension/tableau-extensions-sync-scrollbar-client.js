{
    const SCROLLBAR_SYNC_REQUEST_MESSAGE = "ScrollbarSync-Request";

    tableau.extensions.dashboardContent.dashboard.__proto__.syncScrollbars = function (idx0, idx1) {
        console.log("Sync request from client");

        window.parent.postMessage(
            {
                event_id: SCROLLBAR_SYNC_REQUEST_MESSAGE,
                data: [idx0, idx1]
            },
            "*");
    }
}