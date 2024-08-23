import Link from "next/link";
import newIcon from "../../../public/image/newIcon.svg";
import heart from "../../../public/image/heart.svg";
import eye from "../../../public/image/eye.svg";
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
    deadline: string;
    viewCount: number;
    favoriteCount: number;
    createdAt: string;
    recent: boolean;
  };
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
        alt="This is new project label icon"
        className={`absolute top-0 ${isRecent ? "" : "hidden"}`}
      />
      <div className={`${isRecent ? "mt-[78px]" : "mt-[36px]"} flex gap-[1px]`}>
        {project.position.split(",").map((p, i) => (
          <div key={`position${i}`}>
            <BlueTextBox textToShow={p} textSize={"12px"} />
          </div>
        ))}
      </div>
      <div className="mt-[19px] line-clamp-2 text-ellipsis text-[18px]	font-bold">
        {project.title}
      </div>
      <div className="mt-[8px] text-[12px] font-medium text-[#666666]">
        {`마감일 | ${project.deadline.replaceAll("-", ".")}`}
      </div>
      <div className="mt-[16px] flex gap-[10px] overflow-hidden">
        {project.techStack.split(",").map((t, i) => (
          <TechStack key={`techStack${i}`} techStack={t} showText={false} />
        ))}
      </div>
      <hr className="mt-[27px]" />
      <div className="mt-[10px] flex justify-between">
        <section className="flex items-center gap-[8px]">
          <Image
            className="rounded-2xl"
            src={project.userFileUrl}
            alt="This is user profile image"
            width={30}
            height={30}
          />
          <div className="text-[14px] font-semibold">{project.nickname}</div>
        </section>
        <section className="flex items-center gap-[4px]">
          <Image src={heart} alt="This is heart icon" />
          <div>{project.favoriteCount}</div>
          <Image src={eye} alt="This is eye icon" className="ml-[4px]" />
          <div>{project.viewCount}</div>
        </section>
      </div>
    </Link>
  );
}
