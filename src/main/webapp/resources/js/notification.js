
function getNotifs() {
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/notifs`,
        dataType: 'json',
        success: function (data) {
            
            
            $('#loadingNotif').css('display', 'none');
        }
    });
}