import getLikePeoples from "@/lib/people/getLikePeoples";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";

export default function LikePeople() {
  const { data: likePeopleList } = useQuery<
    GetPeoples,
    Error,
    GetPeoples,
    [string, string]
  >({
    queryKey: ["get", "likepeoples"],
    queryFn: getLikePeoples,
  });
  return (
    <div>
      {likePeopleList?.data.map((contentData) => (
        <PeopleContentBox key={contentData.userId} contentData={contentData} />
      ))}
    </div>
  );
}
