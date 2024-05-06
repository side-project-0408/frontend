"use client";
import Image from "next/image";
import backIcon from "../../../public/image/backIcon.svg";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <button onClick={onClickBack}>
      <Image src={backIcon} alt="뒤로가기 아이콘" />
    </button>
  );
}
