import Image from "next/image";

type Props = {
  imageUrl: string;
  className?: string;
};

export default function ImageBox({ imageUrl, className }: Props) {
  return (
    <>
      <Image
        src={imageUrl}
        alt={imageUrl}
        className={`absolute ${className}`}
      />
    </>
  );
}
