<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="accept-content container-fluid">
    <button class="button-menu-mobile open-left" onclick="openSideBar()">
        <i class="fa-solid fa-bars"></i>
    </button>
    
    <h5 class="page-title pt-4">Danh sách người dùng</h5>
    <div class="d-flex justify-content-between">
        
        <button class="btn btn-success text-nowrap px-1" onclick="openUserModal(null)">Thêm người dùng</button>
        <form method="GET" class="d-inline-block ms-5">
            <input type="text" name="kw" class="form-control-sm" placeholder="Tìm kiếm"/>
        </form>
    </div>
    <div class="table-responsive">
        <table class="table table-report">
            <thead>
                <tr>
                    <th colspan="2">Id</th>
                    <th colspan="3">Email</th>
                    <th colspan="1">Created Date</th>
                    <th colspan="1">User Role</th>
                    <th colspan="1">Active</th>
                    <th colspan="2">
                        <i class="fa-solid fa-circle-exclamation" 
                           style="color: red; font-size: 18px; background-color: #fff; border-radius: 50%"></i>
                    </th>
                </tr>
            </thead>
            <tbody id="tbody">
                <c:forEach items="${users}" var="u">
                    <tr class="report-item" id="${u.id}">
                        <td colspan="2">${u.id}</td>
                        <td colspan="3">${u.email}</td>
                        <td colspan="1">${u.createdDate}</td>
                        <td colspan="1">${u.userRole}</td>
                        <td colspan="1">${u.active}</td>
                        <td colspan="2" class="d-flex gap-1 w-auto">
                            <button class="btn btn-primary text-nowrap px-1" onclick="openUserModal('${u.id}')">Chỉnh sửa</button>
                            <button class="btn btn-danger text-nowrap px-1" onclick="deleteUser('${u.id}')">Xóa</button>
                            <button 
                                class="btn btn-info text-nowrap px-1" 
                                onclick="enableUser('${u.id}')"
                                <c:if test="${u.active == 1}">
                                style="display: none;"
                                </c:if>>Kích hoạt</button>
                            
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
    <ul class="pagination">
        <c:forEach begin="1" end="${Math.ceil(count/size)}" var="i">
            <c:url value="/admin/user-list?limit=10&page=${i}" var="action" />
            <li class="page-item"><a class="page-link" href="${action}">${i}</a></li>
        </c:forEach> 
    </ul>
    
</div>