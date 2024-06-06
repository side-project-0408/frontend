import getWriteProject from "@/lib/mypage/getWriteProject";
import { GetProjects } from "@/model/projects";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import ProjectBox from "../common/ProjectBox";
import logo from "../../../public/logo.png";
import Image from "next/image";

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
        <div className="flex h-[300px] w-full flex-col items-center justify-center gap-[20px]">
          <Image src={logo} alt="로고" width={80} />
          <p>아직 작성한 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <>{data?.data.map((project) => <ProjectBox project={project} />)}</>
      )}
    </div>
  );
}
