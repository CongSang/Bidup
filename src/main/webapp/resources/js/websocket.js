/* global pushSocket */
var pushSocket;
$(function () {
    pushSocket = new WebSocket(`ws://localhost:8080/SharingHope/notification/${currentUserId}`);
    
    pushSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.code === 111) {
            $('.list-notification').empty();
            notifPage = 1;
            getNotifs();
        }
        else if (data.code === 112) {
            $('.list-notification').empty();
            notifPage = 1;
            updateCount(data.data.auction.id, 1);
            
            if($(`.auction-post-${data.data.auction.id}`)
                    .find('.auction-user-join').hasClass('show')
                && data.data.user.id !== currentUserId) {
                if ($(`.auction-post-${data.data.auction.id}`)
                        .find(`.bided #${currentUserId}`).length > 0) {
                        console.log("chinh sua realtime");
                    }
                else {
                    $(`.auction-post-${data.data.auction.id}`)
                        .find('.bided').prepend(bidItem(data.data));
                }
            }
        }
    };
    
    pushSocket.onopen = function (event) {
        //send empty message to initialize socket connnection
        pushSocket.send("");
    };

    pushSocket.onclose = function (event) {
        console.log("Socket Closed by Server");
    };
});




