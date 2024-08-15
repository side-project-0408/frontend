import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProjectDetailPageContents from "@/components/project/ProjectDetailPageContents";
import { getProjectDetail } from "../../../lib/project/getProjectDetail";
import Button from "@/components/common/Button";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function ProjectDetailPage({
  params: { projectId },
}: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", "detail", projectId],
    queryFn: () => getProjectDetail(projectId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydratedState}>
        <Button back />
        <ProjectDetailPageContents projectId={projectId} />
      </HydrationBoundary>
    </div>
  );
}
