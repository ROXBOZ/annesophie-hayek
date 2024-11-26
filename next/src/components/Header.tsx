import React, { useState } from "react";

import Link from "next/link";
import { SanityImage } from "./SanityImage";
import { useRouter } from "next/router";

function Header({
  userProfile,
  menu,
  lang,
  slug,
}: {
  userProfile: User;
  menu: Menu[];
  lang: "en" | "fr";
  slug?: { fr: { current: string }; en: { current: string } };
}) {
  const currentPath = useRouter().asPath;

  const Logo = () => {
    return (
      <Link href="/" className="flex h-fit w-52 mix-blend-multiply md:w-64">
        <SanityImage
          image={userProfile.logo}
          alt={userProfile.name}
          width={500}
          height={500}
        />
      </Link>
    );
  };

  const HeaderDesktopNav = () => {
    return (
      <nav className="hidden gap-1 md:flex">
        {menu &&
          menu.map((page: Menu, index: number) => {
            const isCurrentPage = currentPath === "/" + page.slug[lang].current;
            return (
              <Link
                className={`flex rounded-full px-4 py-1 font-semibold transition-all delay-200 hover:bg-primary-50 active:bg-primary-100 ${isCurrentPage && "bg-primary-50"}`}
                href={page.slug[lang].current}
                key={index}
              >
                {page.name[lang]}
              </Link>
            );
          })}
      </nav>
    );
  };

  const HeaderMobileNav = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <nav className="md:hidden">
        <button
          style={{ zIndex: "9999" }}
          className={`relative m-0 flex size-8 flex-col items-center justify-center gap-1 border-none p-0 *:flex *:h-[2px] *:w-6 *:rounded *:bg-primary-500 hover:bg-transparent md:right-auto`}
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
        >
          <span className={` ${isChecked && "absolute rotate-45"}`} />
          <span className={` ${isChecked && "absolute -rotate-45"}`} />
          <span className={` ${isChecked && "opacity-0"}`} />
        </button>
        {isChecked && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center gap-3 divide-y divide-primary-200 bg-primary-100 px-12 *:pt-3">
            {menu &&
              menu.map((page: Menu, index: number) => {
                return (
                  <Link
                    className={`flex px-4 py-1 text-2xl first:pt-0`}
                    href={page.slug[lang].current}
                    key={index}
                  >
                    {page.name[lang]}
                  </Link>
                );
              })}
            <Link className={`flex px-4 py-1 text-2xl`} href="/#contact">
              Contact
            </Link>
          </div>
        )}
      </nav>
    );
  };

  const LangNav = () => {
    const { asPath, pathname } = useRouter();
    const isHomePage = pathname === "/";
    const targetLang = lang === "fr" ? "en" : "fr";

    const switchLink = isHomePage
      ? `/${targetLang}`
      : slug?.[targetLang]?.current
        ? `/${targetLang}/${slug[targetLang].current}`
        : asPath.replace(`/${lang}`, `/${targetLang}`);

    return (
      <a
        href={switchLink}
        className="flex aspect-square items-center rounded-full bg-primary-200 px-2 font-bold uppercase ring-inset ring-primary-300 transition-all delay-200 hover:ring active:bg-primary-300"
      >
        {lang}
      </a>
    );
  };

  return (
    <header className="border-b border-primary-200 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-0">
        <Logo />

        <div className="flex flex-row-reverse gap-3 md:flex-row md:gap-12">
          <div>
            <HeaderDesktopNav />
            <HeaderMobileNav />
          </div>
          <LangNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
