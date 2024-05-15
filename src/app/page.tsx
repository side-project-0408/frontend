import ProjectBox from "@/components/common/ProjectBox";
import Link from "next/link";

import { faker } from "@faker-js/faker";
import HotPeople from "@/components/people/HotPeople";

type Props = {
  searchParams: {
    size: string;
  };
};
export default function Home({ searchParams }: Props) {
  const DUMMY_HOT_PROJECT = [
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-01-29T19:43:45.58666",
      recent: false,
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-03-29T19:43:45.58666",
      recent: true,
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-04-19T19:43:45.58666",
      recent: true,
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-02-29T19:43:45.58666",
      recent: false,
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-04-20T19:43:45.58666",
      recent: true,
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, nextjs, spring, express",
      position: "frontend, backend, designer, pm",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 30 }).toString().padStart(2, "0")}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: "2024-08-29T19:43:45.58666",
      recent: true,
    },
  ];

  return (
    <main className="h-auto">
      <div className="mt-[40px] flex h-60 w-full items-center justify-center border border-black bg-slate-500">
        배너 이미지
      </div>
      <div className="my-3 flex justify-between">
        <div className="text-xl font-bold">이번 주 Hot People</div>
        <Link href={`/people?size=10&page=1`}>전체보기</Link>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-[9px] border border-black">
        <HotPeople searchParams={searchParams} />
      </div>
      <div className="my-3 flex justify-between">
        <div className="text-xl font-bold">이번 주 Hot Project</div>
        <Link href="/project">전체보기</Link>
      </div>
      <div className="flex flex-wrap gap-[9px]">
        {[...DUMMY_HOT_PROJECT]
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .map((project, i) => {
            return <ProjectBox key={`hotProject${i}`} project={project} />;
          })}
      </div>
    </main>
  );
}
