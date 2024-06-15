/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/NApbMVp5GW7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { useId } from "react";
import { MaximizeButton } from "./maximize-button";
import { CopyButton } from "./copy-button";

export function CodeBlock(
  props: React.PropsWithChildren &
    React.HTMLAttributes<HTMLElement> & {
      title?: string;
    }
) {
  const { children, ...rest } = props;

  const containerId = useId();

  return (
    <div
      {...rest}
      className={cn(
        "bg-gray-200 my-4 rounded-lg overflow-hidden dark:bg-gray-800",
        rest.className
      )}
      id={containerId}
    >
      <div className="bg-gray-300 dark:bg-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-950 dark:text-gray-200">
          {props.title}
        </div>
        <div className="flex items-center gap-2">
          <CopyButton
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-400 hover:text-black dark:hover:bg-gray-600 dark:hover:text-white"
            size="icon"
            variant="ghost"
            text={children?.toString() ?? ""}
          >
            <CopyIcon className="w-4 h-4" />
            <span className="sr-only">Copy code</span>
          </CopyButton>
          <MaximizeButton
            containerId={containerId}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-400 hover:text-black dark:hover:bg-gray-600 dark:hover:text-white"
            size="icon"
            variant="ghost"
          />
        </div>
      </div>

      <pre className="p-4 font-mono text-sm text-black dark:text-gray-200 dark:bg-gray-800 overflow-auto">
        <code className="language-javascript">{children}</code>
      </pre>
    </div>
  );
}
