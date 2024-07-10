import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/common/Modal"), {
  ssr: false,
});
const Logout = dynamic(() => import("@/components/common/Logout"), {
  ssr: false,
});
export default function LogoutPage() {
  return (
    <Modal className="h-[219px] w-[370px]">
      <Logout />
    </Modal>
  );
}
