import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`socket event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    console.log(socket.id);
    console.log(socket.rooms);
    socket.join(roomName.payload);
    console.log(socket.rooms);
    setTimeout(() => {
      done("i'm done(backend)");
    }, 10000);
  });
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "anon";
//   console.log("connected to browser");

//   socket.on("close", () => {
//     console.log("disconnected from the browser");
//   });

//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break;
//     }
//   });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);

server.listen(3000, handleListen);
