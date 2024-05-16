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
];

export default handlers;
