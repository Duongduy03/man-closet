'use client'
import { useRouter } from "next/navigation";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("user") as string )
  
  return (
    <div>
        <main className="relative">
          {!user ? <>{children}</> : <>{router.push("/")}</>}
        </main>
    </div>
  );
};

export default MainLayout;
