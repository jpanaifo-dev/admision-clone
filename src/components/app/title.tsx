import { FC, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const titleStyles = cva("scroll-m-20 tracking-tight", {
  variants: {
    size: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      p: "text-base font-normal leading-7",
      header: "font-bold text-xl",
      subheader: "text-base font-bold",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-gray-500",
      danger: "text-red-500",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    size: "p",
    color: "primary",
  },
});

interface TitleProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>, VariantProps<typeof titleStyles> {}

const Title: FC<TitleProps> = ({ children, className, size, color, ...props }) => {
  return (
    <h1 className={cn(titleStyles({ size, color, className }))} {...props}>
      {children}
    </h1>
  );
};

export default Title;
