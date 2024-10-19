"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedErrorContentProps {
  errorName: string;
  errorMessage: string;
  stackTrace: string;
}

export default function AnimatedErrorContent({
  errorName,
  errorMessage,
  stackTrace,
}: AnimatedErrorContentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStackTrace, setShowStackTrace] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 250,
      y: mousePosition.y - 250,
    },
  };

  return (
    <>
      <motion.div
        className="absolute w-500 h-500 bg-blue-100 rounded-full filter blur-3xl opacity-50"
        variants={variants}
        animate="default"
      />
      <div className="z-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            className="w-32 h-32 mx-auto text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <motion.h1
          className="mt-8 text-4xl font-bold text-gray-900"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops! {errorName}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-600"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {errorMessage}
        </motion.p>
        <motion.p
          className="mt-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Don&apos;t worry, our team of highly caffeinated developers is on it!
        </motion.p>
        {stackTrace && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button
              onClick={() => setShowStackTrace(!showStackTrace)}
              className="text-blue-500 underline focus:outline-none"
            >
              {showStackTrace ? "Hide" : "Show"} Stack Trace
            </button>
            {showStackTrace && (
              <motion.pre
                className="mt-4 p-4 bg-gray-100 rounded-lg text-left overflow-x-auto text-xs text-gray-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <code>{stackTrace}</code>
              </motion.pre>
            )}
          </motion.div>
        )}
        <motion.a
          href="/"
          className="mt-8 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go back home
        </motion.a>
      </div>
    </>
  );
}
