"use client";

import { IProjectDetailData } from "@/model/projects";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetUsers } from "@/model/userInfo";
import getUserInfo from "@/lib/mypage/getUserInfo";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Prop = {
  detailedProject?: IProjectDetailData | undefined;
};

type ImageFile = File | null;
type ProjectDate = Date | null;

const option = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Nextjs", value: "nextjs" },
  { label: "Java", value: "java" },
  { label: "Spring", value: "spring" },
  { label: "Nodejs", value: "nodejs" },
  { label: "Nestjs", value: "nestjs" },
  { label: "Go", value: "go" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Express", value: "express" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Python", value: "python" },
  { label: "Diango", value: "Diango" },
  { label: "php", value: "php" },
  { label: "GraphQL", value: "graphql" },
  { label: "Firebase", value: "firebase" },
  { label: "Flutter", value: "flutter" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "ReactNative", value: "reactnative" },
  { label: "Unity", value: "unity" },
  { label: "AWS", value: "aws" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Docker", value: "docker" },
  { label: "Git", value: "git" },
  { label: "Figma", value: "figma" },
  { label: "Zeplin", value: "zeplin" },
  { label: "Jest", value: "jest" },
];

export default function ProjectDetailEdit({ detailedProject }: Prop) {
  const [projectName, setProjectName] = useState(
    detailedProject ? detailedProject.title : "",
  );
  const [projectDesc, setProjectDesc] = useState(
    detailedProject ? detailedProject.description : "",
  );

  // const [selectKey, setSelectKey] = useState(0);

  const [projectImage, setProjectImage] = useState<ImageFile>(null);

  const [projectDate, setProjectDate] = useState<ProjectDate>(new Date());

  const [projectTechStack, setProjectTechStack] = useState(
    detailedProject ? detailedProject.techStack : "",
  );

  const access_token = getCookie("access_token") as string;

  const { data: user } = useQuery<
    GetUsers,
    Error,
    GetUsers,
    [string, string, string]
  >({
    queryKey: ["get", "userinfo", access_token],
    queryFn: getUserInfo,
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDesc(e.target.value);
  };

  const handleProjectDelete = () => {
    alert("삭제하기");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setProjectImage(files && files[0]);
  };

  const initialTechStack = detailedProject?.techStack
    .split(",")
    .map((item) => ({
      label: item,
      value: item,
    }));

  const animatedComponents = makeAnimated();

  const mutation = useMutation({
    // TODO: cors 문제 해결 필요
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const sendingData = {
        dto: {
          title: projectName,
          deadline: projectDate?.toISOString().split("T")[0],
          softSkill: "",
          importantQuestion: "",
          techStack: projectTechStack,
          description: projectDesc,
          recruit: [
            {
              position: "frontend",
              currentCount: 1,
              targetCount: 3,
            },
          ],
        },
        file: projectImage,
      };
      console.log("sendingData", sendingData);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${detailedProject?.projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(sendingData),
        },
      );
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    mutation.mutate(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="projectName"
        value={projectName}
        onChange={(e) => handleNameChange(e)}
        className="border border-black"
        placeholder="프로젝트 제목을 입력해주세요."
      />
      <div className="flex gap-[20px]">
        <Image
          className="rounded-2xl"
          src={user?.data.userFileUrl as string}
          alt="This is user profile image"
          width={30}
          height={30}
        />
        <div className="">
          <div>{user?.data.nickname}</div>
          <div className="flex">
            <div>마감일</div>
            <DatePicker
              selected={projectDate}
              onChange={(date) => {
                setProjectDate(date);
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-[20px] font-bold">모집 인원</div>
      {/* TODO: 모집인원 추가*/}
      <div className="flex flex-col gap-2">
        <div className="text-[20px] font-bold">사용 기술</div>
        <Select
          instanceId="techStack"
          // key={selectKey} // Force re-render by changing key
          defaultValue={initialTechStack}
          options={option}
          components={animatedComponents}
          isMulti
          onChange={(selectedOption) => {
            setProjectTechStack(
              selectedOption.map((opt) => opt.value).join(","),
            );
          }}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "400px",
              maxWidth: "400px",
              minHeight: "55px",
              display: "flex",
              flexWrap: "nowrap",
            }),
          }}
        />
      </div>
      <div className="text-[20px] font-bold">프로젝트 소개</div>
      <input
        type="file"
        accept="image/*"
        name="projectImageFile"
        onChange={(e) => handleImageChange(e)}
        // ref={fileInputRef}
        // className="hidden"
      />
      <textarea
        placeholder="프로젝트에 관해 설명해주세요."
        name="introduce"
        id="introduce"
        className="border border-black"
        onChange={(e) => handleDescChange(e)}
        value={projectDesc}
      />
      <div>
        <button onClick={handleProjectDelete}>삭제하기</button>
        <button type="submit">저장하기</button>
      </div>
    </form>
  );
}
