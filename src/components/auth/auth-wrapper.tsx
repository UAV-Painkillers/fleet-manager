import { Link, MountainIcon } from "lucide-react";

interface Props {
  title: string;
}
export function AuthWrapper(props: Props & React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <div
              className="flex items-center justify-center gap-2 font-semibold"
            >
              <MountainIcon className="h-6 w-6" />
              <span className="text-2xl">Fleet Manager</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">{props.title}</p>
          </div>

          {props.children}
        </div>
      </div>
    </div>
  );
}
