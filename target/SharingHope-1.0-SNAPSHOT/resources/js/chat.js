
function updateScrollbar() {
    const messages = $('.message-container');
  messages.animate({
      scrollTop: messages.get(0).scrollHeight
  });
}

function openChatBox() {
    $('#chat-box').css("display", "block");
    updateScrollbar();
}

function closeChatBox() {
    $('#chat-box').css("display", "none");
}

