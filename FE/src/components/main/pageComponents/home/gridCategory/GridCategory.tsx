import React from "react";
import "./gridCategory.scss";
import { v4 as uuidv4 } from "uuid";
import Image, { StaticImageData } from "next/image";
import {
  gc_1,
  gc_2,
  gc_3,
  gc_4,
  gc_5,
} from "@/assets/media/images/home_grid_category_banner";
import { useRouter } from "next/navigation";

interface GridCategoryItemProps {
  title: string;
  imageUrl: string | StaticImageData;
  href: string;
}
const GridCategoryItem = ({ imageUrl, title, href }: GridCategoryItemProps) => {
  const router = useRouter();

  const changeUrl = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <div className="home__grid-category-layout__item relative w-full h-full rounded overflow-hidden">
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={title}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <span className="absolute inset-0 bg-gradient-to-l from-zinc-800/30"></span>
        <h4 className="absolute top-4 right-4 text-white  font-medium">
          {title}
        </h4>

        <button
          onClick={() => changeUrl(href)}
          className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded text-zinc-800 text-sm font-medium hover:bg-slate-200 shadow-sm transition-all"
        >
          Xem ngay
        </button>
      </div>
    </>
  );
};

const GridCategory = () => {
  const categoryData = [
    {
      title: "Hoodie",
      imageUrl: gc_1,
      href: "/shop",
    },
    {
      title: "Sweater",
      imageUrl: gc_2,
      href: "/shop",
    },
    {
      title: "Bomber",
      imageUrl: gc_3,
      href: "/shop",
    },
    {
      title: "Cadigan",
      imageUrl: gc_4,
      href: "/shop",
    },
    {
      title: "Quần ống suông",
      imageUrl: gc_5,
      href: "/shop",
    },
  ];

  return (
    <>
      <div className="home__grid-category-layout">
        {categoryData.map((item) => (
          <GridCategoryItem
            key={uuidv4()}
            imageUrl={item.imageUrl}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>
    </>
  );
};

export default GridCategory;
