"use client";
import { GetUserData } from "@/model/userInfo";
import Image from "next/image";
import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import SelectBox from "../common/SelectBox";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddInput from "./AddInput";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Option {
  readonly label: string;
  readonly value: string;
}

const positionOption = [
  { id: 1, value: "frontend" },
  { id: 2, value: "backend" },
  { id: 3, value: "designer" },
  { id: 4, value: "ios" },
  { id: 5, value: "android" },
  { id: 6, value: "devops" },
  { id: 7, value: "pm" },
];

const yearOption = [
  { id: 1, value: "0" },
  { id: 2, value: "1" },
  { id: 3, value: "2" },
  { id: 4, value: "3" },
  { id: 5, value: "4" },
  { id: 6, value: "5" },
  { id: 7, value: "6" },
];
const option: readonly Option[] = [
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

type Props = {
  user: GetUserData;
};

type ImageFile = File | null;

export default function UserInfo({ user }: Props) {
  const queryClient = useQueryClient();
  const access_token = getCookie("access_token");
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const softSkillRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageFile>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const {
    alarmStatus,
    content,
    employmentStatus,
    nickname,
    userFileUrl,
    favoriteCount,
    viewCount,
    softSkill,
    techStack,
    links,
    position,
    year,
    email,
  } = user ?? {};
  const [selectKey, setSelectKey] = useState(0);

  const [product, setProduct] = useState<GetUserData>(user ?? {});

  useEffect(() => {
    setSelectKey((prevKey) => prevKey + 1);
  }, [techStack]);

  useEffect(() => {
    setProduct(user ?? {});
  }, [user]);

  const toggleOffer = () => {
    setProduct((prev) => ({
      ...prev,
      alarmStatus: !prev.alarmStatus,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      const dto = {
        nickname: product.nickname || nickname,
        userFileUrl: image || userFileUrl,
        techStack: product.techStack || techStack,
        position: product.position || position,
        employmentStatus: product.employmentStatus,
        year: product.year || year,
        links: product.links || links,
        alarmStatus: product.alarmStatus || alarmStatus,
        content: product.content || content,
        softSkill: product.softSkill || softSkill,
        email: product.email || email,
      };
      formData.append(
        "dto",
        new Blob([JSON.stringify(dto)], { type: "application/json" }),
      );
      if (image) {
        formData.append("file", image, image.name);
      }

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["get", "userinfo"],
      });
    },
    onSuccess() {
      router.push("/mypage/user-info/alert");
    },
  });

  const animatedComponents = makeAnimated();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!product.position || !product.techStack || !product.softSkill) {
      setErrorMessage(true);
    } else {
      mutation.mutate(e);
    }
  };

  const initialTechStack = techStack?.split(",").map((item) => ({
    label: item,
    value: item,
  }));

  const handleLinkChange = (newLinks: string[]) => {
    setProduct((prev) => ({
      ...prev,
      links: newLinks.join(","),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setImage(files && files[0]);
      return;
    }
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-fit flex-col gap-7">
      <div className="relative flex flex-col items-center gap-2">
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleChange}
          ref={fileInputRef}
          className="hidden"
        />
        {image ? (
          <div className="h-[100px] w-[100px]">
            <Image
              src={URL.createObjectURL(image)}
              width={100}
              height={100}
              className="cursor-pointer rounded-full border"
              alt="유저이미지"
            />
          </div>
        ) : (
          <div className="h-[100px] w-[100px]">
            <Image
              className="cursor-pointer rounded-full border"
              src={userFileUrl}
              width={100}
              height={100}
              alt="유저이미지"
            />
          </div>
        )}
        <HiOutlinePencilSquare
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="absolute  bottom-0 right-[159px] rounded-full border bg-neutral-orange-500 p-1 text-[24px] text-neutral-white-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          닉네임
        </label>
        <input
          type="text"
          name="nickname"
          placeholder={nickname}
          onChange={handleChange}
          className="h-[55px] w-[400px] rounded-md border pl-[8px] placeholder:text-neutral-black-800"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          이메일
        </label>
        <input
          type="text"
          name="email"
          placeholder={email}
          onChange={handleChange}
          className="h-[55px] w-[400px] rounded-md border pl-[8px] placeholder:text-neutral-black-800"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          직무
        </label>
        <SelectBox
          options={positionOption}
          optSelected={product.position}
          title={position}
          onClick={(value) => {
            setProduct((prev) => ({ ...prev, position: value }));
          }}
          width={400}
          height={50}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          경력
        </label>
        <SelectBox
          onClick={(value) => {
            setProduct((prev) => ({ ...prev, year: value }));
          }}
          options={yearOption}
          title={year}
          optSelected={product.year}
          width={400}
          height={50}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          재직여부
        </label>
        <div className="flex gap-[100px]">
          <div className="flex gap-2">
            <label htmlFor="yes">네</label>
            <input
              type="radio"
              name="employment"
              value="yes"
              checked={product.employmentStatus === true}
              className="radio-custom"
              onChange={() => {
                setProduct((prev) => ({ ...prev, employmentStatus: true }));
              }}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="no">아니오</label>
            <input
              type="radio"
              name="employment"
              value="no"
              checked={product.employmentStatus === false}
              className="radio-custom"
              onChange={() => {
                setProduct((prev) => ({ ...prev, employmentStatus: false }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          기술스택
        </label>
        <Select
          instanceId="techStack"
          key={selectKey} // Force re-render by changing key
          defaultValue={initialTechStack}
          options={option}
          components={animatedComponents}
          isMulti
          onChange={(selectedOption) => {
            setProduct((prev) => ({
              ...prev,
              techStack: selectedOption.map((opt) => opt.value).join(","),
            }));
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
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          소프트 스킬
        </label>
        <div className="flex flex-col gap-2">
          {product.softSkill?.split(",").map((skill, i) => (
            <div key={`skill${i}`}>
              <div className="flex w-fit items-center gap-2 rounded-xl border bg-neutral-gray-50 px-2 py-1">
                <p className="text-sm">{skill}</p>
                <IoMdCloseCircle
                  onClick={() => {
                    setProduct((prev) => ({
                      ...prev,
                      softSkill: product.softSkill
                        .split(",")
                        .filter((opt) => opt !== skill)
                        .join(","),
                    }));
                  }}
                />
              </div>
            </div>
          ))}
          <div className="relative">
            <input
              type="text"
              className="h-[50px] w-full rounded-xl border bg-neutral-gray-50 pl-[8px] placeholder:text-sm"
              placeholder="소프트 스킬을 수정해 보세요."
              ref={softSkillRef}
            />
            <FaCirclePlus
              onClick={() => {
                const inputValue = softSkillRef.current?.value;
                setProduct((prev) => ({
                  ...prev,
                  softSkill: prev.softSkill
                    ? prev.softSkill
                        .split(",")
                        .concat(inputValue as string)
                        .join(",")
                    : inputValue!!,
                }));
                softSkillRef.current!.value = "";
              }}
              className="absolute right-[10px] top-[16px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          자기소개
        </label>
        <textarea
          name="content"
          onChange={handleChange}
          placeholder={content}
          className="h-[100px] w-[400px] rounded-md border p-[8px] text-neutral-black-800 placeholder:text-sm placeholder:text-neutral-black-800"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-sm font-bold">
          링크
        </label>
        <AddInput linkUrls={links} setLink={handleLinkChange} />
      </div>
      <div className="mt-[22px] flex items-center gap-6">
        <label htmlFor="alarmStatus" className="text-sm font-bold">
          제안 받기
        </label>
        <button
          onClick={toggleOffer}
          className={`relative h-[26px] w-[72px] rounded-md border p-2 hover:shadow-md ${product.alarmStatus ? "bg-neutral-orange-500" : "bg-neutral-white-0"}`}
        >
          <div
            className={` absolute left-[1px] top-[-1px] z-[1] h-[26px] w-[34px] rounded-lg transition-transform ${product.alarmStatus ? " translate-x-[35px] bg-neutral-white-0" : "translate-x-0 bg-neutral-gray-50"}`}
          />
          <div className="absolute left-[9px] top-[5px] flex gap-[12px]">
            <span
              className={`text-xs ${product.alarmStatus && "text-neutral-white-0"} font-medium`}
            >
              ON
            </span>
            <span className="text-xs font-medium">OFF</span>
          </div>
        </button>
      </div>
      {errorMessage && (
        <p className="text-[red]">기술스택 직무 소프트스킬은 필수값입니다.</p>
      )}
      <button
        type="submit"
        className="h-[55px] rounded-2xl border bg-neutral-orange-500 font-bold text-neutral-white-0"
      >
        프로필 저장
      </button>
    </form>
  );
}
