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
    <div className="flex min-h-screen flex-col bg-primary-50">
      <Header />
      <main className="h-auto flex-1 bg-gradient-to-b from-primary-50 to-primary-200 pb-12 pt-6">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-0">
          {children}
        </div>
      </main>
      <Footer userProfile={userProfile} />
    </div>
  );
}

export default Layout;
