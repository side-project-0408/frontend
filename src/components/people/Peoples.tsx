"use client";
import getPeoples from "@/lib/people/getPeoples";
import ContentBox from "../common/ContentBox";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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

export default function Peoples({ searchParams }: Props) {
  const { data } = useQuery<
    GetPeoples,
    Object,
    GetPeoples,
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["get", "peoples", searchParams],
    queryFn: getPeoples,
    // 데이퍼 패칭 처럼 행동 //content박스에 넘겨주면 리렌더링 됨
  });

  return (
    <div className="grid grid-cols-4">
      {data?.data.map((contentData) => (
        <ContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </div>
  );
}
