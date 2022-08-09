
var ctxPath = '/SharingHope';
var currentUserId;

const isBlank = function isBlank(str) {
    return (!str || /^\s*$/.test(str));
};

$(function () {
    let pathName = location.pathname.split("/").find(function (element) {
        if (element.indexOf("SharingHope"))
            return element;
    });
    
    switch (pathName) {
        case undefined:
            $('#homeMenu').addClass('active');
            break;
        case "auction":
            $('#auctionMenu').addClass('active');
            break;
        case "admin":
            $('#chartMenu').addClass('active');
            break;
    }
});

const sidebar_right = document.querySelector(".sidebar-right");
//const chat_menu = document.querySelector("#chatMenu");
//
//const close_chat = document.querySelector(".chat--close");
//
////chat menu
//chat_menu.addEventListener("click", () => {
//    sidebar_right.style.display = "block";
//});
//
//close_chat.addEventListener("click", () => {
//    sidebar_right.style.display = "none";
//});

function loadSideBarLeft() {
    const path = '/SharingHope/';
    $.ajax({
        type: 'get',
        url: path + 'api/auction-side',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                let html = `
                    <div class="d-flex align-items-center pt-4">
                        <div class="p-1">
                            <a href="${path}user/${item.userId.id}">
                                <img src="${item.userId.avatar}" alt="avatar" class="avatar-img rounded-circle"/>
                            </a>
                        </div>
                        <div class="ms-2 small">
                            <h6 class="card-title mb-0"><a href="${path}user/${item.userId.id}">${item.userId.lastname} ${item.userId.firstname}</a></h6>
                            đã đăng đấu giá
                            <span>${moment(item.auctionDate).fromNow()}</span>
                        </div>
                    </div>
                `;

                $('.auction-side--item').append(html);
                $('.sideleft-loading').css("display", "none");
            });
        }
    });
}

function modalEditPost(id, content, src, pojo) {
    var html = `<div id="modalEditPost" class="modal modal-post open">
                    <div class="modal-container modal-container-post">
                        <div class="modal-header">
                            <h5 class="my-2">Chỉnh sửa bài viết</h5>
                            <div class="modal--close modal--close-post" onclick="removeEditModal()">
                                <i class="fa-solid fa-xmark p-2"></i>
                            </div>
                        </div>

                        <div class="modal-body ">
                            <div class="d-flex mb-3">
                                <div>
                                    <a href="#"> <img class="avatar-img rounded-circle" src="${$("#userAvatar").attr("src")}" alt=""> </a>
                                </div>
                                <form class="w-100">
                                    <textarea id="editingStatusContent" class="form-control ms-2 pe-4 border-0 theSelector" placeholder="Bạn đang nghĩ gì thế?" rows="2" style="height: 115px;">${content}</textarea>
                                </form>
                            </div>

                            <div class="dropzone card shadow-none w-100">
                                <div class="d-flex modal--remove-img justify-content-end" onclick="removeImg(this)" ${(src !== '') ? `style="opacity:0.6"`:``}>
                                    <i class="fa-solid fa-xmark p-2"></i>
                                </div>
                                <label class="d-flex align-items-center justify-content-center" style="cursor: pointer;">
                                    <img class="imagePreview" id="editPreview" src="${src}"/>
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="d-flex flex-column justify-content-center align-items-center">
                                            <i class="fa-solid fa-images images-icon"></i>
                                            <p class="text-secondary mt-2">Nhấn để thêm ảnh</p>
                                        </div>
                                    </div>
                                    <input id="editImage" type='file' name='edit-image' class='upload-image' onchange="previewImage(this)" />
                                </label>
                            </div>
                        </div>

                        <div class="modal-footer ">
                            <button type="button" class="btn btn-danger me-2 modal--close-post" onclick="removeEditModal()">Huỷ</button>
                            <button type="button" class="btn btn-success" onclick="${(pojo === "post") ? `comfirmEditPost(${id})` : `comfirmEditAuction(${id})`}">Chỉnh sửa</button>
                        </div>
                    </div>
                </div>`;
    $('.home-content').append(html);
}

function removeEditModal() {
    $('#modalEditPost').remove();
}

function removeImg(el) {
    $(el).parents('.modal-post').find('.imagePreview').attr('src', '');
    $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0');
    $(el).parents('.modal-post').find('.upload-image').val(undefined);
}

function previewImage(el) {
    var oFReader = new FileReader();
    if (el.id === 'uploadImage') {
        oFReader.readAsDataURL(document.querySelector("#uploadImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector("#uploadPreview").src = oFREvent.target.result;
        };
        
        $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0.6');
    }
    else {
        oFReader.readAsDataURL(document.querySelector("#editImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector("#editPreview").src = oFREvent.target.result;
        };
        $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0.6');
    }
};
