"use client";
import SelectBox from "@/components/common/SelectBox";
import SelectStack from "@/components/common/SelectStack";
import Peoples from "@/components/people/Peoples";
import SearchForm from "@/components/common/SearchForm";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";

const option = [
  { id: 1, value: "frontend" },
  { id: 2, value: "backend" },
  { id: 3, value: "designer" },
  { id: 4, value: "pm" },
  { id: 5, value: "ios" },
  { id: 6, value: "android" },
  { id: 7, value: "devops" },
];

type Props = {
  searchParams: {
    page: string;
    size: string;
    sort?: string;
    keyword?: string;
    position?: string;
    techStack?: string;
  };
};

export default function PeoplePage({ searchParams }: Props) {
  const router = useRouter();
  const [optSelected, setOptSelected] = useState<string>("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const ref = useRef<any>();

  const changeSearchParams = (key: string, value: any) => {
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      [key]: value,
    });
    if (!value) {
      newSearchParams.delete(key);
    }
    router.replace(`/people?${newSearchParams.toString()}`);
  };

  const onClickSelectBox = (value: string) => {
    setOptSelected(value);
    changeSearchParams("position", value);
  };

  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setKeyword(ref.current.value);
    changeSearchParams("keyword", ref.current.value);
    ref.current.value = "";
  };

  //기술스택 쿼리파람즈 추가
  useEffect(() => {
    changeSearchParams("techStack", selectedStack.join(","));
  }, [selectedStack]);

  return (
    <div className="flex flex-col gap-[20px]">
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
            className="rounded-2xl"
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
            changeSearchParams("sort", "RECENT");
          }}
        >
          최신순
        </button>
        <button
          onClick={() => {
            changeSearchParams("sort", "POPULAR");
          }}
        >
          인기순
        </button>
      </div>
      <Peoples searchParams={searchParams} />
    </div>
  );
}
