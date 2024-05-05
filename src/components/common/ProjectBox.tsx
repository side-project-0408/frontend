import Link from "next/link";
import newIcon from "../../../public/newIcon.svg";
import Image from "next/image";
import TechStack from "./TechStack";
import BlueTextBox from "./BlueTextBox";

type Props = {
  project: {
    projectId: number;
    nickname: string;
    userFileUrl: string;
    title: string;
    techStack: string;
    position: string;
    deadLine: string;
    viewCount: number;
    favoriteCount: number;
    createdAt: string;
    recent: boolean;
  };
};

const convertPositionEngToKor = (posEng: string) => {
  let posKr = "";
  switch (posEng) {
    case "frontend":
      posKr = "프론트엔드";
      break;
    case "backend":
      posKr = "백엔드";
      break;
    case "designer":
      posKr = "디자이너";
      break;
    case "pm":
      posKr = "PM";
      break;
    case "ios":
      posKr = "IOS";
      break;
    case "android":
      posKr = "안드로이드";
      break;
    case "devops":
      posKr = "데브옵스";
      break;
    default:
      posKr = "None";
      break;
  }
  return posKr;
};

export default function ProjectBox({ project }: Props) {
  let isRecent = project.recent;
  return (
    <Link
      href={`/project/${project.projectId}`}
      className={`hover: trans relative w-[288px] rounded-[16px] border ${isRecent ? "border-[#FF800B]" : ""} px-[20px] pb-[15px] shadow-lg transition-transform hover:-translate-y-1`}
    >
      <Image
        src={newIcon}
        alt="This is new icon"
        className={`absolute top-0 ${isRecent ? "" : "hidden"}`}
      />
      <div className={`${isRecent ? "mt-[78px]" : "mt-[36px]"} flex gap-[1px]`}>
        {project.position.split(", ").map((p, i) => (
          <div key={`position${i}`}>
            <BlueTextBox
              textToShow={convertPositionEngToKor(p)}
              textSize={"12px"}
            />
          </div>
        ))}
      </div>
      <div className="mt-[19px] line-clamp-2 text-ellipsis text-[18px]	font-bold">
        {project.title}
      </div>
      <div className="mt-[8px] text-[12px] font-medium text-[#666666]">
        {`마감일 | ${project.deadLine.replaceAll("-", ".")}`}
      </div>
      <div className="mt-[16px] flex gap-[10px] overflow-hidden">
        {project.techStack.split(", ").map((t, i) => (
          <TechStack key={`techStack${i}`} techStack={t} showText={false} />
        ))}
      </div>
      <hr className="mt-[27px]" />
      <div className="mt-[10px] border border-black">
        {`${project.createdAt.split("T")[0]}(for 정렬 순서 확인)`}
      </div>
    </Link>
  );
}
