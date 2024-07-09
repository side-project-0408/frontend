import { GetUserData } from "@/model/userInfo";

type Props = {
  offerHandler: () => void;
  product: GetUserData;
};
export default function GetOffer({ offerHandler, product }: Props) {
  return (
    <div className="mt-[22px] flex items-center gap-6">
      <label htmlFor="alarmStatus" className="text-sm font-bold">
        제안 받기
      </label>
      <button
        type="button"
        onClick={offerHandler}
        className={`relative h-[26px] w-[72px] rounded-md border p-2 hover:shadow-md ${product.alarmStatus ? "bg-neutral-orange-500" : "bg-neutral-white-0"}`}
      >
        <div
          className={` absolute left-[1px] top-[-1px] z-[1] h-[26px] w-[34px] rounded-lg transition-transform ${product.alarmStatus ? " translate-x-[35px] bg-neutral-white-0" : "translate-x-0 bg-neutral-gray-50"}`}
        />
        <div className="absolute left-[9px] top-[5px] flex gap-[12px]">
          <span
            className={`text-xs ${product.alarmStatus && "text-neutral-white-0"} font-medium`}
          >
            ON
          </span>
          <span className="text-xs font-medium">OFF</span>
        </div>
      </button>
    </div>
  );
}
