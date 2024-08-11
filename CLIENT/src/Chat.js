import React, { useEffect, useState } from "react";
import { Chip } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
const Chat = ({ socket, username, room }) => {
  const [message, setmessage] = useState("");
  const [recieved_messages, setrecieved_messages] = useState([]);
  const send_message = async () => {
    if (message !== "") {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      const messagedata = {
        username: username,
        room: room,
        message: message,
        time: `${hours}:${minutes}`,
      };
      setrecieved_messages((recieved_messages) => [
        ...recieved_messages,
        messagedata,
      ]);
      await socket.emit("send_message", messagedata);
    }
  };
  useEffect(() => {
    socket.off("recieve_message").on("receive_message", (data) => {
      setrecieved_messages((recieved_messages) => [...recieved_messages, data]);

      console.log(data);
    });
  }, [socket]);
  return (
    <div className="flex flex-col w-[350px] h-[350px] bg-[#ffffff]   relative rounded-md shadow-xl">
      <div className="basis-1/12 bg-[#ffffff] rounded-md ">
        <h1 className=" flex justify-center font-semibold text-2xl">{room}</h1>
      </div>
      <div className="flex flex-col overflow-y-scroll  basis-9/12 bg-[#eaedf1]">
        {recieved_messages.map((mess) => {
          if (mess.username === username) {
            return (
              <div>
                <Chip value={mess.message} />
              </div>
            );
          } else {
            return <Chip value={mess.message} />;
          }
        })}
      </div>
      <div className="flex flex-row absolute bottom-0 basis-2/12 ">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="message"
          id="message"
          onChange={(event) => setmessage(event.target.value)}
        ></input>
        <button onClick={send_message}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
