export const getTotalProjects = async (
  page = 0,
  techStack = "",
  position = "",
  sort = "",
  keyword = "",
  size = 20,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects?page=${page}&size=${size}&techStack=${techStack}&position=${position}&sort=${sort}&keyword=${keyword}`,
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
