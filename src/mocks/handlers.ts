import { http, HttpResponse } from "msw";
import { hotPeople, peoples } from "./peopleData";

// `peoples?page=${0}&size=${10}&sort=${recent}`

// peoples?page=0&size=10&sort=RECENT'

export const handlers = [
  http.get("/peoples/hot/:tag", () => {
    return HttpResponse.json(hotPeople);
  }),
  http.get("/peoples", ({ request, params }) => {
    return HttpResponse.json(peoples);
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
        techStack: "react, java, ---",
        softSkill: "소통, 적극성, ---",
        links: "http://블로그주소",
        alarmStatus: true,
        content: "안녕하세요 구인 중입니다",
      },
    });
  }),
];

export default handlers;
