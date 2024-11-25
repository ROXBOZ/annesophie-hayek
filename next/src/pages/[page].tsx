import CustomHead from "@/components/CustomHead";
import Layout from "@/components/Layout";
import React from "react";
import { client } from "../../config/sanity";

function Page({
  userProfile,
  page,
  menus,
}: {
  userProfile: User;
  page: Page;
  menus: Menus;
}) {
  const lang = "fr";
  return (
    <>
      <CustomHead seo={page.seo || null} lang={lang} />
      <Layout userProfile={userProfile} menus={menus}>
        <h1>{page.title[lang]}</h1>
      </Layout>
    </>
  );
}

export default Page;

export async function getStaticPaths() {
  try {
    const slugsFR: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.fr)].slug.fr.current`,
    );

    const slugsEN: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.en)].slug.en.current`,
    );

    const allSlugs = [
      ...slugsFR.filter(Boolean).map((slug) => ["fr", slug]),
      ...slugsEN.filter(Boolean).map((slug) => ["en", slug]),
    ];

    const paths = allSlugs.map((slug) => ({
      params: {
        page: slug[1],
      },
      locale: slug[0],
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      fallback: false,
      paths: [],
    };
  }
}

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name, logo {..., asset->{..., metadata{lqip}}}, titles, contactDetails}',
    );
    const page: Page = await client.fetch(
      '*[_type == "page" && slug[$locale].current == $slug && !(_id in path("drafts.**"))][0]{title, subtitle, text, image{..., asset->{...,metadata {lqip}}}, video{asset->}, seo}',
    );

    const menus: Menus = await client.fetch(
      '*[_type == "menus"][0]{headerMenu[]->{name, slug}, footerMenu[]->{name, slug}}',
    );

    if (!userProfile) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userProfile,
        page,
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