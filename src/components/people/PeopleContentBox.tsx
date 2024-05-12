import HashTag from "../common/HashTag";
import newIcon from "../../../public/image/newIcon.svg";
import Link from "next/link";
import ImageBox from "../common/ImageBox";
import { GetPeoplesData } from "@/model/peoples";
import ContentBoxTop from "./ContentBoxTop";

type Props = {
  contentData: GetPeoplesData;
};
export default function PeopleContentBox({ contentData }: Props) {
  const data = contentData;
  return (
    <div className="flex gap-4">
      <Link
        key={data.userId}
        href="#"
        className="relative flex h-[308px] w-[288px] flex-col rounded-2xl border-2 p-5 transition-transform hover:-translate-y-1 hover:border-orange-500"
      >
        <ImageBox imageUrl={newIcon} className="top-0" />
        <div className="mt-[50px] flex h-full flex-col justify-between">
          <ContentBoxTop data={data} />
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
          {data.softSkill.split(",").map((skill, i) => (
            <HashTag text={skill} key={i} />
          ))}
        </div>
      </Link>
    </div>
  );
}
