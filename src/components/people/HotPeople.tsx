import { GetPeoples } from "@/model/peoples";
import { QueryClient, useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import hotPeopls from "@/lib/people/hotPeoples";

type Props = {
  searchParams: {
    size: string;
  };
};

export default async function HotPeople({ searchParams }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["get", "hotpeoples", searchParams],
    queryFn: hotPeopls,
  });

  const hotPeopleData: GetPeoples | undefined = queryClient.getQueryData([
    "get",
    "hotpeoples",
    searchParams,
  ]);
  return (
    <>
      {hotPeopleData?.data?.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </>
  );
}
