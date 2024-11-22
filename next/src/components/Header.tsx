import React from "react";
import { SanityImage } from "./SanityImage";

function Header({ userProfile }: { userProfile: User }) {
  return (
    <header className="flex border-b border-primary-200 py-4">
      <div className="mx-auto flex min-h-fit w-full max-w-[1200px] px-4 md:px-6 xl:px-0">
        <div className="w-64">
          <SanityImage
            image={userProfile.logo}
            alt={userProfile.name}
            width={500}
            height={500}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
