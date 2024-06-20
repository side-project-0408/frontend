export default function Banner() {
  return (
    <div className="relative my-[20px] flex h-60 w-full flex-col justify-center rounded-lg bg-[#FFEAE9] px-4 shadow-lg">
      <div className="ml-[30px] mr-[30px] flex gap-5">
        <p className="left-0 text-[45px]">👋🏻</p>
        <div>
          <div className="flex h-[24px] w-[53px] items-center justify-center rounded-lg bg-[#DE585C]">
            <p className="text-[11px] font-medium text-neutral-white-0">
              NOTICE
            </p>
          </div>
          <div>
            <span className="text-[25px] font-bold ">match-mate</span>
            <span className="text-[20px]"> 에서는</span>
          </div>
          <div>
            <span className="text-[20px]">마음에 맞는 </span>
            <span className="text-[25px] font-bold">people</span>
            <span className="whitespace-pre-line text-[20px]">{`들에게 직접 제안하고, \n 프로젝트 인원을 구성해 볼수 있어요 !`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
