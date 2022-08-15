
<%@page import="java.util.List"%>
<%@page import="com.charitysm.pojo.ReportPost"%>
<%@page import="com.charitysm.pojo.enumtype.ReportType"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="report-content container-fluid">
    <button class="button-menu-mobile open-left" onclick="openSideBar()">
        <i class="fa-solid fa-bars"></i>
    </button>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <form class="d-flex">
                        <div class="d-flex flex-column flex-lg-row">
                            <select type="number" class="form-control me-2 mb-2" name="month" style="width: 200px" id="dash-daterange">
                                <option value="0">Tất cả</option>
                                <c:forEach begin="1" end="12" var="i">
                                    <option value="${i}">${i}</option>
                                </c:forEach>
                            </select>
                            <select type="number" class="form-control me-2 mb-2" name="year" style="width: 200px" id="dash-daterange">
                                <c:forEach begin="2022" end="${currentYear}" var="i">
                                    <option value="${i}">${i}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <button type="submit" class="input-group-text bg-primary border-primary text-white mb-2 load-report" style="cursor: pointer;">
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
                    </form>
                </div>
                <h5 class="page-title">${reportType}</h5>
            </div>
        </div>
    </div>

    <table class="w-100 table-report">
        <thead>
            <tr>
                <th>${reportType == "Báo cáo bài viết" ? "Id bài viết" : reportType == "Báo cáo bài đấu giá" ? "Id bài đấu giá" : "Id người dùng"}</th>
                <th>Id người báo cáo</th>
                <th>Ngày báo cáo</th>
                <th>Lí do</th>
                <th><i class="fa-solid fa-circle-exclamation" style="color: red; font-size: 18px; background-color: #fff; border-radius: 50%"></i></th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${report}" var="r">
                <tr class="report-item">
                    <c:choose>
                        <c:when test="${reportType == 'Báo cáo bài viết'}">
                            <c:url value="/posts/${r.postId.id}" var="url" />
                        </c:when>
                        <c:when test="${reportType == 'Báo cáo bài đấu giá'}">
                            <c:url value="/auctions/${r.auctionId.id}" var="url" />
                        </c:when>
                        <c:when test="${reportType == 'Báo cáo người dùng'}">
                            <c:url value="/user/${r.reportedUser.id}" var="url" />
                        </c:when>
                    </c:choose>
                    <td>
                        <a href="${url}">
                            ${reportType == "Báo cáo bài viết" ? r.postId.id : reportType == "Báo cáo bài đấu giá" ? r.auctionId.id : r.reportedUser.id}
                        </a>
                    </td>
                    <td>${r.userId.id}</td>
                    <td><fmt:formatDate value="${r.reportedDate}" pattern="dd-MM-yyyy HH:mm" /></td>
                    <td>
                        ${r.reason}
                    </td>
                    <td>
                        <c:if test="${reportType == 'Báo cáo bài viết'}">
                            <button class="btn-solve" onclick="solveReportPost(${r.postId.id}, this)">Xử lí</button>
                        </c:if>
                        <c:if test="${reportType == 'Báo cáo bài đấu giá'}">
                            <button class="btn-solve" onclick="solveReportAuction(${r.auctionId.id}, this)">Xử lí</button>
                        </c:if>
                        <c:if test="${reportType == 'Báo cáo người dùng'}">
                            <button class="btn-solve" onclick="">Xử lí</button>
                        </c:if>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<script src="<c:url value="/resources/js/post.js" />"></script>
<script src="<c:url value="/resources/js/auction.js" />"></script>                
