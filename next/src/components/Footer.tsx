import Link from "next/link";
import React from "react";

function Footer({ userProfile }: { userProfile: User }) {
  const currentYear = new Date().getFullYear();
  const lang = "fr";

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex h-auto flex-1 flex-col gap-1 pt-3 first:pt-0 md:pl-3 md:pt-0 md:first:pl-0">
      <h2 className="font-bold">{title}</h2>
      <div className="max-w-[50ch]">{children}</div>
    </div>
  );

  const formatSwissPhoneNumber = (phoneNumber: string) => {
    const match = phoneNumber?.match(/^(\+41)(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phoneNumber;
    const [, countryCode, areaCode, part1, part2, part3] = match;
    return `${countryCode} (0) ${areaCode} ${part1} ${part2} ${part3}`;
  };
  const { contactDetails } = userProfile;
  const address = contactDetails?.address;
  const city = address?.city?.split(" ").slice(1).join(" "); // Removes PLZ
  const formattedPhone = contactDetails?.telephone
    ? formatSwissPhoneNumber(contactDetails.telephone)
    : "";

  return (
    <footer className="bg-primary-700 pb-2 pt-4 text-primary-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:px-6 xl:px-0">
        <div className="flex w-full flex-col justify-between gap-3 divide-y divide-primary-600 md:flex-row md:divide-x md:divide-y-0">
          {/* Main Info */}
          <Section title={userProfile.name}>
            {userProfile.titles && (
              <ul>
                {userProfile.titles.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            )}
          </Section>

          {/* Contact Info */}
          <Section
            title={
              lang === "fr" ? "Prendre rendez-vous" : "Make an Appointment"
            }
          >
            <ul>
              {contactDetails?.telephone && (
                <li>
                  <span>{formattedPhone}</span>
                  <span>
                    {" "}
                    ({lang === "fr" ? "Appels uniquement" : "Calls only"})
                  </span>
                </li>
              )}
              {contactDetails?.email && (
                <li>
                  <Link href={`mailto:${contactDetails.email}`}>
                    {contactDetails.email}
                  </Link>
                </li>
              )}
            </ul>
          </Section>

          {/* Onsite Session Info */}
          {address && (
            <Section
              title={`${lang === "fr" ? "Séances à" : "Sessions in"} ${city}`}
            >
              <div className="flex-justify flex flex-col">
                <div className="flex flex-col">
                  <span>{address.street}</span>
                  <span>{address.city}</span>
                </div>
                <Link
                  className="flex w-fit gap-2 pt-4"
                  href={contactDetails?.address?.googleMapsLink || ""}
                  target="_blank"
                >
                  <span>Google Maps</span>
                  <span>↗</span>
                  <span className="sr-only">
                    {lang === "fr"
                      ? "ouvre un nouvel onglet"
                      : "opens a new tab"}
                  </span>
                </Link>
              </div>
            </Section>
          )}

          {/* Online Session Info */}
          <Section
            title={lang === "fr" ? "Séances en ligne" : "Online Sessions"}
          >
            <p>
              {lang === "fr"
                ? "Si vous avez pris rendez-vous, vous pouvez accéder à la salle d’attente ici."
                : "If you have an online session, you can access the waiting room here."}
            </p>
            <Link
              className="flex w-fit gap-2 pt-4"
              href={contactDetails?.sessionLink || ""}
              target="_blank"
            >
              <span>
                {lang === "fr"
                  ? "Accéder à la salle d’attente"
                  : "Access the waiting room"}
              </span>
              <span>↗</span>
              <span className="sr-only">
                {lang === "fr" ? "ouvre un nouvel onglet" : "opens a new tab"}
              </span>
            </Link>
          </Section>
        </div>

        {/* Footer Credits */}
        <div className="mt-24 w-full text-xs">
          ©{currentYear}, {userProfile.name}. Website by{" "}
          <Link className="border-none font-bold" href="/" target="_blank">
            Velma Studio
            <span className="sr-only">
              {lang === "fr" ? "ouvre un nouvel onglet" : "opens in new tab"}
            </span>
          </Link>
          .
        </div>
      </div>
    </footer>
  );
}

export default Footer;
