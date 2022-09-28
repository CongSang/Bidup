$(function () {
    $('.chartMenu').addClass('active');
});

function closeSideBar() {
    $('.leftside-menu').css("display", "none");
}

function openSideBar() {
    $('.leftside-menu').css("display", "block");
}

function chart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                    label: 'Thống kê tăng trưởng của SharingHope',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function solveReportPost(postId, element) {
    deletePost(postId, element);
}

function solveReportAuction(auctionId, element) {
    deleteAuction(auctionId, element);
}

async function deleteReportUser(reportId) {
    $.ajax({
        type: 'delete',
        url: `${ctxPath}/api/delete-report-user/${reportId}`,
        success: function() {
            console.log("delete report success");
        }
    }).fail((res) => {
        console.log(res);
    });
}

function solveReportUser(userId, reportId, element) {
    swal({
        title: "Bạn chắc chắn khóa tài khoản này ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((isAccept) => {
          if (isAccept) {
            disableUser(userId, deleteReportUser, reportId);
            $(element).parents('.report-item').remove();
        }
    });
}

function disableUser(userId, callback, reportId) {
    $.ajax({
        type: 'put',
        url: `${ctxPath}/admin/api/block-user/${userId}`,
        success: function() {
            if (callback !== undefined)
                callback(reportId);
            swal("Đã khóa tài khoản người dùng này", {
                icon: "success"
            });
        }
    }).fail((res) => {
        swal("Có lỗi xảy ra. Khóa tài khoản thất bại", {
            icon: "warning"
        });
    });
}

function acceptAuction (auctionId, element) {
    swal({
        title: "Duyệt bài đấu giá ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((isAccept) => {
          if (isAccept) {
            $.ajax({
                type: 'put',
                url: `${ctxPath}/admin/api/accept-auction/${auctionId}`,
                dataType: 'json',
                success: function() {
                    swal("Duyệt bài đấu giá thành công", {
                        icon: "success"
                    });
                    $(element).parents('.report-item').remove();
                }
            }).fail(() => {
                swal("Duyệt bài đấu giá thất bại", {
                    icon: "warning"
                    });
            });
        }
    });
}

function updateConfig(element) {
    const input = $(element);
    
    $.ajax({
        type: 'put',
        url: `${ctxPath}/admin/api/update-config`,
        data: JSON.stringify({
            name: input.attr('id'),
            value: input.val() + "",
            description: ''
        }),
        contentType: 'application/json',
        success: function() {
            swal("Cập nhật thành công", {
                icon: "success"
            });
        }
    }).fail(() => {
        swal("Cập nhật thất bại", {
            icon: "warning"
        });
    });
}

$('.config-item').keydown(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
        
	if(keycode === 13){
            this.blur();
	}
});

function openUserModal(id) {
    if (id !== null)
        $.ajax({
            type: 'GET',
            url: `${ctxPath}/api/users/${id}`,
            dataType: 'json',
            success: function (data) {
                $("body").append(userModal(data));
            }
        });
    else
        $("body").append(userModal({
            id: null,
            firstname: '',
            lastname: '',
            birthdate: '',
            address: '',
            hometown: '',
            job: '',
            phone: '',
            email: '',
            password: '',
            active: '',
            userRole: ''
        }));
    
}

function adminEditUser(userId) {
    const email = $('input#email').val();
    const password = $('#password').val();
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const birthdate = $('#dateofbirth').val();
    const address = $('#address').val();
    const hometown = $('#hometown').val();
    const job = $('#job').val();
    const phone = $('#phone').val();
    const active = $('#active:checked').length;
    const userRole = $('#userRole option:selected').val();
    
    updateUser({
        id: userId,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        address: address,
        hometown: hometown,
        job: job,
        phone: phone,
        email: email,
        password: password,
        active: active,
        userRole: userRole
    }, afterEditUser);
}

function afterEditUser(user) {
    $(`tr#${user.id} td:nth-child(2)`).text(user.email);
    $(`tr#${user.id} td:nth-child(4)`).text(user.userRole);
    $(`tr#${user.id} td:nth-child(5)`).text(user.active);
    if(user.active === 0)
        $(`tr#${user.id} td:nth-child(6) button:nth-child(3)`).css('display', 'block');
}

function deleteUser(userId) {
    swal({
        title: "Bạn chắc chắn xóa tài khoản này ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((isAccept) => {
          if (isAccept) {
            $.ajax({
                type: 'DELETE',
                url: `${ctxPath}/admin/api/delete-user/${userId}`,
                success: function () {
                    swal("Xóa thành công", {
                        icon: "success"
                    });
                    $(`tr#${userId}`).remove(); 
                }
            });
        }
    });
}
 
