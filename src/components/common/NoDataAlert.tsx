import Image from "next/image";
import logo from "../../../public/logo.png";

type Props = {
  children: React.ReactNode;
};
export default function NoDataAlert({ children }: Props) {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center gap-[20px]">
      <Image src={logo} alt="로고" width={80} />
      {children}
    </div>
  );
}
