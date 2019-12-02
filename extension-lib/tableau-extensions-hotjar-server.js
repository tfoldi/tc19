{
    const HOTJAR_REQUEST_MESSAGE = "Hotjar-Request";

    window.addEventListener('message', function (event) {
        if (event.data && event.data.event_id === HOTJAR_REQUEST_MESSAGE) {
            console.log("Hotjar module loaded");

            (function (h, o, t, j, a, r) {
                h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
                h._hjSettings = event.data.data; // the _hjSettings part most be passed by the extension
                a = o.getElementsByTagName('head')[0];
                r = o.createElement('script'); r.async = 1;
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                a.appendChild(r);
            })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

        }
    });

}