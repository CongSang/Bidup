<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="container" style="margin-top: 82px">
    <div class="row g-3">
        <div class="col-sm-12 col-md-12 col-lg-5">
            <div class="search-sidebar">
                <div class="search-title">Bộ lọc tìm kiếm</div>
                <div class="line" style="width: 100%"></div>
                <div class="search-filter w-100">
                    <div class="search-filter-item" onclick="searchFilter('all')">
                        <i class="fa fa-newspaper-o me-2" aria-hidden="true"></i>
                        <span>
                            Tất cả
                        </span>
                    </div>
                    <div class="search-filter-item" onclick="searchFilter('people')">
                        <i class="fa-solid fa-user me-2"></i>
                        <span>
                            Mọi người
                        </span>
                    </div>
                    <div class="search-filter-item" onclick="searchFilter('posts')">
                        <i class="fa-solid fa-file me-2"></i>
                        <span>
                            Bài viết
                        </span>
                    </div>
                    <div class="search-filter-item" onclick="searchFilter('auctions')">
                        <i class="fa-solid fa-gavel me-2"></i>
                        <span>
                            Bài đấu giá
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-content col-sm-12 col-md-12 col-lg-7">
            <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
                <div class="spinner-border text-muted"></div>
            </div>
            <div class="right-part">
                <div class="person-search mb-3">
                    <h3 class="title">Mọi người</h3>
                    <div id="personsContainer">

                    </div>



                </div>
                <div class="post-search mb-3">
                    <h3 class="title mb-0">Bài viết</h3>
                    <div id="feeds-container" class="justify-content-end">

                    </div>
                </div>

                <div class="auction-search mb-3">
                    <h3 class="title mb-0">Bài đấu giá</h3>
                    <div class="justify-content-end auction-container">

                    </div>
                </div>

                <div class="text-center mt-3 post-loading" id="loadingBottom">
                    <div class="spinner-border text-muted"></div>
                </div>   
            </div>
        </div>
    </div>
</div>

<script src="<c:url value="/resources/js/feeds.js" />"></script>                                    
<script src="<c:url value="/resources/js/comment.js" />"></script>
<script src="<c:url value="/resources/js/loadAuctionPage.js" />"></script>
<script src="<c:url value="/resources/js/bid.js" />"></script>
<script>
    window.onload = function() {
        postPage = 1;
        disableLoadMorePost = false;
        currentUserId = '${sessionScope.currentUser.id}';
        $('#userNotification').on("click", function () {
            $('.notif-count').css('opacity', '0');
        });
        let url = new URL(window.location.toString());
        let kw = url.searchParams.get('kw');
        $('input[name=kw]').val(kw);
        let locate = window.location.pathname;
        
        if (locate === (ctxPath + '/search/top'))
            topSearch();
        else if (locate === (ctxPath + '/search/people')) {
            personSearch();
            $('.post-search').css('display', 'none');
            $('.auction-search').css('display', 'none');
        }
        else if (locate === (ctxPath + '/search/posts')) {
            contentSearch();
            $('.person-search').css('display', 'none');
            $('.auction-search').css('display', 'none');
        }
        else {
            auctionSearch();
            $('.person-search').css('display', 'none');
            $('.post-search').css('display', 'none');
        }
    };
</script>