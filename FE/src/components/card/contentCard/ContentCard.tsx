"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import style from "./contentCard.module.scss";

interface Data {
  imageUrl: string | StaticImageData;
  title: string;
  sub: string;
}

interface ContentCardProps {
  data: Data;
  marginLeft?: number;
}

const ContentCard = ({ data, marginLeft = 0 }: ContentCardProps) => {
  const { title, imageUrl, sub } = data || {};
  const marginLeftStyle = {
    "--mr-left": marginLeft > 0 ? `${marginLeft}px` : 0 + "px",
  } as React.CSSProperties;
  return (
    <div
      style={marginLeftStyle}
      className={cn(
        style.content_card,
        "flex flex-col gap-4"
      )}
    >
      <div className="relative w-full h-[40px] md:h-[60px]">
        <Image
          src={imageUrl}
          fill
          style={{ objectFit: "contain" }}
          alt="image"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-center  text-gray-800 font-bold">
          {title}
        </h5>
        <p className="ff-secondary text-gray-600">{sub}</p>
      </div>
    </div>
  );
};

export default ContentCard;
