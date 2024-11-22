import Link from "next/link";
import React from "react";

function Footer({ userProfile }: { userProfile: User }) {
  const currentYear = new Date().getFullYear();
  const lang = "fr";

  const FooterMainInfo = () => {
    return (
      <div>
        <h2 className="font-bold">{userProfile.name}</h2>
        {userProfile.titles && (
          <ul className="text-primary-200">
            {userProfile.titles.map((title: string, index: number) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const FooterContactInfo = () => {
    const formatSwissPhoneNumber = (phoneNumber: string) => {
      const match =
        phoneNumber &&
        phoneNumber.match(/^(\+41)(\d{2})(\d{3})(\d{2})(\d{2})$/);

      if (!match) {
        return phoneNumber;
      }

      const [, countryCode, areaCode, part1, part2, part3] = match;
      return `${countryCode} (0) ${areaCode} ${part1} ${part2} ${part3}`;
    };
    const formattedPhone = userProfile.contactDetails?.telephone
      ? formatSwissPhoneNumber(userProfile.contactDetails.telephone)
      : "";

    return (
      (userProfile.contactDetails?.telephone ||
        userProfile.contactDetails?.email) && (
        <>
          <div className="w-fit rounded-xl bg-primary-700/50 px-3">
            <h2 className="sr-only">Contact</h2>
            <ul className="p-4">
              {userProfile.contactDetails.telephone && (
                <li>
                  <span>{formattedPhone}</span>
                  <span>
                    {" "}
                    ({lang === "fr" ? "sur appel uniquement" : "Calls only"})
                  </span>
                </li>
              )}

              {userProfile.contactDetails.email && (
                <li>
                  <Link href={`mailto:${userProfile.contactDetails.email}`}>
                    {userProfile.contactDetails.email}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )
    );
  };
  const FooterCredits = () => {
    return (
      <div className="mt-12 w-full text-xs">
        ©{currentYear}, {userProfile.name}. Website by{" "}
        <Link className="border-none font-bold" href="/" target="_blank">
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
    <footer className="bg-primary-600 pb-2 pt-4 text-primary-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:px-6 lg:px-0">
        <div className="flex w-full items-baseline justify-between">
          <FooterMainInfo />
          <FooterContactInfo />
        </div>
        <FooterCredits />
      </div>
    </footer>
  );
}

export default Footer;
