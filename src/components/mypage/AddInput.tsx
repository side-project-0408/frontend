"use client";
import { GetUserData } from "@/model/userInfo";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDebounce from "./lib/Debounce";
import { FaPlus } from "react-icons/fa6";

interface Props {
  linkUrls: string;
  setProduct: React.Dispatch<React.SetStateAction<GetUserData>>;
}

export default function AddInput({ linkUrls, setProduct }: Props) {
  const linkRef = useRef<HTMLInputElement>(null);

  // 초기 linkUrl값을 배열로 전환
  const [linkInput, setLinkInput] = useState(() =>
    typeof linkUrls === "string"
      ? linkUrls.split(",").map((link) => ({ link }))
      : [],
  );

  const handleClick = () => {
    if (linkInput.length < 3) {
      setLinkInput([...linkInput, { link: "" }]);
    } else {
      alert("링크는 최대 3개 입니다.");
    }
    setProduct((prev) => ({
      ...prev,
      links: linkInput.map((inputLink) => inputLink.link).join(","),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newInputData = linkInput.map((item, index) =>
      index === i ? { ...item, link: linkRef.current?.value as string } : item,
    );
    setLinkInput(newInputData);
  };

  const handleDelete = (i: number) => {
    const deleteVal = [...linkInput];
    deleteVal.splice(i, 1);
    setLinkInput(deleteVal);
    setProduct((prev) => ({
      ...prev,
      links: deleteVal.map((inputLink) => inputLink.link).join(","),
    }));
  };

  return (
    <div className="flex flex-col items-start gap-3">
      {linkInput?.map((val, i) => (
        <div className="flex w-full gap-3" key={`input${i}`}>
          <input
            name="link"
            value={val.link}
            ref={linkRef}
            onChange={(e) => handleChange(e, i)}
            className="h-[55px] w-[300px] rounded-md border px-2 py-1"
          />
          <button onClick={() => handleDelete(i)} className="text-xl">
            <RiDeleteBin5Line />
          </button>
        </div>
      ))}
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
