
function addBid(currentAuctionId, formEl, startPrice) {
    event.preventDefault();
    var formData = new FormData(formEl);
    const money = formData.get('bidValue');
    
    if (!isBlank(money) && money !== "" && money >= startPrice) {
        $(`.bid-loading-${currentAuctionId}`).css("display", "block");
        $.ajax({
           type: 'post',
           url: '/SharingHope/api/create-bid',
           data:JSON.stringify({
               'money':formData.get('bidValue'),
               'auctionId':currentAuctionId
           }),
           contentType: 'application/json',
           dataType: 'json',
           success: function (data) {
               $(`.bid-loading-${currentAuctionId}`).css("display", "none");
               $(formEl).parents('.post').find('#bidForm').addClass("hide");
               
               const bided = $(formEl).parents('.post').find('.bided');
               bided.prepend(bidItem(data));
               updateCount(currentAuctionId, 1);
               
           },
           statusCode: {
                406: function(xhr) {
                    $(formEl).find('.err-validate').css("display", "block");
                    $(formEl).find('.err-validate').text('Vui lòng đặt giá cao hơn!');
                }
  }
       }).fail(function() {
            $(`.bid-loading-${currentAuctionId}`).css("display", "none");
       });
    } else {
        $(formEl).find('.err-validate').css("display", "block");
    }
}

function deleteBid(auctionId, element) {
    const bid = $(element).parents('.bid-item');
    const temp = bid.html();
    swal({
        title: "Bạn có chắc là hủy đấu giá bài viết này?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
    .then((isDeleted) => {
        if (isDeleted) {
            bid.html(commentLoading);
            $.ajax({
                type: 'delete',
                url: `/SharingHope/api/delete-bid/${auctionId}`,
                contentType: 'application/json',
                dataType: 'json',
                success : function () {
                    
                    swal("Hủy tham gia thành công", {
                    icon: "success"
                    });
                    
                    $(`.auction-post-${auctionId}`)
                            .find('#bidForm')
                            .removeClass('hide');
                            updateCount(auctionId, 0);
                    bid.remove();
                    
                }
             });
         }
     });
}

function updateBid(auctionId, userId) {
    $.ajax({
            type: 'put',
            url: `${ctxPath}/api/update-bid/${userId}`,
            data: JSON.stringify({
                'auctionId': auctionId,
                'money': ''
            }),
            dataType : 'json',
            contentType : 'application/json'
        });
}

function selectIsWinnerAuction(auctionId, userId, element) {
    if ($(element).hasClass('is-winner')) {
        $(element).removeClass('is-winner');
        updateBid(auctionId, userId);
    } else {
        $(element).addClass('is-winner');
        updateBid(auctionId, userId);
    }
}

function unique(arr, data) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function showBid(element, auctionId) {
    var bidContainer = $(element).parents(`.auction-post-${auctionId}`).find('.auction-user-join');
    var bidAppend = $(bidContainer).find('.bided').empty();
    
    $(bidContainer).find('.bid-loading').css("display", "block");
    if (bidContainer.hasClass('show')) {
        $(bidContainer).removeClass('show');
    } else {
        $(bidContainer).addClass('show');
        $.ajax({
            type: 'get',
            url: `${ctxPath}/api/get-bids/` + auctionId,
            dataType: 'json',
            success: function (data) {
                data.sort(function (a, b) {
                    return b.money - a.money;
                });
                
                $(bidAppend).append(`${[data[0]].map((bid, index) => {
                    return bidItem(bid);
                }).join('')}`);
                
                data.shift();
                $(bidContainer).find('.bid-loading').css("display", "none");
                let userbid = data.filter(b => b.user.id === currentUserId);
                let otherBid = data.filter(b => b.user.id !== currentUserId);
                
                
                $(bidAppend).append(`${(userbid).map((bid, index) => {
                    return bidItem(bid);
                }).join('')}`);
                
                 $(bidAppend).append(`${(otherBid).map((bid, index) => {
                    return bidItem(bid);
                }).join('')}`); 
            }
        }).done(function() {
            if (bidAppend.find(`#${currentUserId}`).length) 
                $(bidContainer).find('#bidForm').addClass("hide");
        });
    }
}

function updateCount(auctionId, op) {
    const countElement = $(`.auction-post-${auctionId}`).find('#countBid');
    let count = countElement.text();
    
    if(op === 0) {
        count--;
        countElement.text(count);
    }
    else {
        count++;
        countElement.text(count);
    }
}
