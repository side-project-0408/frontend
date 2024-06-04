"use client";
import getWriteProject from "@/lib/mypage/getWriteProject";
import ProjectBox from "../common/ProjectBox";
import { GetProjects } from "@/model/projects";
import { useQuery } from "@tanstack/react-query";

export default function ProjectCard() {
  const { data } = useQuery<GetProjects>({
    queryKey: ["get", "writeproject"],
    queryFn: getWriteProject,
  });
  return (
    <div>
      {data?.data.map((card) => (
        <ProjectBox project={card} key={card.projectId} />
      ))}
    </div>
  );
}
