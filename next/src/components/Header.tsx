import { CustomLink } from "./UI/CustomLink";
import Link from "next/link";
import React from "react";
import { SanityImage } from "./SanityImage";
import { useRouter } from "next/router";

function Header({ userProfile, menu }: { userProfile: User; menu: Menu[] }) {
  const lang: "fr" | "en" = "fr";

  const currentPath = useRouter().asPath;
  console.log("currentPath :", currentPath);

  const Logo = () => {
    return (
      <Link href="/" className="flex h-fit w-64">
        <SanityImage
          image={userProfile.logo}
          alt={userProfile.name}
          width={500}
          height={500}
        />
      </Link>
    );
  };

  const HeaderNav = () => {
    return (
      <div className="flex gap-3">
        {menu &&
          menu.map((page: Page, index: number) => {
            const isCurrentPage = currentPath === "/" + page.slug[lang].current;

            return (
              <Link
                className={`flex rounded-full px-4 py-1 font-semibold transition-all delay-300 hover:bg-primary-50 active:bg-primary-100 ${isCurrentPage && "bg-primary-50"}`}
                href={page.slug[lang].current}
                key={index}
              >
                {page.name[lang]}
              </Link>
            );
          })}
      </div>
    );
  };
  return (
    <header className="border-b border-primary-200 py-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-0">
        <Logo />
        <HeaderNav />
      </div>
    </header>
  );
}

export default Header;
