import CustomHead from "@/components/CustomHead";
import FAQs from "@/components/FAQs";
import Image from "next/image";
import Layout from "@/components/Layout";
import { LinkButton } from "@/components/UI/LinkButton";
import { PortableText } from "@portabletext/react";
import React from "react";
import { SanityImage } from "@/components/SanityImage";
import { client } from "../../config/sanity";
import { useAnimateElements } from "@/lib/gsap";
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
  useAnimateElements();
  const { locale } = useRouter();
  const lang: "en" | "fr" = (locale ?? "fr") as "en" | "fr";
  const isServicePage =
    currentPage._id === "a4781abc-b2bc-43d7-a749-6c392cec5612";
  const isFAQPage = currentPage._id === "dde666c8-4c23-4217-b93d-a669dd92acce";
  const formatSwissPhoneNumber = (phoneNumber: string) => {
    const match = phoneNumber?.match(/^(\+41)(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phoneNumber;
    const [, countryCode, areaCode, part1, part2, part3] = match;
    return `${countryCode} (0) ${areaCode} ${part1} ${part2} ${part3}`;
  };
  const formattedPhone = userProfile.contactDetails?.telephone
    ? formatSwissPhoneNumber(userProfile.contactDetails.telephone)
    : "";

  const TextSection: React.FC<{ item: TextSection }> = ({ item }) => {
    return (
      <div
        key={item._key}
        className={`anim-el flex w-fit flex-col gap-2 ${item.isBannered && "bg-secondary-200 rounded-xl px-8 py-8 md:px-12"}`}
      >
        {item.title && (
          <h2 className={`text-2xl ${lang === "en" && "capitalize"}`}>
            {item.title[lang]}
          </h2>
        )}
        <div className="-wrapper flex flex-col gap-1">
          <PortableText value={item.text[lang]} />
        </div>
      </div>
    );
  };
  const ImageSection: React.FC<{ item: ImageSection }> = ({ item }) => {
    return (
      <div className="anim-el mix-blend-multiply">
        <SanityImage
          image={item.image}
          alt={item.alt[lang]}
          width={500}
          height={600}
        />
      </div>
    );
  };
  const ButtonSection: React.FC<{ item: ButtonSection }> = ({ item }) => {
    return (
      <div className="flex flex-col gap-3">
        {item.title && item.title[lang] && (
          <h2 className={`anim-el text-2xl ${lang === "en" && "capitalize"}`}>
            {item.title[lang]}
          </h2>
        )}
        <div className="flex flex-wrap items-baseline gap-6 lg:gap-3">
          {item.buttons &&
            item.buttons.map((button) => {
              return (
                <div key={button._key} className="anim-el">
                  <LinkButton
                    href={
                      button.type === "url"
                        ? button.href
                        : button.type === "email"
                          ? "mailto:" + userProfile.contactDetails?.email
                          : "tel:" + userProfile.contactDetails?.telephone
                    }
                    level={button.level}
                  >
                    {button.label[lang]}{" "}
                    {button.type === "email" && (
                      <span>— {userProfile.contactDetails?.email}</span>
                    )}
                    {button.type === "tel" && <span>— {formattedPhone}</span>}
                  </LinkButton>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  const KeywordsSection: React.FC<{ item: KeywordsSection }> = ({ item }) => {
    return (
      <div className="flex flex-col gap-3">
        {item.title && item.title[lang] && (
          <h2 className={`anim-el text-2xl ${lang === "en" && "capitalize"}`}>
            {item.title[lang]}
          </h2>
        )}
        <div className="flex w-fit flex-wrap items-baseline gap-3">
          {item.keywords &&
            item.keywords.map((keyword) => {
              return (
                <div
                  key={keyword._key}
                  className="anim-el bg-secondary-200 rounded-full px-4 py-1 font-semibold"
                >
                  <div>{keyword[lang]}</div>
                </div>
              );
            })}
        </div>
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
        <div
          className={` ${isServicePage && "lg:relative lg:flex lg:-translate-x-[200px]"}`}
        >
          {isServicePage && (
            <Image
              className="anim-el sticky top-12 hidden h-fit w-[400px] lg:flex"
              src="/seagull.png"
              width={500}
              height={500}
              alt={`${lang === "fr" ? "mouette" : "seagull"}`}
            />
          )}
          <div className="mx-auto flex flex-col lg:max-w-[75ch]">
            <div className="flex flex-col gap-3">
              {currentPage.name[lang] !== currentPage.title[lang] && (
                <p className="anim-el text-sm font-semibold uppercase tracking-widest text-primary-700">
                  {currentPage.name[lang]}
                </p>
              )}{" "}
              <h1
                className={`anim-el text-4xl md:text-5xl ${lang === "en" && "capitalize"}`}
              >
                {currentPage.title[lang]}
              </h1>
              {currentPage.subtitle && (
                <p className="anim-el text-lg">{currentPage.subtitle[lang]}</p>
              )}
            </div>
            {isFAQPage ? (
              <FAQs faqs={faqs} lang={lang} />
            ) : (
              <div className="mt-16 flex flex-col gap-12">
                {currentPage.content &&
                  currentPage.content.map((item) => {
                    console.log("item._type :", item._type);
                    switch (item._type) {
                      case "textSection":
                        return <TextSection key={item._key} item={item} />;

                      case "linkButton":
                        return <ButtonSection key={item._key} item={item} />;

                      case "imageSection":
                        return <ImageSection key={item._key} item={item} />;

                      case "keywordsSection":
                        return <KeywordsSection key={item._key} item={item} />;

                      default:
                        return null;
                    }
                  })}
              </div>
            )}
            {isServicePage && <FAQs faqs={faqs} lang={lang} />}
          </div>
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
