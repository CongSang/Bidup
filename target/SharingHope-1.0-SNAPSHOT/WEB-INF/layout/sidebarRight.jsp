<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="row g-3">
    <div class="col-12 ">
        <div class="card" style="max-height: 100%; min-height: 88vh">
            <div class="card-header pb-0 pt-4 border-0 d-flex justify-content-between align-items-center pe-0">
                <h5 class="card-title mb-0" style="font-size: 18px;">Những người có thể bạn quan tâm</h5>
                <div class="modal--close d-lg-none chat--close">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>
                
            <div class="card-body pb-3 px-0 user-side--item">
                <div class="text-center mt-3 sideright-loading">
                    <div class="spinner-border text-muted"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(function () {
        loadSideBarRight();
    });
</script>
