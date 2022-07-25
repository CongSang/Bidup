const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const btn_close = document.querySelector(".modal--close");
const btn_auth = document.querySelector(".btn-show--register");

function showModal() {
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}

btn_auth.addEventListener("click", showModal);
btn_close.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

modalContainer.addEventListener("click", function (event) {
    event.stopPropagation();
});

//https://www.facebook.com/dialog/oauth?client_id=800114437619089&redirect_uri=http://localhost:8080/SharingHope/login-facebook

function loginFB() {
    
}