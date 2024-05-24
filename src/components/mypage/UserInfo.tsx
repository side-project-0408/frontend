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
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import AddInput from "./AddInput";

interface Option {
  readonly label: string;
  readonly value: string;
}

const positionOption = [
  { id: 1, value: "프론트엔드" },
  { id: 2, value: "백엔드" },
  { id: 3, value: "디자이너" },
  { id: 4, value: "IOS" },
  { id: 5, value: "안드로이드" },
  { id: 6, value: "데브옵스" },
  { id: 7, value: "PM" },
  { id: 8, value: "기획자" },
];

const yearOption = [
  { id: 1, value: "0년" },
  { id: 2, value: "1년" },
  { id: 3, value: "2년" },
  { id: 4, value: "3년" },
  { id: 5, value: "4년" },
  { id: 6, value: "5년" },
  { id: 7, value: "6년" },
];
const option: readonly Option[] = [
  { label: "React", value: "React" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Vue", value: "Vue" },
  { label: "Nextjs", value: "Nextjs" },
  { label: "Nodejs", value: "Nodejs" },
  { label: "Java", value: "Java" },
  { label: "Spring", value: "Spring" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Nestjs", value: "Nestjs" },
];

type Props = {
  user: GetUserData;
};
type ImageFile = File | null;

export default function UserInfo({
  user,
  user: { userFileUrl, nickName, position, content, userId, techStack },
}: Props) {
  const queryClient = useQueryClient();

  const [image, setImage] = useState<ImageFile>(null);

  const [product, setProduct] = useState<GetUserData>(user);

  const toggleOffer = () => {
    setProduct((prev) => ({
      ...prev,
      employmentStatus: !prev.employmentStatus,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const updatedUser = {
        userId: product.userId,
        nickName: product.nickName,
        userFileUrl: image,
        techStack: product.techStack,
        position: product.position,
        employmentStatus: product.employmentStatus,
        year: product.year,
        links: product.links,
        alarmStatus: product.alarmStatus,
        content: product.content,
        softSkill: product.softSkill,
      };
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["get", "userinfo"],
      });
    },
  });

  const animatedComponents = makeAnimated();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    mutation.mutate(e);
  };

  const initialTechStack = techStack.split(",").map((item) => ({
    label: item,
    value: item,
  }));

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
    <form key={userId} onSubmit={handleSubmit} className="flex flex-col gap-7">
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
          <Image
            src={URL.createObjectURL(image)}
            className="rounded-full border"
            alt="유저이미지"
            width={68}
            height={68}
          />
        ) : (
          <Image
            className="rounded-full border"
            src={userFileUrl}
            alt="유저이미지"
            width={68}
            height={68}
          />
        )}
        <HiOutlinePencilSquare
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="bg-neutral-orange-500  text-neutral-white-0 absolute bottom-0 right-[159px] rounded-full border p-1 text-[24px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          닉네임
        </label>
        <input
          type="text"
          name="nickName"
          placeholder={nickName}
          onChange={handleChange}
          className="placeholder:text-neutral-black-800 h-[55px] w-[400px] rounded-md border pl-[8px]"
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
          title={user.year}
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
              defaultChecked
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
          {product.softSkill.split(",").map((skill, i) => (
            <div key={`skill${i}`}>
              <div className="bg-neutral-gray-50 flex w-fit items-center gap-2 rounded-xl border px-2 py-1">
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
              className="bg-neutral-gray-50 h-[30px] w-full rounded-xl border pl-[8px] placeholder:text-sm"
              placeholder="소프트 스킬을 수정해 보세요."
              ref={ref}
            />
            <FaCirclePlus
              onClick={() => {
                const inputValue = ref.current?.value;
                setProduct((prev) => ({
                  ...prev,
                  softSkill: product.softSkill
                    .split(",")
                    .concat(inputValue as string)
                    .join(","),
                }));
                // setSkillChange((prev) => [...prev, inputValue as string]);
                ref.current!.value = "";
              }}
              className="absolute right-[10px] top-[7px]"
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
          className="text-neutral-black-800 placeholder:text-neutral-black-800 h-[100px] w-[400px] rounded-md border p-[8px] placeholder:text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-sm font-bold">
          링크
        </label>
        <AddInput linkUrls={product.links} setProduct={setProduct} />
      </div>
      <div className="mt-[22px] flex items-center gap-6">
        <label htmlFor="employmentStatus" className="text-sm font-bold">
          제안 받기
        </label>
        <button
          onClick={toggleOffer}
          className={`relative h-[26px] w-[72px] rounded-md border p-2 hover:shadow-md ${product.employmentStatus ? "bg-neutral-orange-500" : "bg-neutral-white-0"}`}
        >
          <div
            className={` absolute left-[1px] top-[-1px] z-[1] h-[26px] w-[34px] rounded-lg transition-transform ${product.employmentStatus ? " bg-neutral-white-0 translate-x-[35px]" : "bg-neutral-gray-50 translate-x-0"}`}
          />
          <div className="absolute left-[9px] top-[5px] flex gap-[12px]">
            <span
              className={`text-xs ${product.employmentStatus && "text-neutral-white-0"} font-medium`}
            >
              ON
            </span>
            <span className="text-xs font-medium">OFF</span>
          </div>
        </button>
      </div>
      <button
        type="submit"
        className="bg-neutral-orange-500 text-neutral-white-0 h-[55px] rounded-2xl border font-bold"
      >
        프로필 저장
      </button>
    </form>
  );
}
