import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [showchat, setshowchat] = useState(false);
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const join_room = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setshowchat(true);
    }
  };
  return (
    <div className="flex flex-col  mx-auto h-screen   justify-center items-center  ">
      {!showchat ? (
        <div className="flex flex-col gap-5 bg-gray-200  w-[300px] h-[300px] p-[20px] rounded-md shadow shadow-current pt-[40px]">
          <h1 className="text-center text-4xl font-semibold tracking-wide">
            LIVE CHAT
          </h1>
          <Input
            className="bg-white"
            variant="outlined"
            color="black"
            label="User Name"
            placeholder="Enter your username"
            id="username"
            name="username"
            onChange={(event) => setusername(event.target.value)}
          />
          <Input
            className="bg-white"
            variant="outlined"
            color="black"
            label="Room"
            placeholder="Enter the room name"
            id="room"
            name="room"
            onChange={(event) => setroom(event.target.value)}
          />

          <Button onClick={join_room}>JOIN ROOM</Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
