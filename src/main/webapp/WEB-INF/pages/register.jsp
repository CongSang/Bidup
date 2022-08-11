
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="styleCss" />
        <c:url value="/resources/css/login.css" var="loginCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${styleCss}" rel="stylesheet" />
        <link href="${loginCss}" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="modal">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="my-2">Đăng kí tài khoản</h3>
                    <!--                    <div class="modal--close">
                                            <i class="fa-solid fa-xmark p-2"></i>
                                        </div>-->
                </div>

                <div class="modal-body ">
                    <div class="authentication register">
                        <c:url value="/register" var="action" />
                        <form:form action="${action}" class="form-register" modelAttribute="user"
                                   enctype="multipart/form-data">

                            <div class="form-group d-flex">
                                <div class="text-start w-100 me-1">
                                    <form:input path="lastname" placeholder="Họ*" cssClass="form-control-sm" />
                                    <form:errors path="lastname" element="div" cssClass="text-danger err-validate" />
                                </div>
                                <div class="text-start w-100" >
                                    <form:input path="firstname" placeholder="Tên*" class="form-control-sm" />
                                    <form:errors path="firstname" element="div"  cssClass="text-danger err-validate" />
                                </div>
                            </div>
                            <div class="form-group text-start">
                                <form:input path="email" placeholder="Email*" cssClass="form-control-sm" />
                                <form:errors path="email" element="div" cssClass="text-danger err-validate" />
                            </div>
                            <div class="form-group text-start">
                                <form:input path="phone" placeholder="Số điện thoại*" cssClass="form-control-sm" />
                                <form:errors path="phone" element="div" cssClass="text-danger err-validate" />
                            </div>
                            <div class="form-group text-start">
                                <form:label path="birthdate" for="dateofbirth" cssClass="me-1 small">Ngày sinh<span class="text-danger">*</span></form:label>
                                <form:input path="birthdate" type="date" id="dateofbirth" placeholder="Ngày sinh*" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group text-start">
                                <form:input path="address" placeholder="Địa chỉ" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group d-flex">
                                <form:input path="hometown" placeholder="Quê quán" cssClass="form-control-sm me-1" />
                                <form:input path="job" placeholder="Nghề nghiệp" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group text-start">
                                <form:password path="password" placeholder="Mật khẩu*"  cssClass="form-control-sm" />
                                <form:errors path="password" element="div" cssClass="text-danger err-validate" />
                            </div>
                            <div class="form-group text-start">
                                <form:label path="file" for="avatar" cssClass="me-1 small">Chọn ảnh đại diện<span class="text-danger">*</span></form:label>
                                <form:input path="file" id="avatar" type="file" placeholder="" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group">
                                <form:button type="submit" class="b btn-register w-50">
                                    Đăng kí
                                </form:button>
                            </div>
                        </form:form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
