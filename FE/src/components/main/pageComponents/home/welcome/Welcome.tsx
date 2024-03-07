import TitleGap from "@/components/titleGap";
import React, { useEffect, useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import instance from "@/services/instance";
import { getUserById } from "@/services/user/user";
import ChatWidget from "../../chatwidget/ChatWidget";

const Welcome = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notification, setNotification] = useState<number>();

  const data = JSON.parse(localStorage.getItem('user') as string);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const showNotification = (message: number) => {
    setNotification(message);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const FloatingButton = () => {
    const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
      setNotification(0)
    };

    return (
      <div className="floating-button" onClick={toggleChat}>
        {Number(notification) > 0 && (
          <div className="absolute top-[-6px] right-0 bg-red-600 rounded-3xl w-[20px] h-[20px] leading-5 text-[10px] text-center">
            {notification}
          </div>
        )}
        <FaRegMessage className="w-8 h-8" />
      </div>
    );
  };

  return (
    <>
      <div>
        <TitleGap title="MANCLOSET XIN CHÀO" />

        <p className="text-center max-w-[1000px] mx-auto font-medium text-gray-600">
          Chào mừng bạn đến với shop thời trang MANCLOSET. Chúng tôi rất vui khi
          được bạn ghé thăm, và chúng tôi xin đảm bảo rằng nơi đây sẽ nâng cao
          gu thời trang của bạn.
        </p>
      </div>
    
      {data !== null && (
        <>
        <FloatingButton />
        <ChatWidget isOpen={isChatOpen} onClose={closeChat} showNotification={showNotification} />
        
        </>
      )}
    </>
  );
};

export default Welcome;
