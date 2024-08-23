"use client";

import { getProjectDetail } from "@/lib/project/getProjectDetail";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { IProjectDetail, IProjects } from "@/model/projects";
import ProjectDetailEdit from "./ProjectDetailEdit";
import ProjectDetailView from "./ProjectDetailView";
import getWriteProject from "@/lib/mypage/getWriteProject";

type Props = {
  projectId: string;
};

export default function ProjectDetailPageContents({ projectId }: Props) {
  const { data: detailedProjectResp } = useQuery<IProjectDetail>({
    queryKey: ["project", "detail", projectId],
    queryFn: () => getProjectDetail(projectId),
  });

  const access_token = getCookie("access_token") as string;

  const { data: myProjects, error } = useQuery<
    IProjects,
    Error,
    IProjects,
    [string, string, string]
  >({
    queryKey: ["get", "writeproject", access_token],
    queryFn: getWriteProject,
    enabled: !!access_token,
  });

  // console.log("project detail", detailedProjectResp);
  // console.log("myProjects", myProjects);
  // console.log("myProjectsError", error);

  let isEditable =
    access_token &&
    myProjects?.data.find((p) => p.projectId.toString() === projectId)
      ? true
      : false;
  return (
    <>
      {isEditable ? (
        <ProjectDetailEdit detailedProject={detailedProjectResp?.data} />
      ) : (
        <>
          <ProjectDetailView
            detailedProject={detailedProjectResp?.data}
            projectId={projectId}
          />
        </>
      )}
    </>
  );
}
