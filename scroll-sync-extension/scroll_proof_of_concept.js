var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var isSyncingLeftHorizontalScroll = false;
var isSyncingRightHorizontalScroll = false;

var leftDiv = $('.tab-tvScrollY')[0];
var rightDiv = $('.tab-tvScrollY')[1];
var leftHorizontalDiv = $('.tab-tvScrollX')[0];
var rightHorizontalDiv = $('.tab-tvScrollX')[1];

leftDiv.onscroll = function() {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightDiv.scrollTop = this.scrollTop;
  }
  isSyncingLeftScroll = false;
}

rightDiv.onscroll = function() {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftDiv.scrollTop = this.scrollTop;
  }
  isSyncingRightScroll = false;
}

leftHorizontalDiv.onscroll = function() {
  if (!isSyncingLeftHorizontalScroll) {
    isSyncingRightHorizontalScroll = true;
    rightHorizontalDiv.scrollLeft = this.scrollLeft;
  }
  isSyncingLeftHorizontalScroll = false;
}

rightHorizontalDiv.onscroll = function() {
  if (!isSyncingRightHorizontalScroll) {
    isSyncingLeftHorizontalScroll = true;
    leftHorizontalDiv.scrollLeft = this.scrollLeft;
  }
  isSyncingRightHorizontalScroll = false;
}







"use strict";
(function () {

    console.log("Custom startup");
    var a = JSON.parse(document.getElementById('tsConfigContainer').innerText);
    var details = JSON.parse(a.stickySessionKey);
    console.log(a);
    var info = {
        id: a.current_user_id,
        sessHash: a.sessionIdHash,
        username:  a.current_user_name,
        sessionId: a.sessionid,
        workbook_id: details.workbookId,
        view_id: details.viewId,
        wg_session_id: details.wgSession,
        session_key: a.stickySessionKey
    }
    const USERINFO_REQUEST_MESSAGE = "UserInfo-Request";
    const USERINFO_RESPONSE_MESSAGE = "UserInfo-Response";
    const SCROLLBAR_SYNC_REQUEST_MESSAGE = "ScrollbarSync-Request";
	window.addEventListener('message', function(event) { 
        if (event.data == USERINFO_REQUEST_MESSAGE){
            console.log("UserInfo request!");
            event.source.postMessage(USERINFO_RESPONSE_MESSAGE + JSON.stringify(info), "*");
        };
        if (typeof event.data === "string" && event.data.startsWith(SCROLLBAR_SYNC_REQUEST_MESSAGE ) ) {
            console.log("Scrollbar Sync request!");
            var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var isSyncingLeftHorizontalScroll = false;
var isSyncingRightHorizontalScroll = false;

var leftDiv = $('.tab-tvScrollY')[0];
var rightDiv = $('.tab-tvScrollY')[1];
var leftHorizontalDiv = $('.tab-tvScrollX')[0];
var rightHorizontalDiv = $('.tab-tvScrollX')[1];

leftDiv.onscroll = function() {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightDiv.scrollTop = this.scrollTop;
  }
  isSyncingLeftScroll = false;
}

rightDiv.onscroll = function() {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftDiv.scrollTop = this.scrollTop;
  }
  isSyncingRightScroll = false;
}

leftHorizontalDiv.onscroll = function() {
  if (!isSyncingLeftHorizontalScroll) {
    isSyncingRightHorizontalScroll = true;
    rightHorizontalDiv.scrollLeft = this.scrollLeft;
  }
  isSyncingLeftHorizontalScroll = false;
}

rightHorizontalDiv.onscroll = function() {
  if (!isSyncingRightHorizontalScroll) {
    isSyncingLeftHorizontalScroll = true;
    leftHorizontalDiv.scrollLeft = this.scrollLeft;
  }
  isSyncingRightHorizontalScroll = false;
}
        }
     });
    
})()