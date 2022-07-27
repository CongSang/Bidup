const modal = document.querySelector(".modal-post");
const modalContainer = document.querySelector(".modal-container-post");
const btn_close = document.querySelectorAll(".modal--close-post");
const btn_show = document.querySelectorAll(".btn-show--post");
const chat_menu = document.querySelector("#chat");
const sidebar_right = document.querySelector(".sidebar-right");
const close_chat = document.querySelector(".chat--close");

function showModal() {
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}

btn_show.forEach(btn => {
    btn.addEventListener("click", showModal);
});

btn_close.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

modalContainer.addEventListener("click", function (event) {
    event.stopPropagation();
});

//Show image after pick picture
function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};

function showFull(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "flex";
}


var is_show = false;
function showComment(element) {
    var comment = $(element).parents("div.post").find("div.comment");
    if(is_show) {
        comment.css("display", "none");
        is_show = false;
    } else {
        comment.css("display", "block");
        is_show = true;
    }
};

//chat menu
chat_menu.addEventListener("click", () => {
    sidebar_right.style.display = "block";
});

close_chat.addEventListener("click", () => {
    sidebar_right.style.display = "none";
});
