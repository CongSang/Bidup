<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="home-content row justify-content-end">
    <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
        <div class="spinner-border text-muted"></div>
    </div>
    <div class="col-md-8 right-part">
        <div class="person-search">
            <h3 class="title">Mọi người</h3>
            <div id="personsContainer">
                
            </div>
            
            
            
        </div>
        <div class="post-search">
            <h3 class="title">Bài viết</h3>
            <div id="feeds-container" class="justify-content-end">
               
            </div>
        </div>
        
        <div class="auction-search">
            <h3 class="title">Bài đấu giá</h3>
            <div class="justify-content-end auction-container">
               
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
        <div class="search-filter-item" onclick="searchFilter('all')">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Tất cả
            </span>
        </div>
        <div class="search-filter-item" onclick="searchFilter('people')">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Mọi người
            </span>
        </div>
        <div class="search-filter-item" onclick="searchFilter('posts')">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Bài viết
            </span>
        </div>
        <div class="search-filter-item" onclick="searchFilter('auctions')">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <span>
                Bài đấu giá
            </span>
        </div>
    </div>
</div>

<script src="<c:url value="/resources/js/feeds.js" />"></script>                                    
<script src="<c:url value="/resources/js/comment.js" />"></script>
<script src="<c:url value="/resources/js/loadAuctionPage.js" />"></script>
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