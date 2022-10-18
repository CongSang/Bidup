/* global notifSocket */
let notifSocket;
let auctionSocket;
let homeSocket;

$(function () {
        notifSocket = new WebSocket(`ws://localhost:8080${ctxPath}/notification/${currentUserId}`);
        // notifSocket
        notifSocket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if(data.code === 111) {
                    $('.list-notification').empty();
                    notifPage = 1;
                    getNotifs();
            }     
        };

//        notifSocket.onclose = function (event) {
//            console.log("Socket Closed");
//        };
//      
});

// auctionSocket
function auctionSocketInit() {
    auctionSocket = new WebSocket(`ws://localhost:8080${ctxPath}/auction/${currentUserId}`);
            loadMinimumUp();
    
    auctionSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        switch(data.code) {
            case 112: {
                updateCount(data.data.auction.id, 1);
                const auction = $(`.auction-post-${data.data.auction.id}`);

                if(auction.length > 0) {
                    auction.find('.bided').prepend(bidItem(data.data));
                }

                break;
            }
            case 113: {
                const bid = $(`#${data.data.auction.id}-${data.data.user.id}`);
                const auction = $(`.auction-post-${data.data.auction.id}`);

                if (bid.length > 0) {
                    bid.remove();
                    auction.find('.bided').prepend(bidItem(data.data));
                }

                break;
            }
            case 114: {
                updateCount(data.data.auction.id, 0);

                const bid = $(`#${data.data.auction.id}-${data.data.user.id}`);
                if (bid.length > 0) {
                    bid.remove();
                }

                break;
            }
        }
    }

//    auctionSocket.onclose = function (event) {
//        console.log("Socket Closed");
//    };
}
  
//homeSocket
function homeSocketInit() {
    homeSocket = new WebSocket(`ws://localhost:8080${ctxPath}/home/${currentUserId}`);
    
    homeSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch(data.code) {
            case 112: {  
                if (data.data.postId !== null) {
                    handlePostCommentCount(data.data.postId.id, 1);
                    const post = $(`#post${data.data.postId.id}`);

                    if(post.length > 0) {
                        if(data.data.userId.id === currentUserId)
                            post.find('#commentedComment').prepend(commentItem(data.data, data.data.postId.id));
                        else
                            post.find('#commentedComment').append(commentItem(data.data, data.data.postId.id));  
                    }
                }
                else {
                    const comment = $(`#commentItem${data.data.parentId.id}`);
                    if (comment.length > 0) {
                        const replies = $(`#repliedComments${data.data.parentId.id}`);
                        const postId = comment.parents(`.post`).attr('id').slice(4);
                        
                        if(data.data.userId.id === currentUserId)
                            replies.prepend(commentItem(data.data, postId));
                        else
                            replies.append(commentItem(data.data, postId));
                    }
                }
                
                break;
            }
            case 113: {
                
                const comment = $(`#commentItem${data.data.id}`);
                
                if(comment.length > 0) {
                    const postId = comment.parents(`.post`).attr('id').slice(4);
                    
                    comment.html(commentItem(data.data, postId));
                }
                
                break;
            }
            case 114: {
                if (data.data.postId !== null) {
                    handlePostCommentCount(data.data.postId.id, -1);
                }
                
                const comment = $(`#commentItem${data.data.id}`);
                if(comment.length > 0) {
                    comment.remove();
                }
                
                break;
            }
            case 120: {
                handlePostLikeCount(data.data.reactPK.postId , 1);
                
                break;
            }
            case 121: {
                handlePostLikeCount(data.data.reactPK.postId , -1);
                
                break;
            }
            case 122: {
                handleCommentLikeCount(data.data.reactCommentPK.commentId, 1);
                
                break;
            }
            case 123: {
                handleCommentLikeCount(data.data.reactCommentPK.commentId, -1);
                
                break;
            }
            default:
                throw new Error("Unsupported");
        }
    }
    
    homeSocket.onclose = (event) => {
        
    }
}

function destroySocket() {
    if(auctionSocket !== undefined && auctionSocket.readyState !== 3)
        auctionSocket.close();
    if(homeSocket !== undefined && homeSocket.readyState !== 3)
        homeSocket.close();
}




