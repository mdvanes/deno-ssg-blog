import type { APIRequest } from "https://deno.land/x/aleph/types.ts";

const mockResponse = [
  {
    title: "Tika NERding",
    pubDate: "",
    content: "",
  },
  {
    title: "Tika Tika",
    pubDate: "Fri, 10 Apr 2020",
    content: "Lorem ipsum",
  },
];

export default async function handler(req: APIRequest) {
  //   const feed = await fetch("https://medium.com/feed/codestar-blog");
  //   console.log(await feed.json());
  req.status(200).json(mockResponse);
}
