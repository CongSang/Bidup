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
            $.ajax({
                type: 'put',
                url: `${ctxPath}/admin/api/block-user/${userId}`,
                success: function() {
                    deleteReportUser(reportId);
                    swal("Đã khóa tài khoản người dùng này", {
                        icon: "success"
                    });
                    $(element).parents('.report-item').remove();
                }
            }).fail((res) => {
                swal("Có lỗi xảy ra. Khóa tài khoản thất bại", {
                    icon: "warning"
                    });
            });
        }
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