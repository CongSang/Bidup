/* global pushSocket */
var pushSocket;
$(function () {
    pushSocket = new WebSocket(`ws://localhost:8080/SharingHope/notification/${currentUserId}`);
    
    pushSocket.onmessage = function (event) {
        if (event.data === 'update_notif')
            
            $('.list-notification').empty();
            notifPage = 1;
            getNotifs();
    };
    
    pushSocket.onopen = function (event) {
        //send empty message to initialize socket connnection
        pushSocket.send("");
    };

    pushSocket.onclose = function (event) {
        console.log("Socket Closed by Server");
    };
});




