import Button from "@/components/common/Button";
import PeoplePosts from "@/components/people/PeoplePosts";
import getPeopleDetail from "@/lib/people/getPeopleDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: {
    userId: string;
  };
};
export default async function PeopleDetailPage({ params }: Props) {
  const { userId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get", "peoplesDetail", String(userId)],
    queryFn: getPeopleDetail,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <HydrationBoundary state={dehydratedState}>
        <Button back />
        <PeoplePosts userId={userId} />
      </HydrationBoundary>
    </div>
  );
}
