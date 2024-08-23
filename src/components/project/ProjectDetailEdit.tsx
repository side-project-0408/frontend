"use client";

import { IProjectDetailData } from "@/model/projects";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetUsers } from "@/model/userInfo";
import getUserInfo from "@/lib/mypage/getUserInfo";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from "../common/SelectBox";
import { SELECT_OPTION, SELECT_POSITION_OPTION } from "@/constants";
import { useRouter } from "next/navigation";

type Prop = {
  detailedProject?: IProjectDetailData | undefined;
};

type ImageFile = File | null;
type ProjectDate = Date | null;

export default function ProjectDetailEdit({ detailedProject }: Prop) {
  const refFocus = useRef<HTMLInputElement>(null);
  const [projectName, setProjectName] = useState(
    detailedProject ? detailedProject.title : "",
  );
  const [projectDesc, setProjectDesc] = useState(
    detailedProject ? detailedProject.description : "",
  );

  useEffect(() => {
    refFocus.current?.focus();
  }, []);

  const [projectImage, setProjectImage] = useState<ImageFile>(null);
  const [projectDate, setProjectDate] = useState<ProjectDate>(new Date());

  const [items, setItems] = useState(
    detailedProject
      ? detailedProject.recruit
      : [{ position: "", currentCount: 0, targetCount: 0 }],
  );

  const [projectTechStack, setProjectTechStack] = useState(
    detailedProject ? detailedProject.techStack : "",
  );

  const router = useRouter();

  const projectImageInputRef = useRef<HTMLInputElement>(null);

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
    if (items.length < 2) {
      alert("최소 1개의 포지션이 필요합니다.");
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      alert("프로젝트가 삭제되었습니다.");
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
      try {
        const formData = new FormData();

        const dto = {
          title: projectName,
          projectFileUrl: projectImage
            ? projectImage
            : detailedProject?.projectFileUrl,
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
        } else {
          const currentImageUrl = detailedProject?.projectFileUrl as string;
          const response = await fetch(currentImageUrl);

          if (!response.ok) {
            throw new Error("Error occurs while fetching current image url...");
          }

          const blob = await response.blob();

          const parts = currentImageUrl.split("/");
          const fileName = parts[parts.length - 1];
          const currentImageFile = new File([blob], fileName, {
            type: blob.type,
          });

          formData.append("file", currentImageFile, currentImageFile.name);
        }

        // console.log("dto", dto);

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
        alert("프로젝트가 저장되었습니다.");
      } catch (error) {
        console.log("Error while saving project: ", error);
      }
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (
      !projectName.length ||
      !projectDesc.length ||
      !projectTechStack.length ||
      !items[0].position.length ||
      (!projectImage && !detailedProject)
    ) {
      alert("비어있는 칸이 있습니다. 모든 칸을 채워주세요.");
    } else {
      mutation.mutate(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[800px]">
      <input
        ref={refFocus}
        type="text"
        name="projectName"
        value={projectName}
        onChange={(e) => handleNameChange(e)}
        className="mt-[20px] h-[45px] w-full rounded-md border border-[#C1C1C1] pl-[10px] text-[25px] font-semibold"
        placeholder="프로젝트 제목을 입력해주세요."
      />
      <div className="mt-[20px] flex gap-[20px]">
        <Image
          className="rounded-full"
          src={user?.data.userFileUrl as string}
          alt="This is user profile image"
          width={60}
          height={60}
          style={{ maxHeight: "60px", maxWidth: "60px" }}
        />
        <div>
          <div className="text-[24px] font-normal">{user?.data.nickname}</div>
          <div className="flex gap-[10px] text-[16px] font-normal text-[#666666]">
            <div>마감일 |</div>
            <div className="border border-[#C1C1C1]">
              <DatePicker
                selected={projectDate}
                onChange={(date) => {
                  setProjectDate(date);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[20px] mt-[40px] text-[22px] font-bold">모집 인원</div>
      <div className="flex max-w-[900px] flex-wrap gap-[30px]">
        {items.map((item, idx) => {
          return (
            <div
              key={`projectRecruit${idx}`}
              className="flex items-center justify-center gap-[20px]"
            >
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
              <div className="flex items-center gap-[10px] text-[18px] font-semibold">
                <p>모집된 인원</p>
                <button
                  onClick={() => handleCountChange(idx, "current", -1)}
                  type="button"
                >
                  <CiCircleMinus />
                </button>
                <span>{item.currentCount}</span>
                <button
                  onClick={() => handleCountChange(idx, "current", 1)}
                  type="button"
                >
                  <CiCirclePlus />
                </button>
              </div>
              <div className="flex items-center gap-[10px] text-[18px] font-semibold">
                <p>최대 모집 인원</p>
                <button
                  onClick={() => handleCountChange(idx, "target", -1)}
                  type="button"
                >
                  <CiCircleMinus />
                </button>
                <span>{item.targetCount}</span>
                <button
                  type="button"
                  onClick={() => handleCountChange(idx, "target", 1)}
                >
                  <CiCirclePlus />
                </button>
              </div>
              <button
                className="h-[30px] w-[34px] rounded-lg bg-gray-200 text-[14px] font-semibold"
                onClick={() => removeItem(idx)}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="mt-[20px] flex h-[50px] w-[100px] items-center justify-center rounded-md bg-[#FF800B] text-[14px] font-normal text-white"
        onClick={(e) => addItem(e)}
      >
        포지션 추가
      </button>
      <div className="flex flex-col gap-2">
        <div className="mb-[20px] mt-[40px] text-[22px] font-bold">
          사용 기술
        </div>
        <div className="max-w-fit">
          <Select
            instanceId="techStack"
            // key={selectKey} // Force re-render by changing key
            defaultValue={initialTechStack}
            options={SELECT_OPTION}
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
      </div>
      <div className="mb-[20px] mt-[40px] text-[22px] font-bold">
        프로젝트 소개
      </div>
      {!projectImage && !detailedProject ? (
        <div>아래 버튼을 통해 이미지를 입력해주세요.</div>
      ) : (
        <Image
          src={
            projectImage
              ? URL.createObjectURL(projectImage)
              : (detailedProject?.projectFileUrl as string)
          }
          width={500}
          height={500}
          className="rounded-md"
          alt="프로젝트 소개 이미지"
        />
      )}
      <button
        className="mt-[50px] flex h-[50px] items-center justify-center rounded-md bg-[#FF800B] px-[20px] text-[14px] font-normal text-white"
        onClick={(e) => {
          e.preventDefault();
          projectImageInputRef.current?.click();
        }}
      >
        이미지 변경하기
      </button>
      <input
        type="file"
        accept="image/*"
        name="projectImageFile"
        onChange={(e) => handleImageChange(e)}
        ref={projectImageInputRef}
        className="hidden"
      />
      <textarea
        placeholder="프로젝트에 관해 설명해주세요."
        name="introduce"
        id="introduce"
        className="mt-[50px] h-[375px] w-[815px] rounded-2xl border border-[#C1C1C1] p-[10px]"
        onChange={(e) => handleDescChange(e)}
        value={projectDesc}
      />
      <div className="flex gap-[20px]">
        <button
          className="mt-[50px] flex h-[50px] items-center justify-center rounded-md bg-gray-500 px-[20px] text-[14px] font-normal text-white"
          onClick={handleProjectDelete}
        >
          삭제하기
        </button>
        <button
          className="mt-[50px] flex h-[50px] items-center justify-center rounded-md bg-[#FF800B] px-[20px] text-[14px] font-normal text-white"
          type="submit"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
