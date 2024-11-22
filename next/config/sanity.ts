import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "@sanity/client";
import { useNextSanityImage } from "next-sanity-image";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-10-21",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
});

export const useSanityImage = (props: any) => {
  return useNextSanityImage(
    client,
    (props ?? null) as SanityImageSource | null,
  );
};
