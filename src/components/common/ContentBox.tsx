"use client";
import HashTag from "./HashTag";
import newIcon from "../../../public/image/newIcon.svg";
import Image from "next/image";
// import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import IconTextBox from "./IconTextBox";
import heartIcon from "../../../public/image/heart.svg";
import eyeIcon from "../../../public/image/eye.svg";
import ImageBox from "./ImageBox";
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
              className="relative flex h-[308px] w-[288px] flex-col rounded-2xl border-2 p-5 transition-transform hover:-translate-y-1 hover:border-orange-500"
            >
              {/* <Image src={newIcon} alt="newIcon" className="absolute top-0" /> */}
              <ImageBox imageUrl={newIcon} className="top-0" />
              <div className="mt-[50px] flex h-full flex-col justify-between">
                <ul className="flex">
                  <li className="flex w-full justify-between">
                    {/* <FaUserCircle className="text-5xl text-[#dedede]" /> */}
                    <div className="flex items-center gap-1">
                      <button onClick={() => console.log("찜하기")}>
                        <IconTextBox icon={heartIcon} count={favoriteCount} />
                      </button>
                      <IconTextBox icon={eyeIcon} count={viewCount} />
                    </div>
                  </li>
                </ul>
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
                {softSkill.split(",").map((skill, i) => (
                  <HashTag text={skill} key={i} />
                ))}
              </div>
            </Link>
          ),
        )}
      </div>
    </>
  );
}
