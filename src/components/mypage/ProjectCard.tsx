import getWriteProject from "@/lib/mypage/getWriteProject";
import { GetProjects } from "@/model/projects";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import ProjectBox from "../common/ProjectBox";
import NoDataAlert from "../common/NoDataAlert";

export default function ProjectCard() {
  const access_token = getCookie("access_token") as string;

  const { data } = useQuery<
    GetProjects,
    Error,
    GetProjects,
    [string, string, string]
  >({
    queryKey: ["get", "writeproject", access_token],
    queryFn: getWriteProject,
    enabled: !!access_token,
  });

  return (
    <div className="flex flex-wrap gap-6">
      {data?.data.length === 0 ? (
        <NoDataAlert>
          <p>찜한 프로젝트가 없습니다.</p>
        </NoDataAlert>
      ) : (
        <>{data?.data.map((project) => <ProjectBox project={project} />)}</>
      )}
    </div>
  );
}
