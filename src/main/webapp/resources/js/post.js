   
//Load theo trang cho trang chu
const ctxPath = '/SharingHope';
const loadingTop = $('#loadingTop');
const loadingBottom = $('#loadingBottom');
const feedContainer = $('#feeds-container');
var postPage = 1;
var postFetching = false;
var disableLoadMorePost = false;
var errorHtml =  `<div class="text-center mt-3 post-loading">
                                <p class="post--content mb-3" style="font-size:30xp;">
                                    Có lỗi xảy ra, không thể đăng bài ngay lúc này!
                                </p>
                                <img class="card-img post--img" src="https://res.cloudinary.com/quoc2401/image/upload/v1659441156/eocshmhivko3pjpa0kkg.png" alt="Error">
                            </div>`;

function postNextPage() {
    if (postFetching) return;
    
    postPage++;
}

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

function loadPosts(endpoint, currentUserId, page) {
    if (!page) {
        page = 1;
    }
    
    $(loadingBottom).css("display", "block");
    auctionFetching = true;

    $.ajax({
        type: 'get',
        url: endpoint + '?page=' + page,
        dataType: 'json',
        success: function (data) {
            
            if (data.length === 0) {
                disableLoadMorePost = true;
            }
            
            loadFeeds(data, currentUserId);
            $(loadingBottom).css("display", "none");
            postFetching = false;
        }
    });
}

function findHashtags(searchText) {
    var regexp = /(\s|^)\#\w\w+\b/gm
    result = searchText.match(regexp);
    if (result) {
        result = result.map(function(s){ return s.trim(); }).join(' ');
        return result;
    } else {
        return "";
    }
}

function createPost() {
    var formData = new FormData();
    var fs = document.getElementById('uploadImage');
    var content = $('#statusContent').val();
    var imgSrc = $('#uploadPreview').prop('src');
    console.log(imgSrc);
    if (!isBlank(content) || imgSrc !== undefined)  {
        if(fs.files[0] === undefined) {
            createStatus();
        }
        else {
            var fileType = fs.files[0]['type'];
            var validImageTypes = ['image/jpeg', 'image/png'];
            if (!validImageTypes.includes(fileType)) {
                alert("Không thể nhận loại file này!");
            }
            else {
                $(loadingTop).css('display', 'block');

                for (const file of fs.files) {
                    formData.append("file", file);
                }
                $.ajax({
                    type: 'post',
                    url: `${ctxPath}/api/post-img`,
                    data: formData,
                    dataType : "json",
                    processData : false,
                    cache : false,
                    contentType : false
                })
                .done(function(data){

                    $.ajax({
                        type: 'post',
                        url: `${ctxPath}/api/create-post`,
                        data: JSON.stringify({
                            'content':content,
                            'hashtag': findHashtags(content),
                            'imgUrl':data.url
                        }),
                        dataType : 'json',
                        contentType : 'application/json',
                        success: function (data) {
                            $(loadingTop).css('display', 'none');
                            $('#statusContent').val(null);
                            $('.highlighter').html('');
                            $('uploadImage').val(null);
                            $('#uploadPreview').attr("src", "");
                            prependFeeds(data);
                        }
                    })
                    .fail(function(){
                        $(loadingTop).css('display', 'none');
                        $(feedContainer).prepend(errorHtml);
                    });
                })
                .fail(function(){
                    $(loadingTop).css('display', 'none');
                    $(feedContainer).prepend(errorHtml);
                });

                $('.modal-post').removeClass('open');
            }
        }
    }
    else
        alert("Vui lòng nhập nội dung bài viết!");
}

