import React from "react";
import style from "./listView.module.scss";
import { cn } from "@/lib/utils";

interface ListViewProps {
  children: React.ReactNode,
  overflowY: "scroll" | 'hidden' | 'none' | 'auto',
  className: string
}

const ListView = ({children, overflowY, className} : ListViewProps) => {
  return (
    <div className={cn("list-view", className, `overflow-y-${overflowY} flex flex-col`)}>
      {children}
    </div>
  )
};

export default ListView;
