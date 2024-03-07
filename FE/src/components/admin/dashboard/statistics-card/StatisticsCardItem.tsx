"use client";

import React from "react";
import style from "./statisticsCardItem.module.scss";
import { cn } from "@/lib/utils";

interface StatisticsCardItemProps {
  title: string;
  complete: number | string;
  kpi: number | string;
  percentage: number;
  marginLeft: string;
}
const StatisticsCardItem = ({
  marginLeft = "0px",
  complete,
  kpi,
  percentage,
  title,
}: StatisticsCardItemProps) => {
  let color: string = "";

  if(percentage > 100){
    color = "rgb(167 139 250)"
  } else if (percentage >= 90 && percentage <= 100) {
    color = "rgb(52 211 153)";
  } else if (percentage >= 70 && percentage < 90) {
    color = "rgb(6 182 212)";
  } else if (percentage >= 40 && percentage < 70) {
    color = "rgb(251 191 36)";
  } else if (percentage >= 0 && percentage < 40) {
    color = "rgb(225 29 72)";
  }

  const dynamicStyle = {
    "--ml": marginLeft,
    "--color": color,
    "--completion_schedule": (percentage <= 100)? percentage : 100,
  } as React.CSSProperties;

  return (
    <>
      <div
        className={cn(
          style.statistics_card_item,
          "bg-white dark:bg-zinc-900 flex p-6 items-center gap-5 rounded"
        )}
        style={dynamicStyle}
      >
        <div>
          <div className={cn(style.chart, "relative w-[80px] h-[80px]")}>
            <svg className="relative w-[80px] h-[80px]">
              <circle
                cx="35"
                cy="35"
                r={"35"}
                className="w-[80px] h-[80px] fill-none"
              ></circle>
              <circle
                cx="35"
                cy="35"
                r={"35"}
                className="w-[80px] h-[80px] fill-none"
              ></circle>
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-gray-700">
              <span className="text-xl">
                {percentage}
                <span className="text-sm">%</span>
              </span>
            </div>
          </div>
        </div>
        <div className="grow flex flex-col items-center gap-3">
          <h4 className="text-md flex-1">{title}</h4>
          <h2 className="text-xl font-medium">{complete}</h2>
        </div>
      </div>
    </>
  );
};

export default StatisticsCardItem;
