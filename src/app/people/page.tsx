"use client";
import SelectBox from "@/components/common/SelectBox";
import SelectStack from "@/components/common/SelectStack";
import Peoples from "@/components/people/Peoples";
import SearchForm from "@/components/common/SearchForm";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";

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
  const [optSelected, setOptSelected] = useState<string>("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const onClickSelectBox = (value: string) => {
    setOptSelected(value);
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      position: value,
    });
    router.replace(`/people?${newSearchParams.toString()}`);
  };

  const ref = useRef<any>();

  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setKeyword(ref.current.value);
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      keyword: ref.current.value,
    });
    setKeyword("");
    console.log("setKeyword", keyword);

    router.replace(`/people?${newSearchParams.toString()}`);
  };

  //기술스택 쿼리파람즈 추가
  useEffect(() => {
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      teckStack: selectedStack.join(","),
    });
    router.replace(`/people?${newSearchParams.toString()}`);
  }, [selectedStack]);

  return (
    <div>
      <div className="relative flex items-center gap-4">
        <h1 className="text-[36px] font-bold">People</h1>
        <p className="title-content relative text-[15px] text-neutral-gray-100">
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
          />
          <SelectStack
            optSelected={selectedStack}
            setOptSelected={setSelectedStack}
          />
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
