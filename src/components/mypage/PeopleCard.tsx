import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import getLikePeoples from "@/lib/people/getLikePeoples";
import { GetPeoples } from "@/model/peoples";
import PeopleContentBox from "../people/PeopleContentBox";
import NoDataAlert from "../common/NoDataAlert";

export default function PeopleCard() {
  const access_token = getCookie("access_token") as string;

  const { data } = useQuery<
    GetPeoples,
    Error,
    GetPeoples,
    [string, string, string]
  >({
    queryKey: ["get", "likepeoples", access_token],
    queryFn: getLikePeoples,
    enabled: !!access_token,
  });

  return (
    <div className="flex flex-wrap gap-6">
      {data?.data.length === 0 ? (
        <NoDataAlert>
          <p>찜한 피플이 없습니다.</p>
        </NoDataAlert>
      ) : (
        <>
          {data?.data.map((likeUsers) => (
            <PeopleContentBox contentData={likeUsers} key={likeUsers.userId} />
          ))}
        </>
      )}
    </div>
  );
}
