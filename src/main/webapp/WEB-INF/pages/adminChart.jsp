
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="chart-content container-fluid pb-4">
    <button class="button-menu-mobile open-left" onclick="openSideBar()">
        <i class="fa-solid fa-bars"></i>
    </button>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <c:url value="/admin" var="action" />
                    <form action="${action}" class="d-flex">
                        <div class="d-flex flex-column flex-lg-row">
                            <div class="form-group text-start">
                                <label for="month" class="me-1 small">Tháng</label>
                                <select type="number" class="form-control me-2 mb-2" name="month" style="width: 200px" id="month">
                                    <option value="0">Tất cả</option>
                                    <c:forEach begin="1" end="12" var="i">
                                        <option value="${i}">${i}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <div class="form-group text-start">
                                <label for="month" class="me-1 small">Năm</label>
                                <select type="number" class="form-control me-2 mb-2" name="year" style="width: 200px" id="year">
                                    <c:forEach begin="2022" end="${currentYear}" var="i">
                                        <option value="${i}">${i}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                        <div class="form-group text-start">
                            <label></label>
                            <button type="submit" class="input-group-text bg-primary border-primary text-white mb-2 load-stats">
                                <i class="fa-solid fa-rotate-right"></i>
                            </button>
                        </div>
                        
                    </form>
                </div>
                <h5 class="page-title">Thống kê</h5>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-account-multiple widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Number of Customers">Người dùng</h5>
                    <h3 class="mt-3 mb-3">+ ${userCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                            <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-cart-plus widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Number of Orders">Số bài viết</h5>
                    <h3 class="mt-3 mb-3">+ ${postCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                            <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div> <!-- end row -->

    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-currency-usd widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Average Revenue">Số bài đấu giá</h5>
                    <h3 class="mt-3 mb-3">+ ${auctionCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                            <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-pulse widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Growth">Báo cáo người dùng</h5>
                    <h3 class="mt-3 mb-3">+ ${reportUserCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                            <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div> <!-- end row -->
    <div class="row">
        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-currency-usd widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Average Revenue">Số lượt thích</h5>
                    <h3 class="mt-3 mb-3">+ ${reactCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                            <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->

        <div class="col-sm-12 col-md-6">
            <div class="card widget-flat">
                <div class="card-body">
                    <div class="float-end">
                        <i class="mdi mdi-pulse widget-icon"></i>
                    </div>
                    <h5 class="text-muted fw-normal mt-0" title="Growth">Số lượt bình luận</h5>
                    <h3 class="mt-3 mb-3">+ ${commentCount}</h3>
                    <p class="mb-0 text-muted">
                        <span class="mx-2" style="color: #32e37f"><i class="fa-solid fa-arrow-trend-up"></i></span>
                        <span class="text-nowrap">
                        <c:choose>
                                <c:when test="${month == 0 && year != 0}">
                                    Năm ${year}
                                </c:when>
                                <c:when test="${month != 0 && year != 0}">
                                    Trong tháng ${month} năm ${year}
                                </c:when>
                            </c:choose>
                        </span>
                    </p>
                </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div> <!-- end col-->
    </div> <!-- end row -->

    <div class="row w-100 mb-4" style="min-height: 350px">
        <div class="col-md-5 mb-2">
            <img class="w-100 p-4" src="https://res.cloudinary.com/dynupxxry/image/upload/v1660355570/netflix/6915.png_300_nfqppx.png" alt="show chart"/>
        </div>
        <div class="col-md-7 mt-3">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</div>

<script>
   $(function () {
       let labels = ["@Người dùng", "@Bài viết", "@Bài đấu giá"];
       let data = [${userCount}, ${postCount}, ${auctionCount}];
       
       chart(labels, data);
   });
</script>