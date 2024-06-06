"use client";
import getPeoples from "@/lib/people/getPeoples";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import { useState } from "react";
import Pagination from "../common/Pagination";

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

export default function Peoples({ searchParams }: Props) {
  const [page, setPage] = useState(parseInt(searchParams.page) || 0);

  const { data } = useQuery<
    GetPeoples,
    Object,
    GetPeoples,
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["get", "peoples", { ...searchParams, page: page.toString() }],
    queryFn: getPeoples,
  });

  const totalPages = data?.totalPages || 1;

  const sortedData = data?.data.sort((a, b) => {
    if (a.recent && !b.recent) return -1;
    if (!a.recent && b.recent) return 1;
    return 0;
  });

  if (data?.data.length === 0) {
    return <div>값이 없습니다. 다른걸 검색해주세요!</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-[15px]">
        {sortedData?.map((contentData) => (
          <PeopleContentBox
            key={contentData.userId}
            contentData={contentData}
          />
        ))}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
}
