import { db } from './firebaseConfig.js'
import {
    getUserInfo,
    newChatBox,
    closeChatBox,
    rightMessage,
    leftMessage,
    userContactItem,
    updateScrollbar
} from './conversation.js'

const fetchLastMessageChat = (currentUser, friend, roomKey) => {
    db.ref(`messages/${roomKey}`).orderByChild("createdAt").limitToLast(1).on('value', snap => {

        const [key, value] = Object.entries(snap.val()).pop();
        if (value.user._id === currentUser.uid) {
            $(`.last-message${friend}`).text(`Bạn: ${value.text}`);
            return;
        } else {
            $(`.last-message${friend}`).text(`${value.text}`);
            return;
        }
    });
};

export const fetchListContact = (currentUser) => {
    const contacts = [];
    let fetchOnce = true;

    $('.search-userchat-loading').css("display", "flex");
    $('.list-user-chat').empty();

    db.ref('users').on('value', (snapshot) => {
        if (!fetchOnce)
            return;

        snapshot.forEach(contact => {
            if (contact.key !== currentUser.uid) {
                const c = contact.val();
                contacts.push({
                    uid: contact.key,
                    displayName: c.displayName,
                    email: c.email,
                    photoUrl: c.photoUrl
                });
            }
        });

        $('.search-userchat-loading').css("display", "none");
        $('.list-user-chat').append((contacts).map((user) => {
            return userContactItem(user);
        }).join(''));
        $.each(contacts, function (index, user) {
            $('#chats-box').append(newChatBox(user));
            findRoomByUser(currentUser, user.uid);
            $(`.user${user.uid}`).on('click', function () {
                $(`.chat-box-container`).css("display", "none");
                $(`.chat-box-container${user.uid}`).css("display", "block");
                updateScrollbar(user.uid);
            });
            $(`.chat-box-container${user.uid} .chat-input`).emoji();
            $(`.chat-box-container${user.uid} .chat-box--close`).on('click', () => {
                closeChatBox(user);
            });
        });
        fetchOnce = !fetchOnce;
    }, error => {
        console.log('error', error);
    });
};

export const findRoomByUser = (currentUser, friend) => {
    let roomKey = null;
    $(`.chat-box-container${friend} .form-chat`).on('submit', function () {
        event.preventDefault();
        const text = $(`.chat-box-container${friend} .chat-input`).val();
        sendMessage(currentUser, friend, text, roomKey);
        $(`.chat-box-container${friend} .chat-input`).val('');
    });
    db.ref(`users/${currentUser.uid}/rooms`).on('value', rooms => {
        if (rooms.val() === null) {
            return;
        }
        rooms.forEach(room => {
            db.ref(`users/${friend}/rooms/${room.key}`).on('value', snap => {
                if (snap.val()) {
                    console.log('FOUND ROOM', room.key);
                    roomKey = room.key;

                    fetchLastMessageChat(currentUser, friend, roomKey);

                }

                if (roomKey !== null)
                    return;
            });
        });

        if (roomKey !== null) {

            fetchMessagesByRoom(friend, roomKey);

            $(`.chat-box-container${friend} .form-chat`).on('submit', function () {
                event.preventDefault();
                const text = $(`.chat-box-container${friend} .chat-input`).val();
                sendMessage(currentUser, friend, text, roomKey);
                $(`.chat-box-container${friend} .chat-input`).val('');
            });
        }
    }, error => {
        console.log('findRoomByUserError', error);
    });
};

const fetchMessagesByRoom = (friend, roomKey) => {
    $(`.chat-box-container${friend} .chat-box--load`).css("display", "flex");
    $(`.chat-box-container${friend} .messages`).html('');
    let fetchFull = true;

    db.ref(`messages/${roomKey}`).orderByChild("createdAt").limitToLast(50).on('value', snap => {
        let messages = [];
        if (!fetchFull) {
            const [key, value] = Object.entries(snap.val()).pop();
            messages.push({
                _id: key,
                text: value.text,
                user: value.user,
                createdAt: value.createdAt
            });
        }

        if (fetchFull) {
            snap.forEach(message => {
                const msg = message.val();
                messages.push({
                    _id: message.key,
                    text: msg.text,
                    user: msg.user,
                    createdAt: msg.createdAt
                });
            });
            fetchFull = !fetchFull;
        }

        $(`.chat-box-container${friend} .chat-box--load`).css("display", "none");

        $(`.chat-box-container${friend} .messages`).append((messages).map((msg) => {
            return (msg.user._id === getUserInfo().uid) ?
                    rightMessage(msg)
                    :
                    leftMessage(msg);
        }).join(''));
        updateScrollbar(friend);
    }, error => {
        console.log('fetchMessagesByRoomERROR', error);
    });
};

export const sendMessage = (me, friend, text, roomKey) => {
    if (!text.trim())
        return;

    if (roomKey === null) {
        roomKey = registerRoom(me, friend);
    }

    const now = Date.now();

    db.ref(`messages/${roomKey}`).push({
        text,
        user: {
            _id: me.uid,
            name: me.displayName,
            avatar: me.photoUrl
        },
        createdAt: now
    });
};

const registerRoom = (me, friend) => {
    const roomKey = db.ref(`rooms`).push().key;
    const updates = {};

    updates[`rooms/${roomKey}/${me.uid}`] = true;
    updates[`rooms/${roomKey}/${friend}`] = true;


    updates[`users/${friend}/rooms/${roomKey}`] = true;
    updates[`users/${me.uid}/rooms/${roomKey}`] = true;

    db.ref().update(updates).catch(error => console.log('registerRoomError', error));

    return roomKey;
};

(function ($) {
    $.fn.emoji = function (params) {
        var defaults = {
            button: '<i class="fa-regular fa-face-smile">',
            place: 'before',
            emojis: ['&#x1F642;', '&#x1F641;', '&#x1f600;', '&#x1f601;', '&#x1f602;', '&#x1f603;', '&#x1f604;', '&#x1f605;', '&#x1f606;', '&#x1f607;', '&#x1f608;', '&#x1f609;', '&#x1f60a;', '&#x1f60b;', '&#x1f60c;', '&#x1f60d;', '&#x1f60e;', '&#x1f60f;', '&#x1f610;', '&#x1f611;', '&#x1f612;', '&#x1f613;', '&#x1f614;', '&#x1f615;', '&#x1f616;', '&#x1f617;', '&#x1f618;', '&#x1f619;', '&#x1f61a;', '&#x1f61b;', '&#x1f61c;', '&#x1f61d;', '&#x1f61e;', '&#x1f61f;', '&#x1f620;', '&#x1f621;', '&#x1f622;', '&#x1f623;', '&#x1f624;', '&#x1f625;', '&#x1f626;', '&#x1f627;', '&#x1f628;', '&#x1f629;', '&#x1f62a;', '&#x1f62b;', '&#x1f62c;', '&#x1f62d;', '&#x1f62e;', '&#x1f62f;', '&#x1f630;', '&#x1f631;', '&#x1f632;', '&#x1f633;', '&#x1f634;', '&#x1f635;', '&#x1f636;', '&#x1f637;', '&#x1f638;', '&#x1f639;', '&#x1f63a;', '&#x1f63b;', '&#x1f63c;', '&#x1f63d;', '&#x1f63e;', '&#x1f63f;', '&#x1f640;', '&#x1f643;', '&#x1f4a9;', '&#x1f644;', '&#x2620;', '&#x1F44C;', '&#x1F44D;', '&#x1F44E;', '&#x1F648;', '&#x1F649;', '&#x1F64A;'],
            fontSize: '20px',
            listCSS: {position: 'absolute', 'box-shadow': '0 1px 2px rgb(0 0 0 / 8%), 0 8px 16px rgb(0 0 0 / 8%)', 'background-color': '#fff', display: 'none', width: '295px', height: '260px', 'flex-wap': 'wrap', padding: '8px', 'border-radius': '6px', bottom: '40px', right: '18px', 'flex-wrap': 'wrap'},
            rowSize: 10
        };
        var settings = {};
        if (!params) {
            settings = defaults;
        } else {
            for (var n in defaults) {
                settings[n] = params[n] ? params[n] : defaults[n];
            }
        }

        this.each(function (n, input) {
            var $input = $(input);

            function showEmoji() {
                $list.addClass('d-flex');
                $input.focus();
                setTimeout(function () {
                    $(document).on('click', closeEmoji);
                }, 1);
            }

            function closeEmoji() {
                $list.removeClass('d-flex');
                $(document).off('click', closeEmoji);
            }

            function clickEmoji(ev) {
                if (input.selectionStart || input.selectionStart === '0') {
                    var startPos = input.selectionStart;
                    var endPos = input.selectionEnd;
                    input.value = input.value.substring(0, startPos)
                            + ev.currentTarget.innerHTML
                            + input.value.substring(endPos, input.value.length);
                } else {
                    input.value += ev.currentTarget.innerHTML;
                }

                closeEmoji();
                $input.focus();
                input.selectionStart = startPos + 2;
                input.selectionEnd = endPos + 2;
            }

            var $button = $('<span>').html(settings.button).css({cursor: 'pointer', 'font-size': settings.fontSize, 'margin': '0 8px'}).on('click', showEmoji);
            var $list = $('<div>').css(defaults.listCSS).css(settings.listCSS);
            for (var n in settings.emojis) {
                if (n > 0 && n % settings.rowSize === 0) {
                    $("<br>").appendTo($list);
                }
                $('<div>').html(settings.emojis[n]).css({cursor: 'pointer', 'font-size': settings.fontSize}).on('click', clickEmoji).appendTo($list);
            }

            if (settings.place === 'before') {
                $button.insertBefore(this);
            } else {
                $button.insertAfter(this);
            }
            $list.insertBefore($input);
        });
        return this;
    };
}
)(jQuery);


