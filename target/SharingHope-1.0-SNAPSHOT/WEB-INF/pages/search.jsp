<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="home-content row justify-content-end">
    <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
        <div class="spinner-border text-muted"></div>
    </div>
    <div class="col-md-8 right-part">
        <div class="person-search">
            <h3 class="title">Moi Nguoi</h3>
            <div class="person-search-item justify-content-between">
                <div>
                    <div class="person-search-item-image">
                        <a href="#">
                            <img class="avatar-img rounded-circle" src="https://res.cloudinary.com/quoc2401/image/upload/v1660124885/bnykdw4dy0tw3cfoll8r.png" alt="">
                        </a>
                    </div>
                    <div class="person-search-item-name">
                        <h6 class="nav-item card-title mb-0">
                            <a href="#">Ho va ten</a>
                        </h6>
                    </div>
                </div>
                <div class="btn-follow">Follow</div>
            </div>
            <div class="person-search-item">
                    <div class="person-search-item-image">
                        <a href="#">
                            <img class="avatar-img rounded-circle" src="https://res.cloudinary.com/quoc2401/image/upload/v1660124885/bnykdw4dy0tw3cfoll8r.png" alt="">
                        </a>
                    </div>
                    <div class="person-search-item-name">
                        <h6 class="nav-item card-title mb-0">
                            <a href="#">Ho va ten</a>
                        </h6>
                    </div>
            </div>
            
        </div>
        <div class="post-search">
            <h3 class="title">Bai viet</h3>
            <div id="feeds-container" class="justify-content-end">
                <div class="post" id="post1">      
                    <div class="card post--item">
                        <div class="card-header border-0 pb-0 pt-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-start">
                                    <div class="me-2">
                                        <a href="#">
                                            <img class="avatar-img rounded-circle" src="https://res.cloudinary.com/quoc2401/image/upload/v1660124885/bnykdw4dy0tw3cfoll8r.png" alt="">
                                        </a>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0">
                                                <a href="#">Ho va ten</a>
                                            </h6>
                                            <span class="ms-2 nav-item small text-secondary" id="timeFromNow"></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="dropdown">
                                    <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="card-body pb-2">
                            <p class="post--content mb-3 content--hashtag post-1">
                                content
                            </p>
                            <img class="card-img post--img" src="https://res.cloudinary.com/quoc2401/image/upload/v1660124885/bnykdw4dy0tw3cfoll8r.png" alt="Post image" onclick="showFull(this)">

                            <div class="line"></div>


                            <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                    <div class="post--action-hover" id="likeAction" onclick="createReact('${post.id}', this)">

                                        <span class="post--action-text ms-2">Thích (<span id="likeCounter">0</span>)</span>
                                    </div>
                                </div>
                                <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                                    <div class="post--action-hover" onclick="showComment(this, 1)">
                                        <i class="fa-regular fa-message post--action-icon"></i>
                                        <span class="post--action-text ms-2">Bình luận</span>
                                    </div>
                                </div>
                            </div>

                            <div class="comment">
                                <div class="d-flex align-items-center my-2">
                                    <div class="me-2">

                                        <a href="#">
                                            <img class="comment--avatar rounded-circle" src="https://res.cloudinary.com/quoc2401/image/upload/v1660124885/bnykdw4dy0tw3cfoll8r.png" alt="">
                                        </a>
                                    </div>
                                    <form class="w-100" onsubmit="addComment(1, this)" id="commentForm">
                                        <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                                    </form>
                                </div>
                                <div class="text-center mt-3 comment-loading" style="display:none;">
                                    <div class="spinner-border text-muted"></div>
                                </div>
                                <div id="commentedComment" class="flex">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="text-center mt-3 post-loading" id="loadingBottom">
            <div class="spinner-border text-muted"></div>
        </div>   
    </div>
                           

</div>
                                
<div class="search-sidebar justify-content-center">
    <div class="search-title">Bộ lọc tìm kiếm</div>
    <div class="line" style="width: 95%"></div>
    <div class="search-filter">
        <div class="search-filter-item">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Tat ca
            </span>
        </div>
        <div class="search-filter-item">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Moi nguoi
            </span>
        </div>
        <div class="search-filter-item">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Bai viet
            </span>
        </div>
        <div class="search-filter-item">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Bai dau gia
            </span>
        </div>
    </div>
</div>
                                    
<script>
    window.onload = function() {
        disableLoadMorePost = false;
        currentUserId = '${sessionScope.currentUser.id}';
        $('#userNotification').on("click", function () {
            $('.notif-count').css('opacity', '0');
        });
    };
</script>