"use client";
import HashTag from "./HashTag";
import newIcon from "../../../public/image/newIcon.svg";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import IconTextBox from "./IconTextBox";
import heartIcon from "../../../public/image/heart.svg";
import eyeIcon from "../../../public/image/eye.svg";
const MOCKDATA = [
  {
    userId: 1,
    nickname: "닉네임",
    favoriteCount: 5,
    viewCount: 11,
    position: "frontend",
    softSkill: "소통을 잘해요, 시간이여유로워요",
    techStack: "react, java, ---",
    userFileUrl: "/Users/user/Desktop/prictures/userPicture.jpg",
  },
  {
    userId: 2,
    nickname: "닉네임",
    favoriteCount: 13,
    viewCount: 40,
    position: "Backend",
    softSkill: "소통을 잘해요, 시간이여유로워요",
    techStack: "react, java, ---",
    userFileUrl: "/Users/user/Desktop/prictures/userPicture.jpg",
  },
  {
    userId: 3,
    nickname: "닉네임",
    favoriteCount: 23,
    viewCount: 20,
    position: "designer",
    softSkill: "소통을 잘해요, 시간이여유로워요",
    techStack: "react, java, ---",
    userFileUrl: "/Users/user/Desktop/prictures/userPicture.jpg",
  },
];

export default function ContentBox() {
  return (
    <>
      <div className="flex gap-4">
        {MOCKDATA.map(
          ({
            userId,
            nickname,
            softSkill,
            position,
            favoriteCount,
            viewCount,
          }) => (
            <Link
              key={userId}
              href="#"
              className="w-[288px] h-[308px] rounded-2xl p-5 flex relative flex-col transition-transform hover:-translate-y-1 hover:border-neutral-500 border-2"
            >
              <Image src={newIcon} alt="newIcon" className="absolute top-0" />
              <div className="mt-[50px] flex flex-col justify-between h-full">
                <ul className="flex">
                  <li className="flex justify-between w-full">
                    <FaUserCircle className="text-[#dedede] text-5xl" />
                    <div className="flex items-center gap-1">
                      <button onClick={() => console.log("찜하기")}>
                        <IconTextBox icon={heartIcon} count={favoriteCount} />
                      </button>
                      <IconTextBox icon={eyeIcon} count={viewCount} />
                    </div>
                  </li>
                </ul>
                <ul className="leading-[2]">
                  <li className="text-sm whitespace-pre-line">
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
                {softSkill.split(",").map((skill, i) => (
                  <HashTag text={skill} key={i} />
                ))}
              </div>
            </Link>
          )
        )}
      </div>
    </>
  );
}
