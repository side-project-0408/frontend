import { GetUserData } from "@/model/userInfo";
import { memo } from "react";

type Props = {
  offerHandler: () => void;
  alarmStatus: boolean;
};
export function GetOffer({ offerHandler, alarmStatus }: Props) {
  return (
    <div className="mt-[22px] flex items-center gap-6">
      <label htmlFor="alarmStatus" className="text-sm font-bold">
        제안 받기
      </label>
      <button
        type="button"
        onClick={offerHandler}
        className={`relative h-[26px] w-[72px] rounded-md border p-2 hover:shadow-md ${alarmStatus ? "bg-neutral-orange-500" : "bg-neutral-white-0"}`}
      >
        <div
          className={` absolute left-[1px] top-[-1px] z-[1] h-[26px] w-[34px] rounded-lg transition-transform ${alarmStatus ? " translate-x-[35px] bg-neutral-white-0" : "translate-x-0 bg-neutral-gray-50"}`}
        />
        <div className="absolute left-[9px] top-[5px] flex gap-[12px]">
          <span
            className={`text-xs ${alarmStatus && "text-neutral-white-0"} font-medium`}
          >
            ON
          </span>
          <span className="text-xs font-medium">OFF</span>
        </div>
      </button>
    </div>
  );
}

export default memo(GetOffer);
