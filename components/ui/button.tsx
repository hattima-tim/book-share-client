import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground",
      outline:
        "border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<
        Record<string, unknown>
      >;
      return React.cloneElement(child, {
        className: [child.props.className, classes].filter(Boolean).join(" "),
        ref: ref as React.Ref<HTMLElement>,
      });
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
