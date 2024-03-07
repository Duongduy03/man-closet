import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import React from "react";

interface BannerV2Props {
  subTitle?: string;
  title?: string;
  description?: string;
}

const BannerV2 = ({ subTitle, title, description }: BannerV2Props) => {
  return (
    <div className="relative w-full h-[200px] md:h-[200px] bg-zinc-300  text-zinc-800 bg-[url('/img/hero-pattern.svg')]">
      <div
        className={cn(
          "section_container h-full flex flex-col justify-center content-center gap-4 md:gap-6"
        )}
      >
        <h2 className="font-sans  tracking-wider max-w-2xl leading-snug font-semibold drop-shadow  text-zinc-800	">
          {title}
        </h2>
        <h4 className=" drop-shadow font-medium  text-zinc-800 ">
          {subTitle} .{" "}
          <span
            className=" ff-secondary
          underline
          font-medium drop-shadow-sm max-w-2xl  text-zinc-600 "
          >
            {description}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default BannerV2;
