const modal = document.querySelector(".modal-post");
const modalContainer = document.querySelector(".modal-container-post");
const btn_close = document.querySelectorAll(".modal--close-post");
const btn_show = document.querySelectorAll(".btn-show--post");
const comment = document.querySelector(".comment");

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
function showComment() {
    if(is_show) {
        comment.style.display = "none";
        is_show = false;
    } else {
        comment.style.display = "block";
        is_show = true;
    }
};



