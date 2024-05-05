import Link from "next/link";
import newIcon from "../../../public/newIcon.svg";
import Image from "next/image";

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

export default function ProjectBox({ project }: Props) {
  let isRecent = project.recent;
  return (
    <Link
      href={`/project/${project.projectId}`}
      className="hover: trans relative w-[288px] rounded-[16px] border border-black px-[20px] pb-[15px] transition-transform hover:-translate-y-1 hover:border-neutral-500"
    >
      <Image
        src={newIcon}
        alt="This is new icon"
        className={`absolute top-0 ${isRecent ? "" : "hidden"}`}
      />
      <div className={`${isRecent ? "mt-[78px]" : "mt-[36px]"} flex gap-[1px]`}>
        {project.techStack.split(",").map((t, i) => (
          <div
            key={`techStack${i}`}
            className="rounded-xl bg-[#F2F4F8] px-[8px] py-0.5 text-[12px] font-bold text-[#3E86F5]"
          >
            {t}
          </div>
        ))}
      </div>
      <div className="mt-[19px] line-clamp-2 text-ellipsis text-[18px]	font-bold">
        {project.title}
      </div>
      <div className="mt-[8px] text-[12px] font-medium text-[#666666]">
        {`마감일 | ${project.deadLine.replaceAll("-", ".")}`}
      </div>
      <div className="mt-[16px] flex gap-[10px]">
        {project.techStack.split(",").map((t, i) => (
          <div
            key={`techStackImage${i}`}
            className="h-[32px] w-[32px] overflow-hidden rounded-full border border-black"
          >
            {t}
          </div>
        ))}
      </div>
      <hr className="mt-[27px]" />
      <div className="mt-[10px] border border-black">
        {`${project.createdAt.split("T")[0]}(for 정렬 순서 확인)`}
      </div>
    </Link>
  );
}
