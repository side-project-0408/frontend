"use client";
import NoDataAlert from "@/components/common/NoDataAlert";
import ProjectBox from "@/components/common/ProjectBox";
import getWriteProject from "@/lib/mypage/getWriteProject";
import { GetProjects } from "@/model/projects";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export default function ProjectWritePage() {
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
    <>
      {data?.data.length === 0 ? (
        <NoDataAlert>작성한 프로젝트가 없습니다.</NoDataAlert>
      ) : (
        <>{data?.data.map((project) => <ProjectBox project={project} />)}</>
      )}
    </>
  );
}
