"use client";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed h-full w-full bg-[rgba(0,0,0,0.4)]">
      <div className="tr absolute left-[50%] top-[50%] h-[500px] w-[300px] translate-x-[-50%] translate-y-[-50%] border border-black">
        <button
          onClick={() => {
            router.back();
          }}
        >
          Close modal
        </button>
        <div className="px-[30px] py-[30px]">{children}</div>
      </div>
    </div>
  );
}
