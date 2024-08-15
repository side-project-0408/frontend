"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { IoArrowBack } from "react-icons/io5";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  inValid?: boolean;
  className?: string;
  size?: "large" | "medium";
  back?: boolean;
  onClickHandler?: () => void;
}
export default function Button({
  children,
  className,
  inValid = false,
  size = "large",
  back = false,
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
      className={`${inValid && "bg-neutral-gray-50"} items-center ${className}`}
      onClick={back ? onClickBack : onClickHandler}
      {...props}
    >
      {back ? (
        <div className="text-[36px]">
          <IoArrowBack />
        </div>
      ) : (
        <p className="text-center font-bold">{children}</p>
      )}
    </button>
  );
}
