"use client";
import { GetUserData } from "@/model/userInfo";
import Image from "next/image";
import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import SelectBox from "../common/SelectBox";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddInput from "./AddInput";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { SELECT_POSITION_OPTION, YEAR_OPTION } from "@/constants";
import getNicknameCheck from "@/lib/mypage/getNicknameCheck";
import GetOffer from "./GetOffer";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";
import { blurLogoUrl } from "../../../public/blurLogoUrl";

type Props = {
  user: GetUserData;
};

type ImageFile = File | null;

const MultiSelectBox = dynamic(() => import("../common/MultiSelectBox"));

export default function UserInfo({ user }: Props) {
  const queryClient = useQueryClient();
  const access_token = getCookie("access_token");
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const softSkillRef = useRef<HTMLInputElement>(null);

  const [dupliCheck, setDupliCheck] = useState(false);
  const [image, setImage] = useState<ImageFile>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emailCode, setEmailCode] = useState(false);
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

  const { data, refetch: refetchNicknameCheck } = useQuery({
    queryKey: [
      "get",
      "nicknameCheck",
      access_token as string,
      product.nickname,
    ],
    queryFn: getNicknameCheck,
    enabled: false,
  });

  const handleDupliCheck = async () => {
    const { data } = await refetchNicknameCheck();
    if (data?.data === true) {
      alert("사용할 수 있는 닉네임 입니다.");
      setDupliCheck(true);
    } else {
      alert("사용 불가능한 닉네임 입니다.");
      setDupliCheck(false);
    }
  };

  const handleTechStackChange = useCallback(
    (newValue: MultiValue<{ label: string; value: string }>) => {
      setProduct((prev) => ({
        ...prev,
        techStack: newValue.map((opt) => opt.value).join(","),
      }));
    },
    [product.techStack],
  );
  useEffect(() => {
    console.log("handleTextStackchage 렌더링 되었습니다.");
  }, [handleTechStackChange]);

  const defaultValues = techStack?.split(",").map((item) => ({
    label: item === "jsc" ? "javascript" : item,
    value: item,
  }));

  const emailCheckMutation = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verificationCode?email=${product.email}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    onSuccess() {
      alert(
        "이메일 인증 번호가 전송 되었습니다. 이메일 확인 후 인증번호를 입력해주세요",
      );
      setEmailCode(true);
    },
  });

  const handleEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    emailCheckMutation.mutate(e);
  };

  useEffect(() => {
    setSelectKey((prevKey) => prevKey + 1);
  }, [techStack]);

  useEffect(() => {
    setProduct(user ?? {});
  }, [user]);

  const toggleOffer = useCallback(() => {
    setProduct((prev) => ({
      ...prev,
      alarmStatus: !prev.alarmStatus,
    }));
  }, [product.alarmStatus]);

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      const dto = {
        nickname: product.nickname || nickname,
        userFileUrl: image || userFileUrl,
        techStack: product.techStack,
        position: product.position || position,
        employmentStatus: product.employmentStatus,
        year: product.year || year,
        links: product.links || links,
        alarmStatus: product.alarmStatus,
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!product.position || !product.techStack || !product.softSkill) {
      setErrorMessage(true);
    } else if (product.nickname !== nickname && !dupliCheck) {
      alert("닉네임 중복 체크가 필요합니다.");
    } else {
      mutation.mutate(e);
    }
  };

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
        <div className="relative h-[100px] w-[100px]">
          <Image
            className="cursor-pointer rounded-full border object-cover"
            src={image ? URL.createObjectURL(image) : userFileUrl}
            priority
            alt="유저이미지"
            fill
            placeholder="blur"
            blurDataURL={blurLogoUrl}
            sizes="100px"
          />
        </div>
        <HiOutlinePencilSquare
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="absolute  bottom-0 right-[159px] rounded-full border bg-neutral-orange-500 p-1 text-[24px] text-neutral-white-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-sm font-bold">
          닉네임
        </label>
        <input
          type="text"
          name="nickname"
          placeholder={nickname}
          onChange={handleChange}
          className="h-[55px] w-[400px] rounded-md border pl-[8px] placeholder:text-neutral-black-800"
        />
        <button
          onClick={handleDupliCheck}
          type="button"
          disabled={product.nickname === nickname}
          className={`w-fit rounded-md border p-2 text-xs transition hover:bg-neutral-orange-500 hover:text-neutral-white-0 disabled:bg-[#e7e7e7] disabled:text-white disabled:hover:bg-[#e7e7e7]`}
        >
          닉네임 중복 확인
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold">
          이메일
        </label>
        <input
          type="text"
          name="email"
          placeholder={email}
          onChange={handleChange}
          className="h-[55px] w-[400px] rounded-md border pl-[8px] placeholder:text-neutral-black-800"
        />
        <button
          onClick={handleEmail}
          type="button"
          className="w-fit rounded-md border p-2 text-xs transition hover:bg-neutral-orange-500 hover:text-neutral-white-0"
        >
          이메일 변경 하기
        </button>
        {emailCode && (
          <input
            type="text"
            className="h-[55px] w-[400px] rounded-md border pl-[8px] placeholder:text-neutral-black-800"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-bold">
          직무
        </label>
        <SelectBox
          options={SELECT_POSITION_OPTION}
          optSelected={product.position}
          title={position ? position : "포지션을 선택해 보세요!"}
          onClick={useCallback(
            (value) => {
              setProduct((prev) => ({ ...prev, position: value }));
            },
            [product.position],
          )}
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
          onClick={useCallback(
            (value) => {
              setProduct((prev) => ({ ...prev, year: value }));
            },
            [product.year],
          )}
          options={YEAR_OPTION}
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
        <MultiSelectBox
          defaultValues={defaultValues}
          selectKey={selectKey}
          multiSelectHandler={handleTechStackChange}
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
      <GetOffer alarmStatus={product.alarmStatus} offerHandler={toggleOffer} />
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
