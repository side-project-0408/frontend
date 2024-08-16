"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactElement } from "react";
import { IoArrowBack } from "react-icons/io5";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  inValid?: boolean;
  className?: string;
  size?: "large" | "medium";
  back?: boolean;
  onClickHandler?: () => void;
  orangeBtn?: boolean;
}
export default function Button({
  children,
  className,
  inValid = false,
  size = "large",
  back = false,
  orangeBtn = false,
  onClickHandler,
  ...props
}: Props) {
  const router = useRouter();

  const onClickBack: MouseEventHandler<HTMLButtonElement> | undefined = () => {
    router.back();
  };

  return (
    <button
      disabled={inValid}
      className={`h-[58px] ${inValid && "bg-neutral-gray-50"} ${orangeBtn && "bg-neutral-orange-500 text-neutral-white-0"} ${size === "large" && "w-full"} ${size === "medium" && "w-[100px]"} ${className}`}
      onClick={back ? onClickBack : onClickHandler}
      {...props}
    >
      {back ? (
        <div className="text-[36px]">
          <IoArrowBack />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
