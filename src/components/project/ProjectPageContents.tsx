"use client";

import { IProjectData, IProjects } from "@/model/projects";
import ProjectBox from "../common/ProjectBox";
import SelectBox from "../common/SelectBox";
import SelectStack from "../common/SelectStack";
import { SELECT_POSITION_OPTION } from "@/constants";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTotalProjects } from "@/lib/project/getTotalProjects";

export default function ProjectPageContents() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("RECENT");
  const [page, setPage] = useState(0);

  const { data: projects } = useQuery({
    queryKey: [
      "project",
      page,
      selectedTechStack.join(","),
      selectedPosition,
      sortType,
      searchKeyword,
    ],
    queryFn: () =>
      getTotalProjects(
        page,
        selectedTechStack.join(","),
        selectedPosition,
        sortType,
        searchKeyword,
      ),
  });

  const handleSelectPosition = (value: string) => {
    setSelectedPosition(value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("searchForm") as string;
    setSearchKeyword(keyword);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <SelectBox
            onClick={handleSelectPosition}
            options={SELECT_POSITION_OPTION}
            title="포지션"
            optSelected={selectedPosition}
          />
          <SelectStack
            optSelected={selectedTechStack}
            setOptSelected={setSelectedTechStack}
          />
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            name="searchForm"
            placeholder="검색창"
            className="h-[40px] rounded-2xl border border-neutral-gray-50 px-3 py-2"
          />
        </form>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setSortType("RECENT");
          }}
        >
          최신순
        </button>
        <button
          onClick={() => {
            setSortType("POPULAR");
          }}
        >
          인기순
        </button>
      </div>
      <div className="flex flex-wrap gap-[9px]">
        {projects?.data.map((project: IProjectData, i: number) => {
          return <ProjectBox key={`totalProject${i}`} project={project} />;
        })}
      </div>
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setPage((old) => old + 1);
          }}
          // disabled={!projects?.hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
