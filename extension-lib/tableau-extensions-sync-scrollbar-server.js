{
    const SCROLLBAR_SYNC_REQUEST_MESSAGE = "ScrollbarSync-Request";

    window.addEventListener('message', function (event) {
        if (event.data && event.data.event_id === SCROLLBAR_SYNC_REQUEST_MESSAGE) {
            const left = event.data.data[0];
            const right = event.data.data[1];

            var isSyncingLeftScroll = false;
            var isSyncingRightScroll = false;
            var isSyncingLeftHorizontalScroll = false;
            var isSyncingRightHorizontalScroll = false;

            var leftDiv = $('.tab-tvScrollY')[left];
            var rightDiv = $('.tab-tvScrollY')[right];
            var leftHorizontalDiv = $('.tab-tvScrollX')[left];
            var rightHorizontalDiv = $('.tab-tvScrollX')[right];

            leftDiv.onscroll = function () {
                if (!isSyncingLeftScroll) {
                    isSyncingRightScroll = true;
                    rightDiv.scrollTop = this.scrollTop;
                }
                isSyncingLeftScroll = false;
            }

            rightDiv.onscroll = function () {
                if (!isSyncingRightScroll) {
                    isSyncingLeftScroll = true;
                    leftDiv.scrollTop = this.scrollTop;
                }
                isSyncingRightScroll = false;
            }

            leftHorizontalDiv.onscroll = function () {
                if (!isSyncingLeftHorizontalScroll) {
                    isSyncingRightHorizontalScroll = true;
                    rightHorizontalDiv.scrollLeft = this.scrollLeft;
                }
                isSyncingLeftHorizontalScroll = false;
            }

            rightHorizontalDiv.onscroll = function () {
                if (!isSyncingRightHorizontalScroll) {
                    isSyncingLeftHorizontalScroll = true;
                    leftHorizontalDiv.scrollLeft = this.scrollLeft;
                }
                isSyncingRightHorizontalScroll = false;
            }
        }
    });

}