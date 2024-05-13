"use client";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import hotPeopls from "@/lib/people/hotPeoples";

type Props = {
  searchParams: {
    size: string;
  };
};

export default function HotPeople({ searchParams }: Props) {
  const { data } = useQuery<
    GetPeoples,
    Object,
    GetPeoples,
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["get", "hotpeoples", searchParams],
    queryFn: hotPeopls,
  });
  return (
    <>
      {data?.data.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </>
  );
}
