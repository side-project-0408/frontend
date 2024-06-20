"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <button onClick={onClickBack} className="h-[40px] w-[40px]">
      <IoArrowBack className="text-[36px]" />
    </button>
  );
}
