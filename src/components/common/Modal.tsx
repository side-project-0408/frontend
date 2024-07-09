"use client";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  onClickHandler?: () => void;
  className?: string;
};
export default function Modal({ children, onClickHandler, className }: Props) {
  const [close, setClose] = useState<boolean>(false);
  return (
    <div
      className={`fixed left-0 top-0 z-[4] h-full w-full bg-[rgba(0,0,0,0.4)] ${close && "hidden"}`}
    >
      <div
        className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white ${className} p-6`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setClose(true);
              if (onClickHandler) {
                onClickHandler();
              }
            }}
          >
            <IoClose className="text-[30px]" />
          </button>
        </div>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
