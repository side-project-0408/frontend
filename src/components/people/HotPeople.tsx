"use client";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import hotPeopls from "@/lib/people/hotPeoples";

export default function HotPeople() {
  const { data: hotPeopleData } = useQuery<
    GetPeoples,
    Error,
    GetPeoples,
    [_1: string, _2: string]
  >({
    queryKey: ["get", "hotpeoples"],
    queryFn: hotPeopls,
  });

  return (
    <>
      {hotPeopleData?.data?.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </>
  );
}
