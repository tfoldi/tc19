{
    const EXTENSION_ADDON_URL_PREFIX = 'https://tfoldi.github.io/tc19/extension-lib';
    const LOAD_MODULE_REQUEST_MESSAGE = 'LoadModule-Request';
    const LOAD_MODULE_RESPONSE_MESSAGE = 'LoadModule-Response';

    window.addEventListener('message', function (event) {
        if (event.data && event.data.event_id === LOAD_MODULE_REQUEST_MESSAGE) {
            // load our addons external js file
            var addon = event.data.data.replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
            var script = document.createElement('script');
            script.src = EXTENSION_ADDON_URL_PREFIX + "/tableau-extensions-" + addon + "-server.js";
            script.onload = function () {
                event.source.postMessage({ event_id: LOAD_MODULE_RESPONSE_MESSAGE, data: event.data.data }, "*");
            }
            document.head.appendChild(script);
        }
    });
}
