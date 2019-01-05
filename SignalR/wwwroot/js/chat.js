"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    AddMessage(message, user);
    if ($("#messagesList").is(':hidden')) {
        NotifyMessage(++counter);
    }
});

connection.on("ReceiveSystem", function (message) {
    AddMessage(message);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

$("#sendButton").click(function () {
    connection.invoke("SendMessage", $("#userInput").val(), $("#messageInput").val());
});

function AddMessage(message, user) {
    var item = user === undefined ? message : user + " says " + message;
    $("#messagesList").append(`<li class="list-group-item">${item}</li>`);
}

var counter = 0;
function NotifyMessage(counter) {
    $("button span").text(counter);
}

$("#messagesList").hide();
$("#toggleMessages").click(function () {
    $("#messagesList").toggle();

    if (!$("#messagesList").is(':hidden')) {
        counter = 0;
        NotifyMessage(counter);
    }
});

