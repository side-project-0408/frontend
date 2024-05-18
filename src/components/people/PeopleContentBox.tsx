import HashTag from "../common/HashTag";
import newIcon from "../../../public/image/newIcon.svg";
import Link from "next/link";
import { GetPeoplesData } from "@/model/peoples";
import ContentBoxTop from "./ContentBoxTop";
import Image from "next/image";

type Props = {
  contentData: GetPeoplesData;
};
export default function PeopleContentBox({ contentData }: Props) {
  const data = contentData;

  return (
    <div className="flex h-full gap-4">
      <Link
        key={data.userId}
        href={`/people/${data.userId}`}
        className="bg-neutral-white-0 relative flex h-full w-[288px] flex-col rounded-2xl border-2 p-5 transition-transform hover:-translate-y-1 hover:border-orange-500"
      >
        {data.recent && (
          <Image
            src={newIcon}
            alt="newIcon"
            className={`absolute top-0 ${data.recent ? "" : "hidden"}`}
          />
        )}
        <div
          className={`${data.recent ? "mt-[50px] gap-2" : "mt-0"} flex h-full flex-col justify-between `}
        >
          <div className="flex justify-between">
            <Image
              src={data.userFileUrl}
              alt="유저프로필"
              width={40}
              height={40}
              className="rounded-full bg-neutral-500"
            />
            <ContentBoxTop data={data} />
          </div>
          <ul className="leading-[2]">
            <li className="whitespace-pre-line text-sm">
              <h2>안녕하세요 👋🏻 </h2>
            </li>
            <li>
              <span className="text-sm">저는 </span>
              <span className="font-bold">{data.position} 개발자</span>
            </li>
            <li className="text-sm">
              <span className="font-bold">{data.nickname}</span>
              <span> 입니다.</span>
            </li>
          </ul>
          <div className="flex flex-col gap-2">
            {data.softSkill && (
              <>
                {data.softSkill.split(",").map((skill, i) => (
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
