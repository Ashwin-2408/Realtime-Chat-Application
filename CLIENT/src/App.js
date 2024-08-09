import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const join_room = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(event) => setusername(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter room name"
        onChange={(event) => setroom(event.target.value)}
      ></input>
      <button onClick={join_room}>JOIN ROOM</button>
    </div>
  );
}

export default App;
