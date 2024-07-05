import Image from "next/image";

export default function Loading() {
  return (
    <div className="global-loader">
      <div className="spinner">
        <Image src="/logo.svg" alt="로고" width={50} height={50} />
      </div>
    </div>
  );
}
