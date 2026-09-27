import express from "express";
import cron from "node-cron";
import http from "http";
import {Server} from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET" , "POST"],
        Credential: true
    }
});
 app.get("/",(req,res)=>{
    res.send("<h1>Hello from Realtime Socket Chat Server</h1>");
 });
 
 io.on("connection",(socket)=>{
    console.log("a user connected", socket.id);
    socket.on("join", (roomId)=>{
        
    });
    socket.on("leave",(roomId)=>{
        socket.leave(roomId);
    });
    socket.on("send", (message)=>{
        console.log(message)
        socket.to(message.room).emit("message", message);
    });
 });


server.listen(5050,()=>{
    console.log("server is running on port 5050")
})