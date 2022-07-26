var ctxPath = '/Bidup';
var currentUserId = "a";
var minimumUp = 100000;
var loca = window.location.pathname;
var timer = null;
var xhr;

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
};


$(function () {
    postPage=1;
    auctionPage=1;
    let pathName = window.location.pathname.toString();
    
    if(timer !== null) {
        clearTimeout(timer);        
    }
    window.scrollTo({top: 0,
                    left: 0,
                    behavior: 'instant'
                  });
    timer = setTimeout(function() {
        if (pathName === `${ctxPath}/home/auction`)
            homeMenu('home/auction');
        else if (pathName.includes("/home/follow"))
            homeMenu('home/follow');
        else if (pathName === `${ctxPath}/home`)
            homeMenu('home');
    }, 100);
    
});

function customHashtag(element) {
    var rgxp = new RegExp(/(\s|^)\#\w\w+\b/gm);
    var str_content_origin = $(element).text();
    var str_content = str_content_origin.match(rgxp);
    $.each(str_content, function(index, v){
        var hashtag = v.trim();
        var repl = `<span class="tag">${v}</span>`;
        $(element).html($(element).html().replace(hashtag, repl));
    });
}

function menuActive(pathName) {
    $(".menu-active").removeClass("active");
    $("a.nav-link").removeClass("active");
    destroySocket();
    
    switch (pathName) {
        case `${ctxPath}/home`:
            $('.homeMenu').addClass('active');
            homeSocketInit();
            break;
        case `${ctxPath}/home/auction`:
            $('.auctionMenu').addClass('active');
            auctionSocketInit();
            break;
        case `${ctxPath}/admin`:
            $('.chartMenu').addClass('active');
            break;
        case `${ctxPath}/home/follow`:
            $('.followMenu').addClass('active');
            break;
    }
}

function findHashtags(searchText) {
    var regexp = /(\s|^)\#\w\w+\b/gm
    result = searchText.match(regexp);
    if (result) {
        result = result.map(function (s) {
            return s.trim();
        }).join(' ') + ' ';
        return result;
    } else {
        return "";
    }
}

function loadSideBarLeft() {
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/auction-side`,
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                let html = `
                    <div class="d-flex align-items-center pt-4">
                        <div class="p-1">
                            <a href="${ctxPath}/user/${item.userId.id}">
                                <img src="${item.userId.avatar === null ? 
                                            nonAvatar : item.userId.avatar}" 
                                    alt="avatar" 
                                    class="avatar-img rounded-circle"/>
                            </a>
                        </div>
                        <div class="ms-2 small">
                            <h6 class="card-title mb-0"><a href="${ctxPath}/user/${item.userId.id}">${item.userId.lastname} ${item.userId.firstname}</a></h6>
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

function loadSideBarRight() {
    const kw = null;
    const page = 0;
    const limit = 10;
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/users?limit=${limit}`,
        dataType: 'json',
        success: function (data) {
            
            data = data.filter(p => p.id !== currentUserId && p.isFollowed === false);
            
            $('.user-side--item').append(data.map(user => {
                return userSearchItem(user);
            }).join(''));

            $('.sideright-loading').css("display", "none");
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
                                <div class="d-flex modal--remove-img justify-content-end" onclick="removeImg(this)" ${(src !== '') ? `style="opacity:0.6"` : ``}>
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
    $(el).parents('.modal-post').find('#uploadPreview').attr("src", null);
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
    } else {
        oFReader.readAsDataURL(document.querySelector("#editImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector("#editPreview").src = oFREvent.target.result;
        };
        $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0.6');
    }
}
;

function modalArticleReport(articleId, typeArticle) {
    event.preventDefault();
    const html = `<div class="modal modal-report-article open">
                            <div class="modal-container" style="min-height: auto !important;">
                                <div class="modal-header">
                                    <h5 class="my-2">Báo cáo bài viết</h5>
                                    <div class="modal--close modal--close-report-article" onclick="removeReportArticle()">
                                        <i class="fa-solid fa-xmark p-2"></i>
                                    </div>
                                </div>
    
                                 <div class="modal-body ">
                                <form>
                                    <select class="form-control">
                                        <option value="IMAGE">Ảnh bài viết không phù hợp</option>
                                        <option value="CONTENT">Nội dung bài viết không phù hợp</option>
                                        <option value="SPAM">Spam</option>
                                    </select>

                                    <button type="button" class="btn btn-danger mt-3 ml-auto" onclick="reportArticle(${articleId}, '${typeArticle}')">Gửi báo cáo</button>
                                </form>
                            </div>
                            </div>
                        </div>`;
    $('.home-content').append(html);
}
;

function removeReportArticle() {
    $('.modal-report-article').remove();
}

function reportArticle(articleId, typeArticle) {
    var reason = $('.modal-report-article').find(':selected').val();
    if (typeArticle === 'POST') {
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/report-post`,
            data: JSON.stringify({
                'articleId': articleId,
                'userId': "",
                'reason': reason
            }),
            contentType: 'application/json',
            success: function () {
                swal("Báo cáo bài viết này thành công", {
                    icon: "success"
                });
            }
        }).fail(function () {
            swal("Có lỗi xảy ra!", {
                icon: "error"
            });
        });
    } else {
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/report-auction`,
            data: JSON.stringify({
                'articleId': articleId,
                'userId': "",
                'reason': reason
            }),
            contentType: 'application/json',
            success: function () {
                swal("Báo cáo bài viết này thành công", {
                    icon: "success"
                });
            }
        }).fail(function () {
            swal("Có lỗi xảy ra!", {
                icon: "error"
            });
        });
    }

    removeReportArticle();
}


function removeItem(element) {
    $(element).parents('.report-item').remove();
}


function goToByScroll(id) {
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}
