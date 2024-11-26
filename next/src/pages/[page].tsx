import CustomHead from "@/components/CustomHead";
import FAQs from "@/components/FAQs";
import Layout from "@/components/Layout";
import { LinkButton } from "@/components/UI/LinkButton";
import { PortableText } from "@portabletext/react";
import React from "react";
import { SanityImage } from "@/components/SanityImage";
import { client } from "../../config/sanity";
import { useRouter } from "next/router";

function Page({
  userProfile,
  menus,
  currentPage,
  faqs,
}: {
  userProfile: User;
  menus: Menus;
  currentPage: Page;
  faqs: FAQ[];
}) {
  const { locale } = useRouter();
  const lang: "en" | "fr" = (locale ?? "fr") as "en" | "fr";
  const isServicePage =
    currentPage._id === "a4781abc-b2bc-43d7-a749-6c392cec5612";

  const TextSection: React.FC<{ item: TextSection }> = ({ item }) => {
    return (
      <div
        key={item._key}
        className={`flex w-fit flex-col gap-2 ${item.isBannered ? "rounded bg-gradient-to-b from-primary-100 to-primary-200 px-12 py-8" : ""}`}
      >
        {item.title && <h2 className="text-2xl">{item.title[lang]}</h2>}
        <div className="flex flex-col gap-1">
          <PortableText value={item.text[lang]} />
        </div>
      </div>
    );
  };
  const ImageSection: React.FC<{ item: ImageSection }> = ({ item }) => {
    return (
      <div className="mix-blend-multiply">
        <SanityImage
          image={item.image}
          alt={item.alt[lang]}
          width={500}
          height={600}
        />
      </div>
    );
  };

  return (
    <>
      <CustomHead seo={currentPage.seo} lang={lang} />
      <Layout
        slug={currentPage.slug}
        lang={lang}
        userProfile={userProfile}
        menus={menus}
      >
        <div className="mx-auto flex max-w-[75ch] flex-col">
          <div className="flex flex-col gap-3">
            {currentPage.name[lang] !== currentPage.title[lang] && (
              <p className="text-sm font-bold uppercase tracking-widest text-primary-700">
                {currentPage.name[lang]}
              </p>
            )}{" "}
            <h1 className="text-4xl md:text-5xl">{currentPage.title[lang]}</h1>
            {currentPage.subtitle && (
              <p className="text-lg">{currentPage.subtitle[lang]}</p>
            )}
          </div>

          <div className="mt-16 flex flex-col gap-12">
            {currentPage.content &&
              currentPage.content.map((item) => {
                switch (item._type) {
                  case "textSection":
                    return <TextSection key={item._key} item={item} />;

                  case "linkButton":
                    return (
                      <LinkButton
                        key={item._key}
                        href={
                          item.type === "url"
                            ? item.href
                            : "mailto:" + userProfile.contactDetails?.email
                        }
                        level={item.level}
                      >
                        {item.label[lang]}
                      </LinkButton>
                    );

                  case "imageSection":
                    return <ImageSection key={item._key} item={item} />;

                  default:
                    return null;
                }
              })}
          </div>

          {isServicePage && <FAQs faqs={faqs} lang={lang} />}
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
      `*[_type == "page" && slug[$locale].current == $slug && !(_id in path("drafts.**"))][0]{..., content[]{..., _type == "imageSection" => {..., image { ..., asset->{ ..., metadata{lqip} }}}}}`,
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

    const faqs = await client.fetch(
      '*[_type == "faq" && !(_id in path("drafts.**"))]',
    );

    return {
      props: {
        userProfile,
        menus,
        currentPage,
        faqs,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
