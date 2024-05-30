import { bypass, http, HttpResponse } from "msw";
import { hotPeople, peoples, posts, users } from "./peopleData";

// `peoples?page=${0}&size=${10}&sort=${recent}`

// peoples?page=0&size=10&sort=RECENT'

export const handlers = [
  http.get("/peoples/hot/:tag", () => {
    return HttpResponse.json(hotPeople);
  }),
  http.get("/peoples", ({ request, params }) => {
    return HttpResponse.json(peoples);
  }),
  http.get("/users", () => {
    return HttpResponse.json(users);
  }),
  http.patch("/users", async ({ request }) => {
    return HttpResponse.text("success?");
  }),
  http.get("/posts", async () => {
    return HttpResponse.json(posts);
  }),
  http.get("/peoples/:peopleId", ({ params }) => {
    const { peopleId } = params;
    return HttpResponse.json({
      result: "success",
      data: {
        userId: `${peopleId}`,
        nickname: "닉네임",
        favoriteCount: 223,
        viewCount: 336,
        position: "Backend",
        userFileUrl: "/Users/user/Desktop/pictures/userPicture.jpg",
        year: "경력없음",
        techStack: "react,Java, ---",
        softSkill: "소통, 적극성, ---",
        links: "http://블로그주소",
        alarmStatus: true,
        content: "안녕하세요 구인 중입니다",
      },
    });
  }),
  http.post("/users/favorite/:userId", () => {
    return HttpResponse.json({
      favorit: true,
    });
  }),
  http.delete("/users/favorite/:userId", () => {
    return HttpResponse.text(JSON.stringify("찜하기 삭제"));
  }),
  // 내가 찜한 사람 목록 확인
  http.get("/users/favorite", () => {
    return HttpResponse.json({
      result: "success",
      data: [
        {
          userId: 1,
          nickName: "닉네임bb (중복체크 필요)",
          userFileUrl: "/Users/user/Desktop/prictures/userPicture.jpg",
          techStack: "java, spring...",
          position: "FrontEnd",
          employmentStatus: false,
          year: "경력없음",
          links: "http://블로그주소",
          alarmStatus: true,
          content: "안녕하세요 구인 중입니다",
          softSkill: "소통 능력, 팀원간의 화합, ---",
          email: "aaa@gmail.com",
        },
      ],
    });
  }),
];

export default handlers;
