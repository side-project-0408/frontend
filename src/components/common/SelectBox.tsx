"use client";
import { useState } from "react";

export type Props = {
  height?: number;
  width?: number;
  options: { key: number; value: string }[];
};
const SelectBox = ({ height = 40, width = 129, options }: Props) => {
  const [selected, setSelected] = useState<string>("");
  const handleOptionClick = (selectOption: string) => {
    console.log("선택한옵션", selectOption);
  };
  return (
    <select
      name=""
      id=""
      value={selected}
      className={`w-[${width}px]`}
      onChange={(e) => {
        setSelected(e.target.value);
      }}
    >
      <>
        {options?.map((option) => {
          return (
            <option
              className="bg-neutral-500"
              key={option.key}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.value}
            </option>
          );
        })}
      </>
    </select>
  );
};

export default SelectBox;
