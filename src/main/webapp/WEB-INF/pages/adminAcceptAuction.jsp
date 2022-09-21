
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div class="accept-content container-fluid">
    <button class="button-menu-mobile open-left" onclick="openSideBar()">
        <i class="fa-solid fa-bars"></i>
    </button>
    
    <h5 class="page-title pt-4">Đang chờ duyệt</h5>
    
    <table class="w-100 table-report">
        <thead>
            <tr>
                <th>Nội dung</th>
                <th>Hình ảnh</th>
                <th>Giá khởi điểm</th>
                <th>Thời gian tạo</th>
                <th><i class="fa-solid fa-circle-exclamation" style="color: red; font-size: 18px; background-color: #fff; border-radius: 50%"></i></th> 
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${auctions}" var="a">
                <tr class="report-item">
                    <td style="width: auto;">${a.content}</td>
                    <td style="width: 250px;">
                        <img style="width: 160px; height: 160px; object-fit: cover;" src="${a.image}" alt="auction${a.id}" />
                    </td>
                    <td><fmt:formatNumber value="${a.startingPrice}" minFractionDigits="2"/>đ</td>
                    <td><fmt:formatDate value="${a.auctionDate}" pattern="dd-MM-yyyy HH:mm" /></td>
                    <td style="width: 180px;">
                        <button class="btn-accept my-1" onclick="acceptAuction(${a.id}, this)">Duyệt</button>
                        <button class="btn-solve my-1" onclick="deleteAuction(${a.id}, this)">Hủy</button>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<script src="<c:url value="/resources/js/auction.js" />"></script>
