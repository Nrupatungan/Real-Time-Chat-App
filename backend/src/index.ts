import {WebSocketServer, WebSocket} from "ws";
import  hashGenerator  from "./utils/hashGenerator";

const ws = new WebSocketServer({ port: 8080 });

ws.on('listening', () => {
  console.log('WebSocket server is listening on ws://localhost:8080');
});

interface Room {
  id: string;
  users: WebSocket[];
}

const rooms: { [key: string]: Room } = {};

let userNo: number;

ws.on('connection', (socket: WebSocket) => {
  console.log('New client connected');

  // Find or create a room
  let room = findAvailableRoom();
  if (!room) {
    room = { id: hashGenerator(5), users: [] };
    rooms[room.id] = room;
  }

  // Add user to the room
  room.users.push(socket);

  userNo = room.users.length

  // Broadcast room ID to the client
  socket.send(JSON.stringify({ type: 'room', id: room.id, userNo }));

  // Handle messages from the client
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'message') {
        // Broadcast message to other users in the room
        room.users.forEach((user) => {
          if (user !== socket) {
            user.send(JSON.stringify({ type: 'message', message: data.message, userNo }));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');

    // Remove user from the room
    room.users = room.users.filter((user) => user !== socket);

    // If the room is empty, remove it
    if (room.users.length === 0) {
      delete rooms[room.id];
    }
  });
});

function findAvailableRoom() {
  for (const roomId in rooms) {
    if (rooms[roomId].users.length < 2) {
      return rooms[roomId];
    }
  }
  return null;
}