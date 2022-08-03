
function addBid(currentAuctionId, formEl, startPrice) {
    event.preventDefault();
    var formData = new FormData(formEl);
    const money = formData.get('bidValue');
    
    if (money !== null && money >= startPrice) {
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
               
               const action = $(formEl).parents('.post').find('.post--action-comment');
               $(action).html( `<div class="auction--action-hover" onclick="deleteBid(${data.bidPK.auctionId}, this, ${startPrice})">
                                            <div class="text-center me-1 bid-loading-${currentAuctionId}" style="display: none">
                                                <div class="spinner-border text-muted"></div>
                                            </div>
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
                                                    <div class="comment--item-content">
                                                  <div class="bg-light comment-content">
                                                      <div class="d-flex justify-content-start">
                                                          <h6 class="mb-1 me-2"><a href="${ctxPath}user/${data.user.id}">${data.user.lastname} ${data.user.firstname}</a></h6>
                                                          <small>${moment(data.bidDate).fromNow()}</small>
                                                      </div>
                                                      <p class="small mb-0">
                                                          ${formatMoney(data.money)}
                                                      </p>
                                                  </div>
                                                    <div class="d-flex justify-content-end me-2 report-user">
                                                        Báo cáo
                                                    </div>
                                                </div>
                                                
                                          </div>`);
           }
       });
    } else {
        $(formEl).find('.err-validate').css("display", "block");
    }
}

function deleteBid(currentAuctionId, element, startPrice) {
    let textConfirm = "Bạn có chắc là hủy đấu giá bài viết này?";
    var userAvatar = $("#userAvatar").attr("src");
    swal({
        title: "Bạn có chắc là hủy đấu giá bài viết này?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    .then((isDeleted) => {
        if (isDeleted) {
            $(`.bid-loading-${currentAuctionId}`).css("display", "block");
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
                    swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success"
                    });
                    $(`.bid-loading-${currentAuctionId}`).css("display", "none");

                    const action = $(element).parents('.post').find('.post--action-comment');
                    const form = $(element).parents('.post').find('.auction-user-join');
                    $(action).html(`<div class="auction--action-hover">
                                                <div class="text-center me-1 bid-loading-${currentAuctionId}" style="display: none">
                                                    <div class="spinner-border text-muted"></div>
                                                </div>
                                                <i class="fa-solid fa-circle-check"></i>
                                                <span class="auction--action-text ms-2">Hủy thành công</span>
                                            </div>`);

                     $(form).html(`<div class="d-flex align-items-center my-2">
                                                <div class="me-2">
                                                    <a href="#">
                                                        <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                                                    </a>
                                                </div>
                                                <form class="w-100" onsubmit="addBid(${currentAuctionId}, this, ${startPrice})">
                                                    <input type="number" autocomplete="off" name="bidValue" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                                    <span class="text-danger err-validate" style="display: none">Số tiền đấu giá tối thiểu phải là ${formatMoney(startPrice)}</span>
                                                </form>
                                            </div>`);
                }
             });
         }
     });
}
