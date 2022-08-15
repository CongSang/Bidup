
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<div class="home-content" style="margin-top: -16px;">
    <div class="text-center mt-3 auction-loading">
        <div class="spinner-border text-muted"></div>
    </div>
    <div class="auction-container">

    </div>
</div>

<div id="modal02" class="modal align-items-center justify-content-center" onclick="this.style.display = 'none'">
    <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
        <img id="img02" style="max-width:100%; max-height:100vh;">
    </div>
</div>


<script src="<c:url value="/resources/js/feeds.js" />"></script>
<script src="<c:url value="/resources/js/loadSingleAuction.js" />"></script>
<script src="<c:url value="/resources/js/loadAuctionPage.js" />"></script>
<script src="<c:url value="/resources/js/auction.js" />"></script>
<script src="<c:url value="/resources/js/bid.js" />"></script>

<script>
    $(function () {
        currentUserId = '${sessionScope.currentUser.id}';
        loadSingleAuction(${auction.id});
        $('#userNotification').on("click", function () {
            $('.notif-count').css('opacity', '0');
        });
    });
</script>