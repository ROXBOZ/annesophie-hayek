import CustomHead from "@/components/CustomHead";
import Layout from "@/components/Layout";
import React from "react";
import { client } from "../../config/sanity";

function Page({
  userProfile,
  menus,
  currentPage,
}: {
  userProfile: User;
  menus: Menus;
  currentPage: Page;
}) {
  const lang = "fr";

  return (
    <>
      <CustomHead seo={currentPage.seo} lang={lang} />
      <Layout userProfile={userProfile} menus={menus}>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-bold uppercase tracking-widest text-primary-700">
            {currentPage.name[lang]}
          </h1>
          <h1 className="max-w-[40ch] text-5xl">{currentPage.title[lang]}</h1>
        </div>
      </Layout>
    </>
  );
}

export default Page;

export async function getStaticPaths() {
  try {
    const slugsFR: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.fr.current)].slug.fr.current`,
    );

    const slugsEN: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.en.current)].slug.en.current`,
    );

    const allSlugs = [
      ...slugsFR.filter(Boolean).map((slug) => ["fr", slug]),
      ...slugsEN.filter(Boolean).map((slug) => ["en", slug]),
    ];

    const paths = allSlugs.map(([locale, slug]) => ({
      params: { page: slug },
      locale,
    }));

    console.log("Generated Paths:", paths); // Debug

    return {
      paths,
      fallback: false, // Adjust to 'blocking' if you need fallback handling
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: { page: string };
  locale: string;
}) => {
  const slug = params.page;

  console.log("Slug in getStaticProps:", slug); // Debug
  console.log("Locale in getStaticProps:", locale); // Debug

  try {
    const currentPage = await client.fetch(
      `*[_type == "page" && slug[$locale].current == $slug && !(_id in path("drafts.**"))][0]`,
      { slug, locale },
    );

    if (!currentPage) {
      console.error(`Page not found for slug: ${slug}, locale: ${locale}`);
      return { notFound: true };
    }

    const userProfile = await client.fetch(
      '*[_type == "userProfile"][0]{name, logo {..., asset->{..., metadata{lqip}}}, titles, contactDetails}',
    );

    const menus = await client.fetch(
      '*[_type == "menus"][0]{headerMenu[]->{name, slug}, footerMenu[]->{name, slug}}',
    );

    return {
      props: {
        userProfile,
        menus,
        currentPage,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
