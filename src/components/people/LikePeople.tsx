import getLikePeoples from "@/lib/people/getLikePeoples";
import { GetPeoples } from "@/model/peoples";
import { useQuery } from "@tanstack/react-query";
import PeopleContentBox from "./PeopleContentBox";
import { getCookie } from "cookies-next";

export default function LikePeople() {
  const access_token = getCookie("access_token") as string;
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
