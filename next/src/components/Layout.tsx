import Footer from "./Footer";
import Header from "./Header";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

function Layout({
  lang,
  userProfile,
  children,
  menus,
  slug,
}: {
  lang: "en" | "fr";
  userProfile: User;
  children: React.ReactNode;
  menus: Menus;
  slug?: { fr: { current: string }; en: { current: string } };
}) {
  const currentPath = useRouter().pathname;
  const isHomePage = currentPath === "/";

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-b from-white to-primary-200 text-primary-950`}
    >
      <Link
        className="absolute left-[50%] -translate-y-[100%] rounded-none bg-primary-100 p-3 font-semibold focus:translate-y-[0%] focus:outline-4 focus:outline-teal-500"
        href="#main"
      >
        {lang === "fr" ? "Passer au contenu" : "Skip to content"}
      </Link>
      <Header
        slug={slug}
        lang={lang}
        userProfile={userProfile}
        menu={menus.headerMenu}
      />
      <main
        id="main"
        className={`*:e h-auto flex-1 py-24 ${isHomePage ? "md:pb-36 md:pt-24" : "md:py-36"} `}
      >
        <div className="mx-auto w-full px-4 md:px-6 lg:max-w-[1200px] xl:px-0">
          {children}
        </div>
      </main>
      <Footer lang={lang} userProfile={userProfile} menu={menus.footerMenu} />
    </div>
  );
}

export default Layout;
