import { cn } from "@/lib/utils";

// css
import style from "./gridView.module.scss";

// type
interface GridViewProps {
  marginLeft: string;
  wrap: boolean;
  children: React.ReactNode;
  previews: number;
  className?: string;
}

const GridView = ({
  marginLeft,
  children,
  wrap,
  previews,
  className = "",
}: GridViewProps) => {
  const dynamicStyles = {
    "--ml": `-${marginLeft}`,
    "--previews": previews,
  } as React.CSSProperties;
  return (
    <div
      style={dynamicStyles}
      className={cn(
        "flex",
        `${wrap ? "flex-wrap" : "flex-nowrap"}`,
        style.grid_view,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridView;
