import CustomHead from "@/components/CustomHead";
import Layout from "@/components/Layout";
import { LinkButton } from "@/components/UI/LinkButton";
import { PortableText } from "@portabletext/react";
import { SanityImage } from "@/components/SanityImage";
import { client } from "../../config/sanity";
import { useRouter } from "next/router";

export default function Home({
  userProfile,
  home,
  menus,
}: {
  userProfile: User;
  home: Home;
  menus: Menus;
}) {
  const { locale } = useRouter();
  const lang: "en" | "fr" = (locale ?? "fr") as "en" | "fr";

  const ColText = () => {
    return (
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-3 border-b border-primary-200 py-6">
          <h1 className="flex text-5xl">{home.title[lang]}</h1>
          {home.subtitle && home.subtitle[lang] && (
            <p className="text-xl">{home.subtitle[lang]}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <PortableText value={home.text[lang]} />
        </div>
        <div className="flex items-center gap-3">
          <LinkButton level="primary" href={`${lang}/services`}>
            Services
          </LinkButton>
          <LinkButton href="#contact" level="secondary">
            Contact
          </LinkButton>
        </div>
      </div>
    );
  };

  const ColMedia = () => {
    return (
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <SanityImage
          image={home.image}
          alt="Anne-Sophie Hayek"
          width={1000}
          height={1000}
        />

        {lang === "fr" && (
          <audio controls className="w-full">
            <source
              src={home.audio.asset.url}
              type={home.audio.asset.mimeType}
            />
          </audio>
        )}
      </div>
    );
  };

  return (
    <>
      <CustomHead seo={home.seo} lang={lang} />
      <Layout lang={lang} userProfile={userProfile} menus={menus}>
        <div className="h-min-screen flex flex-col items-start gap-12 md:flex-row">
          <ColMedia />
          <ColText />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name, logo {..., asset->{..., metadata{lqip}}}, titles, contactDetails}',
    );
    const home: Home = await client.fetch(
      '*[_type == "home"][0]{title, subtitle, text, image{..., asset->{...,metadata {lqip}}}, video{asset->}, audio{asset->}, seo}',
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
        home,
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
