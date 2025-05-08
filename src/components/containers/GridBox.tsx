import clsx from "clsx";
import "./containers.scss";

type GridBoxProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function GridBox({ children, className, style }: GridBoxProps) {
  return (
    <div className={clsx("grid-box", className)} style={style}>
      {children}
    </div>
  );
}
