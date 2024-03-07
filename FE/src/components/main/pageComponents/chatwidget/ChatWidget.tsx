

import { getUserById } from "@/services/user/user";
import { useEffect, useRef, useState } from "react";
import "./chatWidget.scss"
import ChatInput from "./ChatInput";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import instance from "@/services/instance";
import { getAllMessage, sendMessage } from "@/services/message/message";

const ChatWidget = ({ isOpen, onClose, showNotification }: any) => {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const [dataAdmin, setDataAdmin] = useState<any>()
  const [messages, setMessages] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  let newMessageCount = 0 

  const socket = useRef<any>(null);
  useEffect(() => {
    // if (!localStorage.getItem('user')) {
    //   router.push("/auth");
    // } else {
      setCurrentUser(JSON.parse(localStorage.getItem('user') as string));
      const getInfAdmin = async () => {
        const data = await getUserById('656772fa0437e8234a8c6f43')
        setDataAdmin(data.data)
      }
      getInfAdmin()
    // }
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8088");
      socket.current.emit("addUser", currentUser._id);
    }
  }, [currentUser]);


  useEffect(() => {
    const getMessage = async () => {
      const dataGetAllMessage = {
        from: currentUser?._id,
        to: dataAdmin?._id,
      }
      const response = await getAllMessage(dataGetAllMessage)
 
      setMessages(response);
    }
    getMessage()
  }, [dataAdmin])

  const handleSendMsg = async (msg: string) => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    console.log('socket', socket);

    socket.current.emit("sendMsg", {
      to: dataAdmin?._id,
      from: user._id,
      msg,
    });

    const dataSendMessage = {
      from: user._id,
      to: dataAdmin?._id,
      message: msg,
    }

    await sendMessage(dataSendMessage)

    const msgs: any = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };




  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        newMessageCount ++
        if (typeof showNotification === 'function') {
          showNotification(newMessageCount);
      }
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-header">


        <div className="user-details">
          <div className="avatar">
            <img src={dataAdmin?.avatar} alt="" />
          </div>
          <div className="username">
            <h3>{dataAdmin?.name}</h3>
          </div>
        </div>
        <div className="close cursor-pointer	">
          <p className="text-3xl" onClick={onClose}>&times;</p>
        </div>


      </div>
      <div className="chat-messages">
        {messages.map((message: any) => {

          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}

      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatWidget