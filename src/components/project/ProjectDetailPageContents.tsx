"use client";

import { getProjectDetail } from "@/lib/project/getProjectDetail";
import { useQuery } from "@tanstack/react-query";

type Props = {
  projectId: string;
};

export default function ProjectDetailPageContents({ projectId }: Props) {
  const { data: detailedProject } = useQuery({
    queryKey: ["project", "detail", projectId],
    queryFn: () => getProjectDetail(projectId),
  });
  console.log("project detail", detailedProject);
  return <div>project detail page contents</div>;
}