function createStatus() {
    $(loadingTop).css('display', 'block');
    var content = $('#statusContent').val();
    $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-post`,
            data: JSON.stringify({
                'content':content,
                'hashtag': findHashtags(content),
                'imgUrl':''
            }),
            dataType : 'json',
            contentType : 'application/json',
            success: function (data) {
                $(loadingTop).css('display', 'none');
                $('#statusContent').val("");
                $('.highlighter').html('');
                prependFeeds(data);
            }
        })
        .fail(function(){
            $(loadingTop).css('display', 'none');
            $(feedContainer).prepend(errorHtml);
        });
        
        $('.modal-post').removeClass('open');
}

function deletePost(id, el) {
    event.preventDefault();
    
    var loadingHtml =   `   <div class="text-center mt-3 post-loading">
                                            <div class="spinner-border text-muted"></div>
                                        </div>
                                    `; 
    var clickedPost = $(el).parents('.post');
    var clickedPostHtml = $(clickedPost).html();
    
    $(clickedPost).html(loadingHtml);
    
    $.ajax({
            type: 'delete',
            url: `${ctxPath}/api/delete-post/${id}`,
            dataType: 'json',
            success: function () {
                $(clickedPost).remove();
            }
    })
    .fail(function (){
        $(clickedPost).html(clickedPostHtml);
    });
}

function editPost(id, el) {
    event.preventDefault();
    var clickedPost = $(el).parents('.post');
    
    var content = $(clickedPost).find('.post--content').text();
    var imgSrc = $(clickedPost).find('.post--img').prop('src');
    if (imgSrc.toLowerCase().indexOf('https://') === -1 )
        imgSrc = '';
    modalEditPost(id, $(el), content.trim(), imgSrc);
}

function modalEditPost(id, el, content, src) {
    var html = `<div id="modalEditPost" class="modal modal-post open">
                    <div class="modal-container modal-container-post">
                        <div class="modal-header">
                            <h5 class="my-2">Thêm bài viết</h5>
                            <div class="modal--close modal--close-post" onclick="removeEditModal()">
                                <i class="fa-solid fa-xmark p-2"></i>
                            </div>
                        </div>

                        <div class="modal-body ">
                            <div class="d-flex mb-3">
                                <div>
                                    <a href="#"> <img class="avatar-img rounded-circle" src="${$("#userAvatar").attr("src")}" alt=""> </a>
                                </div>
                                <form class="w-100 ms-1">
                                    <textarea id="editingStatusContent" class="form-control pe-4 border-0 theSelector" placeholder="Bạn đang nghĩ gì thế?" rows="2" style="height: 115px;">${content}</textarea>
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
                            <button type="button" class="btn btn-success" onclick="comfirmEditPost(${id})">Chỉnh sửa</button>
                        </div>
                    </div>
                </div>`;
    $('.home-content').append(html);
}

function removeEditModal() {
    $('#modalEditPost').remove();
}

function comfirmEditPost(id) {
    var loadingHtml =   `   <div class="text-center mt-3 post-loading">
                                            <div class="spinner-border text-muted"></div>
                            </div>
                                    `; 
    var clickedPost = $(`#post${id}`);
    var clickedPostHtml = $(clickedPost).html();
    
    var content = $('#editingStatusContent').val();
    var imgSrc = $('#editPreview').prop('src');
    
    if (imgSrc.toLowerCase().indexOf('https://') === -1 ) {
    
        var formData = new FormData();
        var fs = document.getElementById('editImage');
        var content = $('#editingStatusContent').val();

        if (!isBlank(content) || imgSrc !== undefined)  {
            if(fs.files[0] === undefined) {
                editStatus(id);
            }
            else {
                var fileType = fs.files[0]['type'];
                var validImageTypes = ['image/jpeg', 'image/png'];
                if (!validImageTypes.includes(fileType)) {
                    alert("Không thể nhận loại file này!");
                }
                else {
                    $(clickedPost).html(loadingHtml);
                    removeEditModal();
                    for (const file of fs.files) {
                        formData.append("file", file);
                    }
                    $.ajax({
                        type: 'post',
                        url: `${ctxPath}/api/post-img`,
                        data: formData,
                        dataType : "json",
                        processData : false,
                        cache : false,
                        contentType : false
                    })
                    .done(function(data){
                        $.ajax({
                            type: 'put',
                            url: `${ctxPath}/api/edit-post/${id}`,
                            data: JSON.stringify({
                                'content':content,
                                'hashtag': findHashtags(content),
                                'imgUrl':data.url
                            }),
                            dataType : 'json',
                            contentType : 'application/json',
                            success: function (data2) {
                                $(clickedPost).html(clickedPostHtml);
                                $(clickedPost).find('.post--content').text(data2.content);
                                $(clickedPost).find('.post--img').attr('src', data2.image);
                                $(clickedPost).find('.post--img').css('display', 'block');
                            }
                        })
                        .fail(function(){
                            $(clickedPost).html(clickedPostHtml);
                        });
                    })
                    .fail(function(){
                        $(clickedPost).html(clickedPostHtml);
                    });
                }
            }
        }
        else
            alert("Vui lòng nhập nội dung bài viết!");
    }
    else {
        $(clickedPost).html(loadingHtml);
        removeEditModal();
        $.ajax({
            type: 'put',
            url: `${ctxPath}/api/edit-post/${id}`,
            data: JSON.stringify({
                'content':content,
                'hashtag': findHashtags(content),
                'imgUrl':imgSrc.toLowerCase()
            }),
            dataType : 'json',
            contentType : 'application/json',
            success: function (data2) {
                $(clickedPost).html(clickedPostHtml);
                $(clickedPost).find("#timeFromNow").text(moment(data2.postedDate).fromNow());
                $(clickedPost).find('.post--content').text(data2.content);
                $(clickedPost).find('.post--img').attr('src', data2.image);
            }
        })
        .fail(function(){
            $(clickedPost).html(clickedPostHtml);
        });
    }
    
}

function editStatus(id) {
    var loadingHtml =   `   <div class="text-center mt-3 post-loading">
                                            <div class="spinner-border text-muted"></div>
                            </div>
                                    `; 
    var clickedPost = $(`#post${id}`);
    var clickedPostHtml = $(clickedPost).html();
    var content = $('#editingStatusContent').val();
    
    $(clickedPost).html(loadingHtml);
    removeEditModal();
    $.ajax({
        type: 'put',
        url: `${ctxPath}/api/edit-post/${id}`,
        data: JSON.stringify({
            'content':content,
            'hashtag': findHashtags(content),
            'imgUrl':''
        }),
        dataType : 'json',
        contentType : 'application/json',
        success: function (data) {
            $(clickedPost).html(clickedPostHtml);
            $(clickedPost).find("#timeFromNow").text(moment(data.postedDate).fromNow());
            $(clickedPost).find('.post--content').text(data.content);
            $(clickedPost).find('.post--img').css('display', 'none');
            $(clickedPost).find('.post--img').attr('src', '');
        }
    })
    .fail(function(){
        $(clickedPost).html(clickedPostHtml);
    });
}