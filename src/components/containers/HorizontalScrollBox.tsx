import clsx from "clsx";
import "./containers.scss";

type HorizontalScrollBoxProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function HorizontalScrollBox({ children, className, style }: HorizontalScrollBoxProps) {
  return (
    <div className={clsx("golrizontal-scroll-box", className)} style={style}>
      {children}
    </div>
  );
}
