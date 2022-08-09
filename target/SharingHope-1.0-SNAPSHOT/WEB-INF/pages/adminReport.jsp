
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
                                <c:forEach begin="1" end="12" var="i">
                                    <option value="${i}">${i}</option>
                                </c:forEach>
                            </select>
                            <select type="number" class="form-control me-2 mb-2" name="year" style="width: 200px" id="dash-daterange">
                                <c:forEach begin="2022" end="2022" var="i">
                                    <option value="${i}">${i}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <span class="input-group-text bg-primary border-primary text-white mb-2">
                            <i class="fa-solid fa-rotate-right"></i>
                        </span>
                    </form>
                </div>
                <h5 class="page-title">Báo cáo</h5>
            </div>
        </div>
    </div>

    <table class="w-100 table-report">
        <thead>
            <tr>
                <th>Id bài viết</th>
                <th>Id người dùng</th>
                <th>Nội dung</th>
                <th>Ngày báo cáo</th>
                <th>Lí do</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
            </tr>
            <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
            </tr>

        </tbody>
    </table>
</div>
