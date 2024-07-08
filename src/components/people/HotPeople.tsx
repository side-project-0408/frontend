import { GetPeoples } from "@/model/peoples";
import { QueryClient, useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import hotPeopls from "@/lib/people/hotPeoples";

export default async function HotPeople() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["get", "hotpeoples"],
    queryFn: hotPeopls,
  });

  const hotPeopleData: GetPeoples | undefined = queryClient.getQueryData([
    "get",
    "hotpeoples",
  ]);

  return (
    <>
      {hotPeopleData?.data?.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </>
  );
}
