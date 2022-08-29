<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="row g-3">
    <div class="col-12">
        <div class="card auction-card" style="max-height: 100%; min-height: 88vh">
            <div class="card-header pb-0 pt-4 border-0">
                <h5 class="card-title mb-0">Hoạt động đấu giá gần đây</h5>
            </div>

            <div class="card-body pb-4 pt-2 auction-side--item">

                <div class="text-center mt-3 sideleft-loading">
                    <div class="spinner-border text-muted"></div>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
    $(function () {
        loadSideBarLeft();
    });
</script>
