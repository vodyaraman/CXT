import clsx from "clsx";
import "./containers.scss";

type BoxType = "flex-center" | "glass" | "elevated";

type ContentBoxProps = {
  children: React.ReactNode;
  type?: BoxType;
  className?: string;
  style?: React.CSSProperties;
};

export function ContentBox({
  children,
  type,
  className,
  style,
}: ContentBoxProps) {
  return (
    <div
      className={clsx(
        "content-box",
        type && `content-box--${type}`,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
