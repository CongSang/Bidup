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

function loadFeeds() {
    var feedsContainer = document.getElementById("feeds-container");
    var h = `<div class="post">      <!--Phan nay fecth du lieu de render-->
                <div class="card post--item">
                    <div class="card-header border-0 pb-0 pt-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-start">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="avatar-img rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                    </a>
                                </div>
                                <!-- Info -->
                                <div>
                                    <div class="nav nav-divider">
                                        <h6 class="nav-item card-title mb-0">
                                            <a href="#">Công Sang</a>
                                        </h6>
                                        <span class="ms-2 nav-item small text-secondary">2 tiếng trước</span>
                                    </div>
                                </div>
                            </div>
                            <!--Menu-->
                            <div class="dropdown">
                                <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">

                                    <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Chỉnh sửa bài viết
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Báo cáo
                                        </a>
                                    </li>
                                    <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Xóa bài viết
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="card-body pb-2">
                        <p class="post--content mb-1">
                            I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.
                        </p>
                        <div class="post--hashtag mb-3">
                            <span>#hahaha</span>
                        </div>
                        <img class="card-img post--img" src="resources/img/bg-login.jpg" alt="Post image" onclick="showFull(this)">

                        <div class="line"></div>

                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover">
                                    <i class="fa-regular fa-heart post--action-icon"></i>
                                    <span class="post--action-text">Thích (56)</span>
                                </div>
                            </div>
                            <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover" onclick="showComment(this)">
                                    <i class="fa-regular fa-message post--action-icon"></i>
                                    <span class="post--action-text">Bình luận</span>
                                </div>
                            </div>
                        </div>

                        <div class="comment">
                            <div class="d-flex align-items-center my-2">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                    </a>
                                </div>
                                <form class="w-100">
                                    <input type="text" placeholder="Thêm bình luận" class="add-comment" />
                                </form>
                            </div>

                            <!--Phan render binh luan cua bai viet-->        
                            <div class="d-flex comment--item py-2">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                    </a>
                                </div>
                                <div>
                                    <div class="bg-light comment--item-content">
                                        <div class="d-flex justify-content-between">
                                            <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                            <small>5 tiếng</small>
                                        </div>

                                        <p class="small mb-0">
                                            See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex comment--item py-2">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                    </a>
                                </div>
                                <div>
                                    <div class="bg-light comment--item-content">
                                        <div class="d-flex justify-content-between">
                                            <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                            <small>5 tiếng</small>
                                        </div>

                                        <p class="small mb-0">
                                            Wishing calling is warrant settled was lucky.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!--Phan render binh luan cua bai viet-->   
                        </div>
                    </div>
                </div>
                <!--Phan nay fecth du lieu de render-->
            </div>`;
    feedsContainer.innerHTML = h;
    h = feedsContainer.innerHTML;
    for (var i=0; i < 3; i++) {
        h += `<div class="post">      <!--Phan nay fecth du lieu de render-->
            <div class="card post--item">
                <div class="card-header border-0 pb-0 pt-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-start">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="avatar-img rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                </a>
                            </div>
                            <!-- Info -->
                            <div>
                                <div class="nav nav-divider">
                                    <h6 class="nav-item card-title mb-0">
                                        <a href="#">Công Sang</a>
                                    </h6>
                                    <span class="ms-2 nav-item small text-secondary">2 tiếng trước</span>
                                </div>
                            </div>
                        </div>
                        <!--Menu-->
                        <div class="dropdown">
                            <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">

                                <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                                <li>
                                    <a class="dropdown-item" href="#">
                                        Chỉnh sửa bài viết
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        Báo cáo
                                    </a>
                                </li>
                                <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                                <li>
                                    <a class="dropdown-item" href="#">
                                        Xóa bài viết
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card-body pb-2">
                    <p class="post--content mb-1">
                        I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.
                    </p>
                    <div class="post--hashtag mb-3">
                        <span>#hahaha</span>
                    </div>
                    <img class="card-img post--img" src="resources/img/bg-login.jpg" alt="Post image" onclick="showFull(this)">

                    <div class="line"></div>

                    <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                        <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                            <div class="post--action-hover">
                                <i class="fa-regular fa-heart post--action-icon"></i>
                                <span class="post--action-text">Thích (56)</span>
                            </div>
                        </div>
                        <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                            <div class="post--action-hover" onclick="showComment(this)">
                                <i class="fa-regular fa-message post--action-icon"></i>
                                <span class="post--action-text">Bình luận</span>
                            </div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="d-flex align-items-center my-2">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                </a>
                            </div>
                            <form class="w-100">
                                <input type="text" placeholder="Thêm bình luận" class="add-comment" />
                            </form>
                        </div>

                        <!--Phan render binh luan cua bai viet-->        
                        <div class="d-flex comment--item py-2">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                </a>
                            </div>
                            <div>
                                <div class="bg-light comment--item-content">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                        <small>5 tiếng</small>
                                    </div>

                                    <p class="small mb-0">
                                        See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex comment--item py-2">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="/SharingHope/resources/img/non-avatar.png" alt="">
                                </a>
                            </div>
                            <div>
                                <div class="bg-light comment--item-content">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                        <small>5 tiếng</small>
                                    </div>

                                    <p class="small mb-0">
                                        Wishing calling is warrant settled was lucky.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!--Phan render binh luan cua bai viet-->   
                    </div>
                </div>
            </div>
            <!--Phan nay fecth du lieu de render-->
        </div>`;
    }
    feedsContainer.innerHTML = h;
    document.getElementById("post-loading").style.display = "none";
}
