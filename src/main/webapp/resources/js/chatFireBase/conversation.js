import { db } from './firebaseConfig.js';
import { fetchListContact, sendMessage, findRoomByUser } from './actions.js';

$(function () {
    const user = getUserInfo();
    fetchListContact(getUserInfo());
    db.ref(`users/${user.uid}`).on('value', snap => {
        if (snap.val() === null) {
            db.ref(`users/${user.uid}`).set({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoUrl
            });
        }
    });
});

export function getUserInfo() {
    const id = $('#user-id').text();
    const avatar = $("#userAvatar").attr("src");
    const fullname = $('#fullname').text();
    const email = $('#email').text();
    return {
        uid: id,
        displayName: fullname,
        email: email,
        photoUrl: avatar
    };
}

export function updateScrollbar(user) {
    const messages = $(`.chat-box-container${user} .message-container`);
    messages.animate({
        scrollTop: messages.get(0).scrollHeight
    }, 300);
}

export function newChatBox(user) {
    return `
            <div class="chat-box-container chat-box-container${user.uid}">
                <div class="chat-box-header">
                    <div class="d-flex justify-content-start align-items-center">
                        <img src="${user.photoUrl}" alt="avatar" class="chat-user-avatar" />
                        <h6 class="chat-box-userchat ms-2">${user.displayName}</h6>
                    </div>

                    <div>
                        <i class="fa-solid fa-xmark chat-box--close"></i>
                    </div>
                </div>

                <div class="chat-box-body w-100 d-flex flex-column">
                    <div class="chat-box-message">
                        <div class="message-container mCustomScrollbar">
                            <div class="align-items-center justify-content-center pt-5 pb-2 chat-box--load" style="display: none;">
                                <div class="spinner-border text-muted"></div>
                            </div>
                            <div class="messages">

                            </div>
                        </div>
                    </div>

                    <div class="chat-box--send">
                        <form class="d-flex justify-content-between align-items-center position-relative form-chat">
                            <input type="text" placeholder="Aa" class="form-control chat-input" />
                            <button type="submit" class="btn-send">
                                <i class="fa-solid fa-paper-plane p-2"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
}

export function closeChatBox(user) {
    $(`.chat-box-container${user.uid}`).css("display", "none");
}

export function rightMessage(msg) {
    return `
            <div class="message-chat message--right new">
                <span class="text">${msg.text}</span>
                <div class="send-time-right">${chatFormatDate(msg.createdAt)}</div>
            </div>`;
}

export function leftMessage(msg) {
    return `
            <div class="message-chat message--left new">
                <img class="avatar" src="${msg.user.avatar}">
                <span class="text">${msg.text}</span>
                <div class="send-time-left">${chatFormatDate(msg.createdAt)}</div>
            </div>`;
}

export function userContactItem(user) {
    return `
            <li class="dropdown-item">
                <div class="user${user.uid} d-flex justify-content-between align-items-center mb-1 chat--item"
                         onclick = "">
                    <div class="d-flex align-items-center">
                        <img class="chat-menu-avatar rounded-circle me-2" src="${user.photoUrl}" alt="">
                        <div>
                            <p class="chat-side">${user.displayName}</p>
                            <span class="last-message last-message${user.uid}">Chưa có tin nhắn nào</span>
                        </div>
                    </div>
                    <i class="fa-brands fa-facebook-messenger go-chat ms-1"></i>
                </div>
            </li>`;
}