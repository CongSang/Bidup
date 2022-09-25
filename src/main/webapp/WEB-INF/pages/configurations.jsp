<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="accept-content container-fluid">
    <button class="button-menu-mobile open-left" onclick="openSideBar()">
        <i class="fa-solid fa-bars"></i>
    </button>
    
    <h5 class="page-title pt-4">Cấu hình trang web</h5>
    
    <table class="w-100 table-report">
        <thead>
            <tr>
                <th>Tên cấu hình</th>
                <th>Giá trị</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${configs}" var="c">
                <tr class="report-item form-floating">
                    <td style="width: auto;">${c.description}</td>
                    <td style="width: 250px;">
                        <input class="form-control config-item" 
                               id="${c.name}"
                               type="text" 
                               value="${c.value}" 
                               onblur="updateConfig(this)">
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>