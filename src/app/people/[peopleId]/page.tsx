import BackButton from "@/components/common/BackButton";
import PeoplePosts from "@/components/people/PeoplePosts";
import getPeopleDetail from "@/lib/people/getPeopleDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: {
    peopleId: string;
  };
};
export default async function PeopleDetailPage({ params }: Props) {
  const { peopleId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get", "peoplesDetail", peopleId],
    queryFn: getPeopleDetail,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydratedState}>
        <BackButton />
        <PeoplePosts peopleId={peopleId} />
      </HydrationBoundary>
    </div>
  );
}
