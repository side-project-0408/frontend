"use client";
import SelectBox from "@/components/common/SelectBox";
import SelectStack from "@/components/common/SelectStack";
import Peoples from "@/components/people/Peoples";
import SearchForm from "@/components/common/SearchForm";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef, useState } from "react";

const option = [
  { key: "frontend", value: "프론트엔드" },
  { key: "beckend", value: "백엔드" },
  { key: "designer", value: "디자이너" },
  { key: "planner", value: "기획자" },
];

type Props = {
  searchParams: {
    page: string;
    size: string;
    sort?: string;
    keyword?: string;
    position?: string;
    teckStack?: string;
  };
};
export default function PeoplePage({ searchParams }: Props) {
  const router = useRouter();

  const newSearchParams = new URLSearchParams(searchParams);
  const [optSelected, setOptSelected] = useState<string>("");

  const [keyword, setKeyword] = useState<string>("");

  const onClickSelectBox = (value: string) => {
    setOptSelected(value);
    newSearchParams.set("position", value);
    router.replace(`/people?${newSearchParams.toString()}`);
  };

  const ref = useRef<any>();

  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setKeyword(ref.current.value);
    router.push(`/people?keyword=${ref.current.value}`);
  };

  return (
    <div>
      <div className="items-cebter relative flex gap-4">
        <h1 className="text-[36px] font-bold">People</h1>
        <p className="title-content text-neutral-gray-100 relative text-[15px]">
          우리가 people에게 직접 제안하고 프로젝트를 구성할 수 있어요.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <SelectBox
            onClick={onClickSelectBox}
            options={option}
            title="포지션"
            optSelected={optSelected}
            className="rounded-2xl"
          />
          <SelectStack />
        </div>
        <SearchForm ref={ref} onSubmit={onSubmitSearch} />
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            router.push(`/people?sort=RECENT`);
          }}
        >
          최신순
        </button>
        <button
          onClick={() => {
            router.push(`/people?sort=POPULAR`);
          }}
        >
          인기순
        </button>
      </div>
      <Peoples searchParams={searchParams} />
    </div>
  );
}
