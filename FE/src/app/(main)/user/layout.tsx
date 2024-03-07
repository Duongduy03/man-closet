'use client'

import { UserPageNavigation } from "@/components/main/pageComponents/user";
import { useUserInfo } from "@/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserInfo();
  const router = useRouter()
  if(!user) {
    router.push("/")
    return null
  }
  return (
    <section className="section_container">
      <div className="flex items-start md:gap-4">
        <aside className="flex-[1] fixed bottom-0 left-0 right-0 bg-white z-[20] p-3 md:p-0 md:relative md:bottom-[unset] md:right-[unset] md:left-[unset] md:z-0 shadow md:shadow-[unset] rounded-t-md md:rounded-[unset]">
          <UserPageNavigation/>
        </aside>
        <div className="flex-[4] min-h-[100vh]">{children}</div>
      </div>
    </section>
  );
};

export default layout;
