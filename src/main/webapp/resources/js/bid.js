
function addBid(currentAuctionId, formEl) {
    event.preventDefault();
    var formData = new FormData(formEl);
    
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
            const action = $(formEl).parents('.post').find('.post--action-comment');
            $(action).html( `<div class="auction--action-hover" onclick="deleteBid(${data.bidPK.auctionId}, this)">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                        <span class="auction--action-text ms-2">Hủy tham gia</span>
                                    </div>
                                    `); 
            
            const bidComment = $(formEl).parents('.post').find('.auction-user-join');
            $(bidComment).html(`<div class="d-flex comment--item py-2">
                                                <div class="me-2">
                                                    <a href="#">
                                                        <img class="comment--avatar rounded-circle" src="${data.user.avatar}" alt="avatar">
                                                    </a>
                                                </div>
                                                <div>
                                                    <div class="bg-light comment--item-content">
                                                        <div class="d-flex justify-content-between">
                                                            <h6 class="mb-1 me-2"><a href="#">${data.user.lastname} ${data.user.firstname}</a></h6>
                                                            <small>${moment(data.bidDate).fromNow()}</small>
                                                        </div>

                                                        <p class="small mb-0">
                                                            ${formatMoney(data.money)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>`);
        }
    });
}

function deleteBid(currentAuctionId, element) {
    let textConfirm = "Bạn có chắc là hủy đấu giá bài viết này?";
    var userAvatar = $("#userAvatar").attr("src");
    
    if(confirm(textConfirm)) {
        $.ajax({
            type: 'delete',
            url: '/SharingHope/api/delete-bid',
            data:JSON.stringify({
                'auctionId': currentAuctionId,
                'money': ""
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                const action = $(element).parents('.post').find('.post--action-comment');
                const form = $(element).parents('.post').find('.auction-user-join');
                $(action).html(`<div class="auction--action-hover">
                                            <i class="fa-solid fa-circle-check"></i>
                                            <span class="auction--action-text ms-2">Hủy thành công</span>
                                        </div>`);

                 $(form).html(`<div class="d-flex align-items-center my-2">
                                            <div class="me-2">
                                                <a href="#">
                                                    <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                                                </a>
                                            </div>
                                            <form class="w-100" onsubmit="addBid(${currentAuctionId}, this)">
                                                <input type="number" name="bidValue" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                            </form>
                                        </div>`);
            }
         });
     }
}
