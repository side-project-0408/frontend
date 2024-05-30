"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TechStack from "./TechStack";
import { IoMdCloseCircle } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

/**
 * @description
 * 기술스택 선택 select box
 * optselected : 선택한 기술스택이 담겨있는 state
 */

const stackBox = [
  {
    title: "프론트엔드",
    stack: [
      { text: "AWS" },
      { text: "Javascript" },
      { text: "nextjs" },
      { text: "vue" },
    ],
  },
  {
    title: "백엔드",
    stack: [
      { text: "django" },
      { text: "jest" },
      { text: "php" },
      { text: "python" },
      { text: "spring" },
    ],
  },
];
type Props = {
  optSelected: string[];
  setOptSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SelectStack({ optSelected, setOptSelected }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [curTab, setCurTab] = useState<number>(0);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const toggleOption = (selectedOption: string) => {
    if (optSelected.includes(selectedOption)) {
      setOptSelected(optSelected.filter((opt) => opt !== selectedOption));
    } else {
      setOptSelected([...optSelected, selectedOption]);
    }
  };

  const onClickDeleteStack = (stack: string) => {
    setOptSelected((prev: string[]) => prev.filter((opt) => opt !== stack));
  };

  return (
    <div
      className="relative w-[129px] cursor-pointer rounded-2xl border"
      tabIndex={0}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="absolute top-[50%] flex w-full -translate-y-1/2 transform items-center justify-around">
        <span>기술스택</span>
        <IoIosArrowDown />
      </div>
      {/*  */}
      {isOpen && (
        <div
          className="absolute top-[42px] z-[1] flex w-[600px] flex-col gap-3 rounded-2xl border bg-neutral-white-0 p-3 text-lg"
          onClick={stopPropagation}
        >
          <ul className="bg-neural-orange-500 flex w-[350px] gap-4">
            {stackBox.map((list, i) => (
              <li
                key={`list${i}`}
                onClick={() => setCurTab(i)}
                className={`font-bold ${curTab === i ? "text-neutral-orange-500" : ""}`}
              >
                {list.title}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap">
            {stackBox[curTab].stack.map((stackList, i) => (
              <li
                key={`stackList${i}`}
                className="flex w-fit items-center px-3 py-2"
                onClick={() => toggleOption(stackList.text)}
              >
                <TechStack techStack={stackList.text} showText />
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-3">
            {optSelected.map((selec) => (
              <li
                key={selec}
                className="flex items-center gap-1 rounded-2xl border px-2 py-1 text-sm"
              >
                <h1>{selec}</h1>
                <IoMdCloseCircle onClick={() => onClickDeleteStack(selec)} />
              </li>
            ))}
            <li
              className="flex items-center gap-1 text-sm"
              onClick={() => setOptSelected([])}
            >
              <GrPowerReset />
              초기화
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
