import Footer from "@/components/main/footer";
import Header from "@/components/main/header/header";
import {  useLocalStorage } from "@/hooks";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    // const accessToken = getCookie("accessToken")
    // console.log(accessToken);


  return (
    <div>
      <Header />
        <main className="relative">
          {children}
        </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
