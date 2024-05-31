import ProjectBox from "@/components/common/ProjectBox";
import Link from "next/link";

import { faker } from "@faker-js/faker";
import HotPeople from "@/components/people/HotPeople";
import { QueryClient } from "@tanstack/react-query";
import { getHotProjects } from "../lib/project/getHotProjects";
import { IProjects } from "@/model/projects";

type Props = {
  searchParams: {
    size: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", "hot"],
    queryFn: getHotProjects,
  });

  const hotProjectsResp: IProjects | undefined = queryClient.getQueryData([
    "project",
    "hot",
  ]);

  return (
    <main className="flex h-auto flex-col gap-[20px]">
      <div className="my-[20px] flex h-60 w-full items-center justify-center border">
        배너 이미지
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <div className="text-xl font-bold">이번 주 Hot People</div>
            <Link href={`/people`}>전체보기</Link>
          </div>
          <div className="flex flex-wrap items-center gap-[9px]">
            <HotPeople searchParams={searchParams} />
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="my-3 flex justify-between">
            <div className="text-xl font-bold">이번 주 Hot Project</div>
            <Link href="/project">전체보기</Link>
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {hotProjectsResp?.data
              .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
              .map((project, i) => {
                return <ProjectBox key={`hotProject${i}`} project={project} />;
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
