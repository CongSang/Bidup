   
//Load theo trang cho trang chu
const ctxPath = '/SharingHope/';
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
                    <img class="card-img post--img" src="https://res.cloudinary.com/quoc2401/image/upload/v1659441156/eocshmhivko3pjpa0kkg.png" alt="Post image" onclick="showFull(this)">
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
    
    if (content !== "" || fs.files[0] !== undefined)  {
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
                    url: `${ctxPath}api/post-img`,
                    data: formData,
                    dataType : "json",
                    processData : false,
                    cache : false,
                    contentType : false
                })
                .done(function(data){

                    $.ajax({
                        type: 'post',
                        url: `${ctxPath}api/create-post`,
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
}

function createStatus() {
    $(loadingTop).css('display', 'block');
    var content = $('#statusContent').val();
    $.ajax({
            type: 'post',
            url: `${ctxPath}api/create-post`,
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
            url: `${ctxPath}api/delete-post/${id}`,
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
    
    var loadingHtml =   `   <div class="text-center mt-3 post-loading">
                                    <div class="spinner-border text-muted"></div>
                            </div>
                        `; 
    var clickedPost = $(el).parents('.post');
    var clickedPostHtml = $(clickedPost).html();
    
    console.log("you click edit");
}


