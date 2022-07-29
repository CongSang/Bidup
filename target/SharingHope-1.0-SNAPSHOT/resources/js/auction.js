const modal1 = document.querySelector(".modal-auction");
const modalContainer1 = document.querySelector(".modal-container-auction");
const btn_close1 = document.querySelectorAll(".modal--close-auction");
const btn_show1 = document.querySelectorAll(".btn-show--auction");

function showModal() {
    modal1.classList.add('open');
}

function closeModal() {
    modal1.classList.remove('open');
}

btn_show1.forEach(btn => {
    btn.addEventListener("click", showModal);
});

btn_close1.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

modalContainer1.addEventListener("click", function (event) {
    event.stopPropagation();
});

function previewImage1() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.querySelector("#uploadImage1").files[0]);

    oFReader.onload = function (oFREvent) {
        document.querySelector("#uploadPreview1").src = oFREvent.target.result;
    };
};

function showFull2(element) {
  document.getElementById("img02").src = element.src;
  document.getElementById("modal02").style.display = "flex";
}