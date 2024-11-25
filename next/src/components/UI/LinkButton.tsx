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
      className={`w-fit rounded-full border-2 px-4 py-1 font-semibold ring-inset hover:ring ${level === "primary" && "border-primary-600 bg-primary-600 text-primary-50 ring-primary-700 active:bg-primary-700"} ${level === "secondary" && "border-2 border-primary-200 ring-primary-100 active:bg-primary-100"}`}
    >
      {children}
    </Link>
  );
};
