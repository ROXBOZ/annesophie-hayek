import Layout from "@/components/Layout";
import { client } from "../../config/sanity";

interface Home {
  title: {
    fr: string;
    en: string;
  };
  subtitle?: {
    fr: string;
    en: string;
  };

  video: {
    asset: {
      url: string;
    };
  };
}

export default function Home({
  userProfile,
  home,
}: {
  userProfile: User;
  home: Home;
}) {
  const lang = "fr";
  console.log("home.subtitle :", home.subtitle);

  return (
    <Layout userProfile={userProfile}>
      <div className="h-min-h 0 flex flex-col items-start gap-6 md:flex-row-reverse">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-3 border-b border-primary-200 pb-6">
            <h1 className="flex text-5xl">{home.title[lang]}</h1>
            {home.subtitle && home.subtitle[lang] && (
              <p className="text-xl">{home.subtitle[lang]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              magnam ipsum, animi eaque maiores illo laudantium sunt voluptates
              optio, possimus odio dignissimos enim numquam necessitatibus
              cupiditate accusantium odit? Ipsam, maxime?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur reiciendis odit iure in veniam doloribus minus
              laboriosam iusto dolorum? Doloremque fugiat quia expedita enim
              quis ex error quaerat ipsa iusto.
            </p>
          </div>
        </div>
        <div className="aspect-square h-full w-full flex-1 bg-primary-200"></div>
        {/* <iframe
          className="aspect-square w-full flex-1 object-cover mix-blend-multiply"
          src={home.video.asset.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        /> */}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const userProfile: User = await client.fetch(
      '*[_type == "userProfile"][0]{name, logo {..., asset->{..., metadata{lqip}}}, titles, contactDetails}',
    );
    const home: Home = await client.fetch(
      '*[_type == "home"][0]{title, subtitle, video{asset->}}',
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
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
