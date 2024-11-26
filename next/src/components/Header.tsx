import Link from "next/link";
import React from "react";
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
      <Link href="/" className="flex h-fit w-64 mix-blend-multiply">
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
      <nav className="hidden gap-3 md:flex">
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
        <div className="flex items-baseline gap-12">
          <HeaderNav />
          <LangNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
