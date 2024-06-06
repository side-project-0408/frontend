export const getHotProjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/hot?size=8`,
    {
      next: {
        tags: ["project", "hot"],
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hot project data");
  }

  return res.json();
};
