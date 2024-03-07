import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getAllMessage, sendMessage } from "@/services/message/message";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, socket }: any) {
    console.log('soc', socket);

    const [messages, setMessages] = useState<any>([]);
    const scrollRef = useRef<any>();
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user') as string);
        const dataGetAllMessage = {
            from: data._id,
            to: currentChat._id,
        }
        const getMessage = async () => {
            const response = await getAllMessage(dataGetAllMessage)
            console.log('message,', response);

            setMessages(response);
        }
        getMessage()
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem('user') as string)._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const handleSendMsg = async (msg: string) => {
        const user = JSON.parse(localStorage.getItem("user") as string)
        socket.current.emit("sendMsg", {
            from: user._id,
            to: currentChat._id,
            msg,
        });

        const dataSendMessage = {
            from: user._id,
            to: currentChat?._id,
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
                console.log("arrivalMessage",arrivalMessage);
                
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Container>
            <div className="chat-header border-b-2 ">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={currentChat.avatar}
                            alt=""
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.name}</h3>
                    </div>
                </div>

            </div>
            <div className="chat-messages">
                {messages?.map((message: any) => {
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
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    border-bottom: 1px solid balck;
    border-bottom-style: inset;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    
    .user-details {
    
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          border-radius:50%
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #eb405e;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #eb405e;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #eb405e;
      }
    }
  }
`;