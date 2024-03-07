'use client'

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../../../components/admin/pageComponents/chats/ChatContainer";
import Contacts from "../../../components/admin/pageComponents/chats/Contacts"
import Welcome from "../../../components/admin/pageComponents/chats/Welcome"
import { useRouter } from "next/navigation";
import instance from "@/services/instance";
import { getAllContact, getUserById } from "@/services/user/user";

type MyEvents = {
  exampleEvent: (data: string) => void;
  addUser: (userId: string) => void;
  sendMsg: (msg: string) => void
};

export default function Chat() {
  const router = useRouter();
  const socket = useRef<Socket<MyEvents> | any>(null);
  const [contacts, setContacts] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  useEffect(() => {
 
      setCurrentUser(JSON.parse(localStorage.getItem('user') as string)
      );
    
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8088");
      socket.current.emit("addUser", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
        const getInfAdmin = async () => {
          const data = await getAllContact('656772fa0437e8234a8c6f43')
          setContacts(data)
        }
        getInfAdmin()
  }, [currentUser]);


  const handleChatChange = (chat: []) => {
    setCurrentChat(chat);
  };
  console.log('currentchat',currentChat);
  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`

  width: min(90%, 87.5rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ffff;
  .container {
     border-radius: 15px;
      height: 85vh;
      width: 83vw;
    background-color: #ffff;
    display: grid;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

