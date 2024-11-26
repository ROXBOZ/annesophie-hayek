import Link from "next/link";
import React from "react";

export const LinkButton = ({
  level,
  href,
  children,
}: {
  level: "primary" | "secondary" | "tertiary";
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={`w-fit rounded-full px-4 py-2 font-semibold ring-inset transition-all duration-300 hover:ring ${level === "primary" && "bg-primary-600 text-primary-50 ring-primary-700 active:bg-primary-700"} ${level === "secondary" && "border-primary-200 outline -outline-offset-1 outline-primary-200 ring-primary-100 active:bg-primary-100"}`}
    >
      {children}
    </Link>
  );
};
