import { CustomLink } from "./UI/CustomLink";
import Link from "next/link";
import React from "react";

function Footer({
  userProfile,
  menu,
  lang,
}: {
  userProfile: User;
  menu: Menu[];
  lang: "en" | "fr";
}) {
  const currentYear = new Date().getFullYear();

  const { contactDetails } = userProfile;
  const address = contactDetails?.address;
  const city = address?.city?.split(" ").slice(1).join(" ");

  const formatSwissPhoneNumber = (phoneNumber: string) => {
    const match = phoneNumber?.match(/^(\+41)(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phoneNumber;
    const [, countryCode, areaCode, part1, part2, part3] = match;
    return `${countryCode} (0) ${areaCode} ${part1} ${part2} ${part3}`;
  };

  const formattedPhone = contactDetails?.telephone
    ? formatSwissPhoneNumber(contactDetails.telephone)
    : "";

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex h-auto flex-1 flex-col gap-1 pt-3 first:pt-0 md:pl-3 md:pt-0 md:first:pl-0">
      <h2 className="font-semibold">{title}</h2>
      <div className="h-full max-w-[50ch]">{children}</div>
    </div>
  );

  return (
    <footer
      id="contact"
      className="mt-12 bg-primary-600 pb-2 pt-6 text-primary-50"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:px-6 xl:px-0">
        <div className="flex w-full flex-col justify-between gap-3 divide-y divide-primary-700 md:flex-row md:divide-x md:divide-y-0">
          <Section title={userProfile.name}>
            {userProfile.titles &&
              userProfile.titles.map((title, index) => (
                <p key={index}>{title}</p>
              ))}
          </Section>

          <Section
            title={
              lang === "fr" ? "Prendre rendez-vous" : "Make an Appointment"
            }
          >
            <div className="flex h-full flex-col justify-between">
              {contactDetails?.telephone && (
                <div>
                  <CustomLink
                    href={`tel:${contactDetails.telephone} `}
                    isExternal={true}
                    arrow={false}
                    lang={lang}
                  >
                    {formattedPhone}
                  </CustomLink>
                  <span>
                    ({lang === "fr" ? "appels uniquement" : "calls only"})
                  </span>
                </div>
              )}
              {contactDetails?.email && (
                <CustomLink
                  href={`mailto:${contactDetails.email}`}
                  isExternal={true}
                  arrow={false}
                  lang={lang}
                >
                  {contactDetails.email}
                </CustomLink>
              )}
            </div>
          </Section>

          {address && (
            <Section
              title={`${lang === "fr" ? "Séances à" : "Sessions in"} ${city}`}
            >
              <div className="flex-justify flex flex-col gap-6">
                <p className="flex flex-col">
                  <span>{address.street}</span>
                  <span>{address.city}</span>
                </p>
                <CustomLink
                  href={contactDetails?.address?.googleMapsLink || ""}
                  isExternal={true}
                  arrow={true}
                  lang={lang}
                >
                  <span>Google Maps</span>
                </CustomLink>
              </div>
            </Section>
          )}

          <Section
            title={lang === "fr" ? "Séances en ligne" : "Online Sessions"}
          >
            <div className="flex flex-col gap-6">
              <p>
                {lang === "fr"
                  ? "Si vous avez pris rendez-vous, vous pouvez accéder à la salle d’attente ici."
                  : "If you have an online session, you can access the waiting room here."}
              </p>
              <CustomLink
                href={contactDetails?.sessionLink || ""}
                isExternal={true}
                arrow={true}
                lang={lang}
              >
                {lang === "fr" ? "Salle d’attente" : "Waiting room"}
              </CustomLink>
            </div>
          </Section>
        </div>

        <div className="mt-24 flex flex-col gap-6 md:mx-auto">
          <div className="flex justify-normal gap-3 divide-x divide-primary-700 text-xs">
            <div>
              ©{currentYear}, {userProfile.name}. Website by{" "}
              <Link
                className="border-none font-semibold"
                href="/"
                target="_blank"
              >
                Velma Studio
                <span className="sr-only">
                  {lang === "fr"
                    ? "ouvre un nouvel onglet"
                    : "opens in new tab"}
                </span>
              </Link>
              .
            </div>{" "}
            <div className="flex divide-x divide-primary-700 pl-3">
              {menu &&
                menu.map((page: Menu, index: number) => (
                  <Link
                    href={page.slug[lang].current}
                    className="px-3 font-bold first:pl-0"
                    key={index}
                  >
                    {page.name[lang]}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
