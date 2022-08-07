
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
                        <div class="input-group">
                            <input type="date" class="form-control" style="width: 200px" id="dash-daterange">
                        </div>
                        <span class="input-group-text bg-primary border-primary text-white ms-2">
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
