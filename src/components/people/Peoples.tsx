"use client";
import getPeoples from "@/lib/people/getPeoples";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";

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
  const sortedData = data?.data.sort((a, b) => {
    if (a.recent && !b.recent) return -1;
    if (!a.recent && b.recent) return 1;
    return 0;
  });
  if (data?.data.length === 0) {
    return <div>값이 없습니다. 다른걸 검색해주세요!</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-[15px]">
      {sortedData?.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </div>
  );
}
