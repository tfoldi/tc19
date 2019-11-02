{
    const SCROLLBAR_SYNC_REQUEST_MESSAGE = "ScrollbarSync-Request";

    tableau.extensions.initAddons = function () {
        tableau.extensions.dashboardContent.dashboard.__proto__.syncScrollbars = function (idx0, idx1) {
            window.parent.postMessage(SCROLLBAR_SYNC_REQUEST_MESSAGE + JSON.stringify([idx0, idx1]), "*" );
        }
    }
}