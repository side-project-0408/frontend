import Image from "next/image";

type Props = {
  count: number;
  icon: string;
};

export default function HeartEyeIconBox({ count, icon }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Image src={icon} alt={icon} />
      <h3 className="text-xs">{count}</h3>
    </div>
  );
}
