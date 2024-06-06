"use client";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 z-[4] h-full w-full bg-[rgba(0,0,0,0.4)]">
      <div className="absolute left-[50%] top-[50%] h-[500px] w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white">
        <div className="flex justify-end">
          <button
            type="button"
            className="px-[20px] py-[20px]"
            onClick={() => {
              router.back();
            }}
          >
            X
          </button>
        </div>
        <div className="px-[30px] py-[30px]">{children}</div>
      </div>
    </div>
  );
}
