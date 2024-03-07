import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface BannerV1Props {
  src: string | StaticImageData;
  href?: string;
  subTitle: string;
  title: string;
  description: string;
}

const BannerV1 = ({
  src,
  href,
  subTitle,
  title,
  description,
}: BannerV1Props) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Image
        className="absolute inset-0 z-[-1] brightness-[0.65] object-cover"
        layout="fill"
        style={{ objectFit: "cover" }}
        src={src}
        alt="banner img"
      />
      <div
        className={cn(
          "section_container h-full flex flex-col justify-center gap-4 md:gap-6"
        )}
      >
        <h3 className=" drop-shadow font-medium text-white">{subTitle}</h3>
        <h1 className=" tracking-wider max-w-2xl leading-snug font-semibold drop-shadow text-white">
          {title}
        </h1>
        <h5 className=" ff-secondary font-medium drop-shadow-sm max-w-2xl text-zinc-200">
          {description}
        </h5>
        {href && (
          <Button
            className="w-fit px-10 drop-shadow ff-secondary"
            variant={"shop_now"}
          >
            Mua Ngay
          </Button>
        )}
      </div>
    </div>
  );
};

export default BannerV1;
