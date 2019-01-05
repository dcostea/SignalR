"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/streamingHub").build();

connection.start().catch(function (err) {
    return console.error(err.toString());
});

var stream;
connection.on("StreamingStarted", function () {
    AddMessage("Streaming started");

    stream = connection.stream("StartStreaming").subscribe({
        next: (item) => {
            SetSlider(item);
            AddMessage(item);
        },
        complete: () => {
            AddMessage("Streaming completed");
        },
        error: (err) => {
            AddMessage(err);
        }
    });
});

$("#startButton").click(function () {
    if (stream !== undefined) {
        stream.dispose();
        AddMessage("Streaming aborted");
    }
    connection.invoke("StreamInit");
});

function AddMessage(message) {
    $("#messagesList").append(`<li class="list-group-item">${message}</li>`);
}

function SetSlider(value) {
    $("#slider").val(value);
}

