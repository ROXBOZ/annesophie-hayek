import Layout from "@/components/Layout";
import { client } from "../../config/sanity";

export default function Home({ userProfile }: { userProfile: User }) {
  return (
    <Layout userProfile={userProfile}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facilis
      eveniet, ea aspernatur consequuntur similique magni neque officiis
      expedita animi possimus nesciunt rerum excepturi ad quod, minus fuga odit
      illo!
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const userProfile: any = await client.fetch(
      '*[_type == "userProfile"][0]{name, titles, contactDetails}',
    );

    if (!userProfile) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userProfile,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
