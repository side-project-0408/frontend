type Props = {
  textToShow: string;
  textSize: string;
};

type FontSizeVariantsType = {
  "12px": string;
  "15px": string;
  [key: string]: string;
};

export default function BlueTextBox({ textToShow, textSize }: Props) {
  const fontSizeVariants: FontSizeVariantsType = {
    "12px": "text-[12px]",
    "15px": "text-[15px]",
  };

  return (
    <div
      className={`${fontSizeVariants[textSize]} w-fit rounded-xl bg-[#F2F4F8] px-[8px] py-0.5 font-bold text-[#3E86F5]`}
    >
      {textToShow}
    </div>
  );
}
