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

  // const [isTransitioning, setIsTransitioning] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChangeStart = () => {
  //     setIsTransitioning(true);
  //   };

  //   const handleRouteChangeComplete = () => {
  //     setIsTransitioning(false);
  //   };

  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //   };
  // }, [router]);

  const TextSection: React.FC<{ item: TextSection }> = ({ item }) => {
    return (
      <div
        key={item._key}
        className={`flex w-fit flex-col gap-2 ${item.isBannered ? "rounded-xl bg-gradient-to-t from-primary-100 via-primary-50 to-primary-200 px-8 py-8 md:px-12" : ""}`}
      >
        {item.title && (
          <h2 className={`text-2xl ${lang === "en" && "capitalize"}`}>
            {item.title[lang]}
          </h2>
        )}
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
  const ButtonSection: React.FC<{ item: ButtonSection }> = ({ item }) => {
    return (
      <div className="flex flex-col gap-3">
        {item.title && item.title[lang] && (
          <h2 className="text-2xl">{item.title[lang]}</h2>
        )}
        <div className="flex flex-wrap items-baseline gap-3">
          {item.buttons &&
            item.buttons.map((button) => {
              return (
                <LinkButton
                  key={button._key}
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
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute left-1/2 top-1/2 z-50 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-teal-200 to-blue-200 mix-blend-multiply"
            initial={{ scale: 0 }}
            animate={{ scale: 500 }}
            exit={{ scale: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence> */}

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
            <h1
              className={`text-4xl md:text-5xl ${lang === "en" && "capitalize"}`}
            >
              {currentPage.title[lang]}
            </h1>
            {currentPage.subtitle && (
              <p className="text-lg">{currentPage.subtitle[lang]}</p>
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

                    default:
                      return null;
                  }
                })}
            </div>
          )}
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
