"use client";
import Button from "@/components/common/Button";
import PeopleCard from "@/components/mypage/PeopleCard";
import ProjectCard from "@/components/mypage/ProjectCard";
import { useState } from "react";

const tabMenu = [
  { id: 1, tabMenu: "people" },
  { id: 2, tabMenu: "project" },
];
export default function WatchListPage() {
  const [selectTab, setSelectTab] = useState<number>(1);
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex justify-center gap-[30px]">
        {tabMenu.map((tab) => (
          <Button
            key={tab.id}
            onClickHandler={() => setSelectTab(tab.id)}
            className={`w-[200px] border-b px-2 py-1 ${tab.id === selectTab ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
          >
            <div>{tab.tabMenu}</div>
          </Button>
        ))}
      </div>
      {selectTab === 1 && <PeopleCard />}
      {selectTab === 2 && <ProjectCard />}
    </div>
  );
}
