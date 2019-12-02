{
    const HOTJAR_REQUEST_MESSAGE = "Hotjar-Request";

    tableau.extensions.dashboardContent.dashboard.__proto__.addHotjarTracking = function (settings) {

        window.parent.postMessage(
            {
                event_id: HOTJAR_REQUEST_MESSAGE,
                data: settings
            },
            "*");
    }
}