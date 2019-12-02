{
    const HOTJAR_REQUEST_MESSAGE = "Hotjar-Request";

    tableau.extensions.dashboardContent.dashboard.__proto__.addHotjarTracking = function (settings) {
        console.log("Sync request from client");

        window.parent.postMessage(
            {
                event_id: HOTJAR_REQUEST_MESSAGE,
                data: settings
            },
            "*");
    }
}