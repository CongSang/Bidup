
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
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
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
                    <h3 class="my-2">Đăng kí tài khoản️</h3>
                </div>

                <div class="modal-body ">
                    <div class="authentication register">
                        <c:url value="/register" var="action" />
                        <form:form action="${action}" class="form-register" modelAttribute="user"
                                   enctype="multipart/form-data" id="form-register">
                            <div class="form-group d-flex">
                                <div class="text-start w-100 me-1">
                                    <form:input path="lastname" id="lastname" placeholder="Họ*" cssClass="form-control-sm" />
                                    <form:errors path="lastname" element="div" cssClass="text-danger err-validate" />
                                    <div class="text-danger err-validate"></div>
                                </div>
                                <div class="text-start w-100" >
                                    <form:input path="firstname" id="firstname" placeholder="Tên*" class="form-control-sm" />
                                    <form:errors path="firstname" element="div" cssClass="text-danger err-validate" />
                                    <div class="text-danger err-validate"></div>
                                </div>
                            </div>
                            <div class="form-group text-start">
                                <form:input path="email" placeholder="Email*" id="email" cssClass="form-control-sm" />
                                <form:errors path="email" element="div" cssClass="text-danger err-validate" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <form:input path="phone" placeholder="Số điện thoại*" id="phone" cssClass="form-control-sm" />
                                <form:errors path="phone" element="div" cssClass="text-danger err-validate" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <form:label path="birthdate" for="dateofbirth" id="dateofbirth" cssClass="me-1 small">Ngày sinh<span class="text-danger">*</span></form:label>
                                <form:input path="birthdate" type="date" id="dateofbirth" placeholder="Ngày sinh*" cssClass="form-control-sm" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <form:input path="address" placeholder="Địa chỉ" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group d-flex">
                                <form:input path="hometown" placeholder="Quê quán" cssClass="form-control-sm me-1" />
                                <form:input path="job" placeholder="Nghề nghiệp" cssClass="form-control-sm" />
                            </div>
                            <div class="form-group text-start">
                                <form:password path="password" placeholder="Mật khẩu*" id="password"  cssClass="form-control-sm" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <input type="password" placeholder="Nhập lại mật khẩu*" id="password-confirm"  class="form-control-sm" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <form:label path="file" for="avatar" cssClass="me-1 small">Chọn ảnh đại diện</form:label>
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

        <script src="<c:url value="/resources/js/validate.js" />"></script>
        <script>
            Validator({
                form: '#form-register',
                formGroupSelector: '.form-group',
                errSelector: '.err-validate',
                rules: [
                    Validator.isRequired('#lastname'),
                    Validator.isRequired('#firstname'),

                    Validator.isRequired('#email'),
                    Validator.isEmail('#email'),

                    Validator.isDate('#dateofbirth'),

                    Validator.isRequired('#phone'),
                    Validator.isPhone('#phone'),

                    Validator.minLength('#password', 6, 'Mật khẩu phải có tối thiểu 6 kí tự'),

                    Validator.isRequired('#password-confirm'),
                    Validator.isConfirmed('#password-confirm', function () {
                        return document.querySelector('#form-register #password').value;
                    }, 'Mật khẩu nhập lại không chính xác')
                ],
                onSubmit: () => {

                    document.querySelector('#form-register').submit();

                }
            });
        </script>
    </body>
</html>
