"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export type Props = {
  height?: number;
  width?: number;
  title: string;
  onClick: (optionValue: string) => void;
  optSelected: string;
  options: { key: number; value: string }[];
};
const SelectBox = ({
  height = 40,
  width = 129,
  options,
  optSelected,
  title,
  onClick,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-[${width}px] h-[${height}px] relative cursor-pointer rounded-2xl border`}
      onClick={ToggleHandler}
    >
      <div className="absolute top-[50%] flex w-full -translate-y-1/2 transform items-center justify-around">
        {optSelected ? <span>{optSelected}</span> : <span>{title}</span>}
        <IoIosArrowDown />
      </div>
      <div>
        {isOpen && (
          <ul
            className={`absolute top-[42px] z-[1] w-[${width}px] bg-neutral-white-0 rounded-xl border`}
          >
            {options?.map((option) => {
              return (
                <li
                  key={option.key}
                  className="px-3 py-2 font-bold hover:text-orange-500"
                  onClick={() => onClick(option.value)}
                >
                  {option.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectBox;