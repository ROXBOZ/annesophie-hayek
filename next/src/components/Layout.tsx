import Footer from "./Footer";
import Header from "./Header";
import React from "react";

function Layout({
  userProfile,
  children,
  menus,
}: {
  userProfile: User;
  children: React.ReactNode;
  menus: Menus;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-primary-100 text-primary-950">
      <Header userProfile={userProfile} menu={menus.headerMenu} />
      <main className="h-auto flex-1 py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
          {children}
        </div>
      </main>
      <Footer userProfile={userProfile} menu={menus.footerMenu} />
    </div>
  );
}

export default Layout;
