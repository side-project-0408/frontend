import getLikePeoples from "@/lib/people/getLikePeoples";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";

type Props = {
  searchParams: {
    page: number;
    size: number;
    sort: string;
  };
};
export default function LikePeople() {
  const { data: likePeopleList } = useQuery<GetPeoples>({
    queryKey: ["get", "likepeoples"],
    queryFn: getLikePeoples,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  return (
    <div>
      {likePeopleList?.data.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </div>
  );
}
