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
      className={`anim-el w-fit rounded-full px-4 py-2 font-semibold ring-inset hover:ring hover:transition-all hover:duration-200 focus:outline-4 focus:outline-teal-500 ${level === "primary" && "bg-primary-600 text-primary-50 ring-primary-700 active:bg-primary-700"} ${level === "secondary" && "border-2 border-primary-200 ring-primary-100 focus:outline-teal-500 active:bg-primary-100"}`}
    >
      {children}
    </Link>
  );
};
