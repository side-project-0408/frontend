"use client";
import { useRef, useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

interface Props {
  linkUrls: string;
  setLink: (newLinks: string[]) => void;
}

export default function AddInput({ linkUrls, setLink }: Props) {
  const linkRef = useRef<HTMLInputElement>(null);

  // 초기 linkUrl값을 배열로 전환
  const [linkInput, setLinkInput] = useState<string[]>([]);

  useEffect(() => {
    setLinkInput(linkUrls ? linkUrls.split(",") : [""]);
  }, [linkUrls]);

  const handleClick = () => {
    if (linkInput.length < 3) {
      setLinkInput([...linkInput, ""]);
    } else {
      alert("링크는 최대 3개 입니다.");
    }
  };

  const handleDelete = (i: number) => {
    const newInputData = linkInput.filter((_, index) => index !== i);
    setLinkInput(newInputData.length ? newInputData : [""]);
    setLink(newInputData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newInputData = linkInput.map((item, index) =>
      index === i ? e.target.value : item,
    );
    setLinkInput(newInputData);
    setLink(newInputData);
  };
  return (
    <div className="flex flex-col items-start gap-3">
      {linkInput?.map((val, i) => {
        return (
          <div className="flex w-full gap-3" key={`input${i}`}>
            <input
              name="link"
              value={val}
              ref={linkRef}
              onChange={(e) => handleChange(e, i)}
              className="h-[55px] w-[300px] rounded-md border px-2 py-1 placeholder:text-neutral-black-800"
              placeholder={val}
            />
            <button onClick={() => handleDelete(i)} className="text-xl">
              <RiDeleteBin5Line />
            </button>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-sm font-bold"
      >
        링크 추가
        <FaPlus />
      </button>
    </div>
  );
}
