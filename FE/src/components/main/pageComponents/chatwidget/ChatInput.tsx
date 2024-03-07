import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import './chatInput.scss'

const ChatInput = ({handleSendMsg}: any) => {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  
    const handleEmojiClick = (event: any, emojiObject: any) => {
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message);
      console.log(message);
      
    };
  
    const sendChat = (event: any) => {
      event.preventDefault();
      if (msg.length > 0) {
        handleSendMsg(msg);  
        setMsg("");
      }
    };

    const isOnlySpaces = (str:any) => {
      return str.trim() === '';
    };
  
return (
    <div className="container">
    <div className="button-container">
      <div className="emoji">
        <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      
    </div>
    <form className="input-container" onSubmit={(event) => sendChat(event)}>
      <input
        type="text"
        placeholder="type your message here"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button type="submit" disabled={isOnlySpaces(msg)}>
        <IoMdSend />
      </button>
    </form>
  </div>
)
}

export default ChatInput