import Link from "next/link";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const lang = "fr";

  const FooterCredits = () => {
    return (
      <div className="mt-12 w-full text-xs text-primary-50">
        @ Anne-Sophie Hayek, {currentYear}. Website by{" "}
        <Link className="font-bold" href="/" target="_blank">
          Velma Studio
          <span className="sr-only">
            {lang === "fr" ? "ouvre un nouvel onglet" : "opens in new tab"}
          </span>
        </Link>
        .
      </div>
    );
  };

  return (
    <footer className="bg-primary-600 py-4">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-0">
        <FooterCredits />
      </div>
    </footer>
  );
}

export default Footer;
