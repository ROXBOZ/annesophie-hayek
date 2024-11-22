import Image from "next/image";
import { useSanityImage } from "../../config/sanity";

export const SanityImage = ({
  image,
  alt,
  width,
  height,
}: {
  image: Image;
  alt: string;
  width: number;
  height: number;
}) => {
  const imageProps = useSanityImage(image);

  if (!imageProps || !imageProps.src) {
    console.error("Image props are undefined or null", image);
    return null;
  }

  return (
    <Image
      {...imageProps}
      blurDataURL={image.asset.metadata.lqip}
      alt={alt}
      placeholder="blur"
      width={width}
      height={height}
    />
  );
};
