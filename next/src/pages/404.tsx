import Layout from "@/components/Layout";
import React from "react";
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
  return (
    <>
      <Layout lang={lang} userProfile={userProfile} menus={menus}>
        <div className="flex w-full flex-col items-center justify-center gap-6 bg-red-500">
          <h1 className="text-5xl">Erreur 404</h1>
          <p>Une erreur...</p>
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
