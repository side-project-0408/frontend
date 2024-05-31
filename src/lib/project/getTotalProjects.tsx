export const getTotalProjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects?page=0&size=10`,
    {
      next: {
        tags: ["project", "total"],
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch total projects data");
  }

  return res.json();
};
