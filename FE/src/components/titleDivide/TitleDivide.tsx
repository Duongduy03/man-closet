import { cn } from "@/lib/utils";
import style from "./titleDivide.module.scss";

interface TitleDivideProps{
  title: string,
  align: "start" | "center" | "end"
}

const TitleDivide = ({ title, align }: TitleDivideProps) => {
  return (
    <div className={cn(style.title_divide, "relative flex items-center py-4 md:py-6")}>
      <div className={cn(style.divide, "absolute inset-0 flex items-center z-[-1]")}>
        <div className="w-full h-[1px] bg-zinc-500"></div>
      </div>
      <div className={cn("flex items-center w-full", `justify-${align}`)}>
        <h2 className="text-xl md:text-3xl font-semibold tracking-wide px-2 md:px-3 bg-white">{title}</h2>
      </div>
    </div>
  );
};

export default TitleDivide;
