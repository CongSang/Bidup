function searchSubmit() {
    event.preventDefault();
    var inputVal = $('input[name="kw"]').val();
    if ($(inputVal).trim().charAt(0) === "#")
        window.location = "/hashtag/" + inputVal.slice(1);
    
}