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
import SelectBox from "../common/SelectBox";
import { SELECT_POSITION_OPTION } from "@/constants";
import { useRouter } from "next/navigation";

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

  const [items, setItems] = useState([
    { position: "", currentCount: 0, targetCount: 0 },
  ]);

  const [projectTechStack, setProjectTechStack] = useState(
    detailedProject ? detailedProject.techStack : "",
  );

  const router = useRouter();

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

  const handlePositionChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].position = value;
    setItems(newItems);
  };

  const handlePositionChangeWithCheck = (index: number, value: string) => {
    const newPosition = value;
    const currentPositions = items.map((item) => item.position);

    if (currentPositions.includes(newPosition)) {
      alert("이미 추가된 포지션입니다.");
      handlePositionChange(index, "");
      return;
    }

    handlePositionChange(index, value);
  };

  const handleCountChange = (
    index: number,
    countType: string,
    change: number,
  ) => {
    const newItems = [...items];
    if (newItems[index].position === "") {
      alert("포지션을 선택해주세요.");
      return;
    }
    if (newItems[index].currentCount < 0 || newItems[index].targetCount < 0) {
      alert("0보다 작을 수 없습니다.");
      return;
    }
    if (countType === "current") {
      if (
        change > 0 &&
        newItems[index].currentCount > newItems[index].targetCount - 1
      ) {
        alert("모집 인원을 초과할 수 없습니다.");
        return;
      }
      newItems[index].currentCount += change;
    } else if (countType === "target") {
      newItems[index].targetCount += change;
    }
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { position: "", currentCount: 0, targetCount: 0 }]);
  };

  const handleProjectDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${detailedProject?.projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      console.log("삭제 완료");
      router.push("/project");
    } catch (err) {
      console.log("삭제 에러", err);
    }
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
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      const dto = {
        title: projectName,
        deadline: projectDate?.toISOString().split("T")[0],
        softSkill: "시간 관리, 직업 윤리",
        importantQuestion: "주 1회 회의",
        techStack: projectTechStack,
        description: projectDesc,
        recruit: items,
      };

      formData.append(
        "dto",
        new Blob([JSON.stringify(dto)], { type: "application/json" }),
      );

      if (projectImage) {
        formData.append("file", projectImage, projectImage.name);
      }

      // console.log("dto", dto);
      // console.log("file", projectImage);
      console.log(
        detailedProject?.projectId
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${detailedProject?.projectId}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
      );

      await fetch(
        detailedProject?.projectId
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${detailedProject?.projectId}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
        {
          method: detailedProject?.projectId ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        },
      );
      console.log("변경 성공!");
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
      {items.map((item, idx) => {
        return (
          <div key={`projectRecruit${idx}`} className="flex">
            <SelectBox
              options={SELECT_POSITION_OPTION}
              optSelected={item.position}
              title={"select position"}
              onClick={(value) => {
                handlePositionChangeWithCheck(idx, value);
              }}
              width={150}
              height={50}
              className="rounded-md"
            />
            <div className="flex w-[30px] items-center">
              <button onClick={() => handleCountChange(idx, "current", -1)}>
                -
              </button>
              <span>{item.currentCount}</span>
              <button onClick={() => handleCountChange(idx, "current", 1)}>
                +
              </button>
            </div>
            <div className="flex w-[30px] items-center">
              <button onClick={() => handleCountChange(idx, "target", -1)}>
                -
              </button>
              <span>{item.targetCount}</span>
              <button onClick={() => handleCountChange(idx, "target", 1)}>
                +
              </button>
            </div>
            <button onClick={() => removeItem(idx)}>삭제</button>
          </div>
        );
      })}
      <button onClick={addItem}>Add Item</button>
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
