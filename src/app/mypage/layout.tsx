import MypageNav from "@/components/mypage/MypageNav";

type Props = {
  children: React.ReactNode;
};

export default function MyPageLayout({ children }: Props) {
  return (
    <div className="mypage-tab">
      <nav className="flex flex-col gap-4">
        <MypageNav />
      </nav>
      <section>
        <div>{children}</div>
      </section>
    </div>
  );
}
