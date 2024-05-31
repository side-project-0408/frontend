import { getTotalProjects } from "@/lib/project/getTotalProjects";
import { IProjects } from "@/model/projects";
import { QueryClient } from "@tanstack/react-query";

export default async function Project() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", "total"],
    queryFn: getTotalProjects,
  });
  const totalProjectsResp: IProjects | undefined = queryClient.getQueryData([
    "project",
    "total",
  ]);

  console.log("totalProjectsResp", totalProjectsResp);
  return (
    <div>
      <div className="relative flex items-center gap-4">
        <h1 className="text-[36px] font-bold">Project</h1>

        <p className="title-content relative text-[15px] text-neutral-gray-100">
          우리가 people에게 직접 제안하고 프로젝트를 구성할 수 있어요.
        </p>
      </div>
    </div>
  );
}
