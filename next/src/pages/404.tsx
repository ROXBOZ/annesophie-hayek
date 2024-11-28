import React, { useEffect, useState } from "react";

import { CustomLink } from "@/components/UI/CustomLink";
import Layout from "@/components/Layout";
import { LinkButton } from "@/components/UI/LinkButton";
import { client } from "../../config/sanity";
import { useRouter } from "next/router";

function ErrorPage({
  userProfile,

  menus,
}: {
  userProfile: User;

  menus: Menus;
}) {
  const { locale } = useRouter();
  const lang: "en" | "fr" = (locale ?? "fr") as "en" | "fr";
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(redirectTimer);
      router.replace("/");
    }

    return () => clearInterval(redirectTimer);
  }, [countdown, router]);

  return (
    <>
      <Layout lang={lang} userProfile={userProfile} menus={menus}>
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-5xl">{lang === "fr" ? "Erreur" : "Error"} 404</h1>
          <div className="flex max-w-[65ch] flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <p>
                {lang === "fr"
                  ? " Une erreur s’est produite. La page recherchée n’existe pas ou plus. S’il s’agit d’une erreur, vous pouvez nous contacter à"
                  : "An error occurred. The page you are looking for does not exist or no longer exists. If this is an error, you can contact us at"}
              </p>
              <CustomLink
                isExternal={true}
                arrow={false}
                lang={lang}
                href={`mailto:${userProfile.contactDetails.email}`}
              >
                {userProfile.contactDetails.email}.
              </CustomLink>
            </div>
            <LinkButton href="/" level="primary">
              {lang === "fr" ? " Retour à l’accueil" : "Back to home"}
            </LinkButton>
            <p>
              {lang === "fr"
                ? "Redirection automatique dans "
                : lang === "en" && "Automatic redirection in "}
              {countdown}{" "}
              {countdown === 1
                ? lang === "fr"
                  ? "seconde"
                  : lang === "en"
                    ? "second"
                    : ""
                : lang === "fr"
                  ? "secondes"
                  : lang === "en"
                    ? "seconds"
                    : ""}{" "}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ErrorPage;

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name, logo {..., asset->{..., metadata{lqip}}}, titles, contactDetails}',
    );

    const menus: Menus = await client.fetch(
      '*[_type == "menus"][0]{headerMenu[]->{_id, name, slug}, footerMenu[]->{name, slug}}',
    );

    if (!userProfile) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userProfile,

        menus,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
