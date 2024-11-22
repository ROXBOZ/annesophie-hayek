import Footer from "./Footer";
import Header from "./Header";
import React from "react";

function Layout({
  userProfile,
  children,
}: {
  userProfile: User;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-primary-950">
      <Header userProfile={userProfile} />
      <main className="h-auto flex-1 bg-gradient-to-b from-white to-primary-100 py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
          {children}
        </div>
      </main>
      <Footer userProfile={userProfile} />
    </div>
  );
}

export default Layout;
