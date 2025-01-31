import Link from "next/link";

export const CustomLink = ({
  href,
  children,
  isExternal,
  arrow,
  lang,
}: {
  href: string;
  children: React.ReactNode;
  isExternal: boolean;
  arrow: boolean;
  lang: "fr" | "en";
}) => {
  const arrowIcon =
    isExternal && arrow ? "↗" : !isExternal && arrow ? "→" : "";

  return (
    <Link
      className="flex w-fit gap-1 border-b border-primary-400 font-semibold hover:border-transparent hover:transition-all hover:duration-500 focus:outline-none focus:ring-2 focus:ring-primary-300 active:text-primary-200"
      href={href}
      target={isExternal ? "_blank" : "_self"}
    >
      {children} <span>{arrowIcon}</span>
      {isExternal && (
        <span className="sr-only">
          {lang === "fr" ? "ouvre un nouvel onglet" : "opens a new tab"}
        </span>
      )}
    </Link>
  );
};
