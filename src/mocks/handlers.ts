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
];

export default handlers;
