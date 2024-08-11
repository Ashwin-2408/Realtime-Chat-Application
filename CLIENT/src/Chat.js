import React, { useEffect, useState } from "react";
import { Chip } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
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
    <div className="flex flex-col w-[350px] h-[330px] bg-[#ffffff]   relative rounded-md shadow-xl">
      <div className="basis-1/8 bg-[#ffffff] rounded-2xl ">
        <h1 className=" flex justify-center font-semibold font-serif text-2xl pt-2">{`Room:${room}`}</h1>
      </div>
      <div className="flex flex-col overflow-y-scroll  basis-6/8 bg-[#eaedf1]">
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
     
        <div className="absolute flex w-full max-w-[24rem] flex-grow basis-1/8 bottom-0">
          <Input
            type="text"
            name="message"
            id="message"
            onChange={(event) => setmessage(event.target.value)}
            
            
            className="pr-20  flex-grow "
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded" onClick={send_message}>
            Send
          </Button>
        </div>
      </div>
    
  );
};

export default Chat;
