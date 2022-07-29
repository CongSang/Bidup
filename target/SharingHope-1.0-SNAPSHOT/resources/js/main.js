
const chat_menu = document.querySelector("#chat");
const sidebar_right = document.querySelector(".sidebar-right");
const close_chat = document.querySelector(".chat--close");

//chat menu
chat_menu.addEventListener("click", () => {
    sidebar_right.style.display = "block";
});

close_chat.addEventListener("click", () => {
    sidebar_right.style.display = "none";
});