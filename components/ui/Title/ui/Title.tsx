import style from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "green" | "black";
  className?: string;
}

export const Title = ({
  children,
  as = "h3",
  color = "black",
  className,
}: TitleProps) => {
  const Tag = as;
  const classForColor = color === "green" ? style.color__green : "";
  return (
    <div className={`${style.wrapper__title} ${className}`}>
      <Tag className={classForColor}>{children}</Tag>
    </div>
  );
};
