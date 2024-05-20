"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export type Props = {
  height?: number;
  width?: number;
  title: string;
  onClick: (optionValue: string) => void;
  optSelected: string;
  options: { id: number; value: string }[];
  className?: string;
};
const SelectBox = ({
  height = 40,
  width = 129,
  options,
  optSelected,
  title,
  onClick,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-[${width}px] h-[${height}px] relative cursor-pointer border ${className}`}
      onClick={ToggleHandler}
    >
      <div className="absolute top-[50%] flex w-full -translate-y-1/2 transform items-center justify-between px-[10px]">
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
                  key={option.id}
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
