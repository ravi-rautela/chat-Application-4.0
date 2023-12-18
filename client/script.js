document.addEventListener("DOMContentLoaded", function () {

    const socket = io();
    const appclass = document.querySelector(".app");

    appclass.querySelector("#join-user").addEventListener("click", () => {
        let username = appclass.querySelector("#username").value;
        if (username.length == 0) {
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        appclass.querySelector(".join-screen").classList.remove("active");
        appclass.querySelector(".chat-screen").classList.add("active");
    });
    appclass.querySelector("#send-message").addEventListener("click", () => {
        let message = appclass.querySelector("#message-input").value;
        if (message.length == 0) {
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message
        });
        socket.emit('chat', {
            username: uname,
            text: message
        });
        appclass.querySelector("#message-input").value = "";
    });
    appclass.querySelector("#exit-chat").addEventListener("click", function () {
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    })
    socket.on("update", (update) => {
        renderMessage("update", update)
    });
    socket.on("chat", (message) => {
        renderMessage("other", message);
    });
    function renderMessage(type, message) {
        let messageContainer = appclass.querySelector(".messages");
        if (type == "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        }
        else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

});
