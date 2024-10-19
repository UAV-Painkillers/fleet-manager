import { Suspense } from "react";
import AnimatedErrorContent from "./animated-error-content";

interface ErrorPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  const errorName = (searchParams.name as string) || "Unknown Error";
  const errorMessage =
    (searchParams.message as string) ||
    "Something went wrong, but we're not sure what.";
  const stackTrace = (searchParams.stack as string) || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatedErrorContent
          errorName={errorName}
          errorMessage={errorMessage}
          stackTrace={stackTrace}
        />
      </Suspense>
    </div>
  );
}