function enableUser(userId) {
    $.ajax({
        type: 'PUT',
        url: `${ctxPath}/admin/api/enable-user/${userId}`,
        success: function () {
            swal("Kích hoạt thành công", {
                icon: "success"
            });
            $(`tr#${userId} td:nth-child(5)`).text("1");
            $(`tr#${userId} td:nth-child(6) button:nth-child(3)`).css('display', 'none');
        }
    });
} 

function addUser() {
    const email = $('input#email').val();
    const password = $('#password').val();
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const birthdate = $('#dateofbirth').val();
    const address = $('#address').val();
    const hometown = $('#hometown').val();
    const job = $('#job').val();
    const phone = $('#phone').val();
    const active = $('#active:checked').length;
    const userRole = $('#userRole option:selected').val();
    
    $.ajax({
        type: 'POST',
        url: `${ctxPath}/admin/api/add-user`,
        data: JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            address: address,
            hometown: hometown,
            job: job,
            phone: phone,
            userRole: userRole,
            active: active
        }),
        dataType: "json",
        contentType: 'application/json',
        success: function(data) {
            $('#tbody').prepend(userListItem(data));
            removeEditModal();
        }
    });
}
 
function userModal(user) {
    
    return `
    <div id="modalEditPost" class="modal modal-post open">
        <div class="modal-container modal-container-post">
            <div class="modal-header">
                <h5 class="my-2">Chỉnh sửa thông tin</h5>
                <div class="modal--close modal--close-post" onclick="removeEditModal()">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="d-flex mb-3">
                    <form class="w-100">
                        <div class="form-group d-flex">
                            <div class="text-start w-100 me-1">
                                <input id="lastname" placeholder="Họ*" 
                                    class="form-control-sm" value="${user.lastname}"/>
                            </div>
                            <div class="text-start w-100" >
                                <input id="firstname" placeholder="Tên*" 
                                    class="form-control-sm" value="${user.firstname}"/>
                            </div>
                        </div>
                        <div class="form-group text-start">
                            <input placeholder="Email*" id="email" 
                                class="form-control-sm" value="${user.email}"/>
                        </div>
                        <div class="form-group text-start">
                            <input placeholder="Mật khẩu*" id="password" 
                                class="form-control-sm" value=""/>
                        </div>
                        <div class="form-group text-start">
                            <input placeholder="Số điện thoại*" id="phone" 
                                class="form-control-sm" value="${user.phone}"/>
                        </div>
                        <div class="form-group text-start">
                            <input type="date" placeholder="Ngày sinh*" 
                                id="dateofbirth" class="form-control-sm" 
                                value="${user.id !== null ? new Date(user.birthdate).toISOString().slice(0,10) : ``}"/>
                        </div>
                        <div class="form-group text-start">
                            <input placeholder="Địa chỉ*" id="address" 
                                class="form-control-sm" value="${user.address}"/>
                        </div>
                        <div class="form-group d-flex">
                            <input id="hometown" placeholder="Quê quán" 
                                class="form-control-sm me-1" value="${user.hometown}"/>
                            <input id="job" placeholder="Nghề nghiệp" 
                                class="form-control-sm" value="${user.job}"/>
                        </div>
                        <div class="form-group text-start">
                            <input type="checkbox" id="active" 
                                name="active" ${user.active === 1 ? `checked="true"`:``}/>
                            <label for="active">Active</label>
                        </div>
                        <div class="form-group text-start">
                            <select type="text" class="form-control me-2 mb-2" 
                                style="width: 200px" id="userRole">
                                <option value="ROLE_ADMIN" 
                                ${user.userRole === 'ROLE_ADMIN' ? `selected` : ``}>
                                    ROLE_ADMIN
                                </option>
                                <option value="ROLE_USER"
                                ${user.userRole === 'ROLE_USER' ? `selected` : ``}>
                                    ROLE_USER
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-footer ">
                <button type="button" class="btn btn-danger me-2 modal--close-post" 
                    onclick="removeEditModal()">Huỷ</button>
                ${user.id !== null ? `
                    <button type="button" class="btn btn-primary" 
                    onclick="adminEditUser('${user.id}')">Chỉnh sửa</button>
                    ` : `
                    <button type="button" class="btn btn-success" 
                    onclick="addUser()">Thêm</button>
                `}
            </div>
        </div>
    </div>`;
}