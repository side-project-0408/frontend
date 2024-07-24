import ProjectBox from "@/components/common/ProjectBox";
import Link from "next/link";

import { QueryClient } from "@tanstack/react-query";
import { getHotProjects } from "../lib/project/getHotProjects";
import { IProjects } from "@/model/projects";
import Banner from "@/components/common/Banner";
import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading";
import NoDataAlert from "@/components/common/NoDataAlert";

const HotPeople = dynamic(() => import("@/components/people/HotPeople"), {
  loading: () => <Loading />,
});

export default async function Home() {
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
    <main className="flex h-auto flex-col gap-[50px]">
      <Banner />
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <div className="text-xl font-bold">이번 주 Hot People 🔥</div>
            <Link href={`/people`}>전체보기</Link>
          </div>
          <div className="flex flex-wrap items-center gap-[9px]">
            <HotPeople />
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="my-3 flex justify-between">
            <div className="text-xl font-bold">이번 주 Hot Project 🔥</div>
            <Link href="/project">전체보기</Link>
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {hotProjectsResp?.data.length === 0 ? (
              <NoDataAlert>아직 작성된 프로젝트가 없습니다.</NoDataAlert>
            ) : (
              <>
                {hotProjectsResp?.data
                  .sort(
                    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
                  )
                  .map((project, i) => {
                    return (
                      <ProjectBox key={`hotProject${i}`} project={project} />
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
