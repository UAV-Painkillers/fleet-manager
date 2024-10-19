import { rest } from "lodash-es";
import { Button as OriginalButton, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

export type ButtonExtendedProps = ButtonProps & {
  loading?: boolean;
};

export function Button(props: ButtonExtendedProps) {
  const { loading, ...rest } = props;

  return (
    <OriginalButton disabled={loading || props.disabled} {...rest}>
      {props.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </OriginalButton>
  );
}
