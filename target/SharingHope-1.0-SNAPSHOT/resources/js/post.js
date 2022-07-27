

function getPosts(endpoint) {
    $.ajax({
        type: 'get',
        url: endpoint,
        dataType: 'json',
        success: function(post) {
            console.log('post --->  ', post );
        }
    });
}