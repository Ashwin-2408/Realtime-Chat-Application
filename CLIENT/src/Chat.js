import React, { useEffect, useState } from "react";
import { Chip } from "@material-tailwind/react";
const Chat = ({ socket, username, room }) => {
  const [message, setmessage] = useState("");
  const [recieved_messages, setrecieved_messages] = useState([]);
  const send_message = async () => {
    if(message!==""){
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
  };
  
}
useEffect(() => {
    socket.off("recieve_message").on("receive_message", (data) => {
      setrecieved_messages((recieved_messages) => [...recieved_messages, data]);

      console.log(data);
    });
  }, [socket]);
  return (
    <div className="flex flex-col w-[350px] h-[350px] bg-gray-200 px-2 py-2">
      <div className="basis-1/12">
        <h1 className=" flex justify-center font-semibold text-2xl">{room}</h1>
      </div>
      <div className="flex flex-col overflow-y-scroll  basis-9/12">
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

      <div className="place-items-baseline basis-2/12">
        <label for="hs-trailing-button-add-on" class="sr-only">
          Label
        </label>
        <div class="flex rounded-lg shadow-sm">
          <input
            type="text"
            id="message"
            name="message"
            onChange={(event) => setmessage(event.target.value)}
            class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
          <button
            type="button"
            onClick={send_message}
            class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
