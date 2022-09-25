/* global pushSocket */
var pushSocket;
$(function () {
    pushSocket = new WebSocket(`ws://localhost:8080/SharingHope/notification/${currentUserId}`);
    
    pushSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        switch(data.code) {
            case 111: {
                $('.list-notification').empty();
                notifPage = 1;
                getNotifs();
                
                break;
            }
            case 112: {
                updateCount(data.data.auction.id, 1);
                const auction = $(`.auction-post-${data.data.auction.id}`);

                if(auction !== undefined) {
                    auction.find('.bided').prepend(bidItem(data.data));
                }
                
                break;
            }
            case 113: {
                const bid = $(`#${data.data.auction.id}-${data.data.user.id}`);
                const auction = $(`.auction-post-${data.data.auction.id}`);
                
                if (bid !== undefined) {
                    bid.remove();
                    auction.find('.bided').prepend(bidItem(data.data));
                }
                    
                break;
            }
            case 114: {
                updateCount(data.data.auction.id, 0);
                
                const bid = $(`#${data.data.auction.id}-${data.data.user.id}`);
                if (bid !== undefined) {
                    bid.remove();
                }
                
                break;
            }
        }
    };
    
    pushSocket.onopen = function (event) {
        //send empty message to initialize socket connnection
        minimumUp = loadMinimumUp();
        pushSocket.send("");
    };

    pushSocket.onclose = function (event) {
        console.log("Socket Closed by Server");
    };
});




