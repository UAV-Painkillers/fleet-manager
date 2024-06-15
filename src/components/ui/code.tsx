import { cn } from "@/lib/utils";

export function InlineCode(
  props: React.PropsWithChildren & React.HTMLAttributes<HTMLElement>
) {
  const { children, ...rest } = props;
  return (
    <code
      {...rest}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        rest.className
      )}
    >
      {children}
    </code>
  );
}
