"use client";

import React from "react";
import style from "./Breadcrumb.module.scss";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { capitalize, last } from "lodash";

const Breadcrumb = () => {
  const pathNameUrl = usePathname();
  const pathNames = pathNameUrl.split("/");
  return (
    <div className={cn(style.breadcrumb, "bg-zinc-200 py-8 md:py-12")}>
      <div className="section_container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">{capitalize(last(pathNames))}</h2>
        <div className={cn(style.pages, "flex gap-3 text-sm md:text-base")}>
          <span>Home</span>
          {pathNames.map((item) => (
            <span key={uuidv4()}>{capitalize(item)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
