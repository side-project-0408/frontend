"use client";
import PeopleCard from "@/components/mypage/PeopleCard";
import ProjectCard from "@/components/mypage/ProjectCard";
import { useState } from "react";

const tabMenu = ["people", "project"];
export default function WatchListPage() {
  const [selectTab, setSelectTab] = useState<number>(0);
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex justify-center gap-[30px]">
        {tabMenu.map((tab, index) => (
          <button
            key={`tab${index}`}
            onClick={() => setSelectTab(index)}
            className={`hover:bg-color-orange hover:text-color-white w-[200px] border-b px-2 py-1 text-[15px] font-medium ${
              index === selectTab
                ? "text-neutral-orange-500"
                : "text-neutral-black-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectTab === 0 && <PeopleCard />}
      {selectTab === 1 && <ProjectCard />}
    </div>
  );
}
