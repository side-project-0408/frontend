import ProjectBox from "@/components/common/ProjectBox";
import Link from "next/link";

import { faker } from "@faker-js/faker";

export default function Home() {
  const dummyHotProject = [
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
    {
      projectId: faker.number.int(),
      nickname: faker.person.fullName(),
      userFileUrl: faker.image.avatar(),
      title: faker.lorem.sentences(),
      techStack: "react, java, next, spring, express",
      position: "frontend, backend, designer, PM",
      deadLine: `2024-${faker.number.int({ min: 1, max: 12 })}-${faker.number.int({ min: 1, max: 30 })}`,
      viewCount: faker.number.int(),
      favoriteCount: faker.number.int(),
      createdAt: faker.date.anytime(),
      recent: faker.datatype.boolean(0.5),
    },
  ];

  return (
    <main className="h-auto border border-black">
      <div className="mt-40 flex h-60 w-full items-center justify-center border border-black bg-slate-500">
        배너 이미지
      </div>
      <div className="my-3 flex justify-between">
        <div className="text-xl font-bold">이번 주 Hot People</div>
        <Link href="/people">전체보기</Link>
      </div>
      <div className="flex h-60 w-full items-center justify-center border border-black">
        핫 피플 섹션
      </div>
      <div className="my-3 flex justify-between">
        <div className="text-xl font-bold">이번 주 Hot Project</div>
        <Link href="/project">전체보기</Link>
      </div>
      <div className="flex flex-wrap gap-[9px] border border-black">
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
      </div>
    </main>
  );
}
