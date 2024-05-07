import { getPeopleDetails } from "@/service/getDatas";

type Props = {
  params: {
    slugs: string;
  };
};
export default function PeopleDetailPage({ params }: Props) {
  return <div>{params.slugs}</div>;
}

export async function generateStaticParams() {
  const getData = await getPeopleDetails();
  const slugs = getData?.map((content) => ({
    slug: content.projectId,
  }));
  return slugs;
}
