//import { io } from 'socket.io';
//const io = require('socket.io');
// från socket.io biblioteket (i cdnjs)

// http://127.0.0.1:5050/
// ws://127.0.0.1:5050/ <-- använder websocket protokollet
let socket;

function establishSocketConnection() {
  socket = io("ws://127.0.0.1:6060/", {
    extraHeaders: {
      "authorization": "Bearer " + sessionStorage.getItem("accessToken")
    }
  });

  socket.on("new-connection", handleNewConnect);
  socket.on("new-message", handleNewMessage);
  socket.on("todo-invalid", handleInvalidTodo);
}


function handleNewConnect(data) {
  console.log("new connection, woohoo");
  console.log(data);
}

function handleNewMessage(data) {
  console.log("message", data["message"])
}

function handleInvalidTodo(data) {
  console.log("invalid todo", data)
  refreshListContent();
}