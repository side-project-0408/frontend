import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { hotPeople, peoples } from "./api/people";

// `peoples?page=${0}&size=${10}&sort=${recent}`

// peoples?page=0&size=10&sort=RECENT'

export const handlers = [
  http.get("/api/peoples/hot", () => {
    return HttpResponse.json(hotPeople);
  }),
  http.get("/api/peoples", ({ request }) => {
    const url = new URL(request.url);

    return HttpResponse.json(peoples);
  }),
];

export default handlers;
