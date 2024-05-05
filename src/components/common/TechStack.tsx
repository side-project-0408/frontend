import Image from "next/image";

type Props = {
  techStack: string;
  showText: boolean;
};

export default function TechStack({ techStack, showText }: Props) {
  return (
    <div
      className={
        showText
          ? "flex max-w-fit items-center justify-center gap-[10px] rounded-3xl border border-[#E4E4E4] px-[10px] py-[6px]"
          : ""
      }
    >
      <Image
        src={`/techStackIcon/${techStack}.svg`}
        width={35}
        height={35}
        alt="This is tech stack image"
      />
      <div className={`text-[18px] ${showText ? "" : "hidden"}`}>
        {techStack.toUpperCase()}
      </div>
    </div>
  );
}
