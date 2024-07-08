"use client";
import Login from "@/components/common/Login";
import { Modal } from "@/components/common/Modal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <Modal onClickHandler={() => router.back()}>
      <Login />
    </Modal>
  );
}
