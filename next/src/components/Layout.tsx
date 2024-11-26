import Footer from "./Footer";
import Header from "./Header";
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-primary-100 text-primary-950">
      <Header
        slug={slug}
        lang={lang}
        userProfile={userProfile}
        menu={menus.headerMenu}
      />
      <main
        className={`h-auto flex-1 py-24 ${isHomePage ? "md:pb-36 md:pt-24" : "md:py-36"} `}
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
          {children}
        </div>
      </main>
      <Footer lang={lang} userProfile={userProfile} menu={menus.footerMenu} />
    </div>
  );
}

export default Layout;
