"use client";
import HashTag from "../common/HashTag";
import newIcon from "../../../public/image/newIcon.svg";
import { GetPeoplesData } from "@/model/peoples";
import Image from "next/image";
import Link from "next/link";
import { blurLogoUrl } from "../../../public/blurLogoUrl";
import eyeIcon from "../../../public/image/eye.svg";
import PeopleLike from "./PeopleLike";

type Props = {
  contentData: GetPeoplesData;
};

export default function PeopleContentBox({ contentData }: Props) {
  const {
    userId,
    recent,
    userFileUrl,
    viewCount,
    position,
    nickname,
    softSkill,
    favoriteCount,
  } = contentData;
  console.log("contentData", contentData);

  return (
    <div className="flex gap-4">
      <Link
        href={`/people/${userId}`}
        className="relative flex h-[308px] w-[288px] flex-col rounded-2xl border-2 bg-neutral-white-0 p-5 shadow-lg transition-transform hover:-translate-y-1 hover:border-orange-500"
      >
        {recent && (
          <Image
            src={newIcon}
            alt="newIcon"
            className={`absolute top-0 ${recent ? "" : "hidden"}`}
          />
        )}
        <div
          className={`${recent ? "mt-[50px] gap-2" : "mt-0"} flex h-full flex-col justify-between `}
        >
          <div className="flex justify-between">
            <div className="relative h-10 w-10">
              <Image
                src={userFileUrl}
                alt="유저프로필"
                fill
                placeholder="blur"
                sizes="40px"
                blurDataURL={blurLogoUrl}
                className="rounded-full object-cover"
              />
            </div>
            <ul className="flex">
              <li className="flex w-full justify-between">
                <div className="flex items-center gap-1">
                  <PeopleLike userId={userId} />
                  <p>{favoriteCount}</p>
                  <Image src={eyeIcon} alt="eyeicon" />
                  <p>{viewCount}</p>
                </div>
              </li>
            </ul>
          </div>
          <ul className="leading-[2]">
            <li className="whitespace-pre-line text-sm">
              <h2>안녕하세요 👋🏻 </h2>
            </li>
            <li>
              <span className="text-sm">저는 </span>
              <span className="font-bold">{position} 개발자</span>
            </li>
            <li className="text-sm">
              <span className="font-bold">{nickname}</span>
              <span> 입니다.</span>
            </li>
          </ul>
          <div className="flex flex-col gap-2">
            {softSkill && (
              <>
                {softSkill.split(",").map((skill, i) => (
                  <HashTag text={skill} key={i} />
                ))}
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
