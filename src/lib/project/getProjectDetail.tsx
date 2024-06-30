export const getProjectDetail = async (projectId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}`,
    {
      next: {
        tags: ["project", "detail", projectId],
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch detailed project data");
  }

  return res.json();
};
