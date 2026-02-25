import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest): Promise<NextResponse> {
  if (req.method === "POST") {
    const body = await req.json();
    const slug = body.slug;
    const ip = req.ip;

    if (!slug) {
      return new NextResponse("Slug not found", { status: 400 });
    }

    if (ip) {
      // SHA-256 哈希 IP 以去重
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip)
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // 24 小时内同一 IP 只计数一次
      const isNew = await redis.set(
        ["deduplicate", "like", hash, slug].join(":"),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        }
      );
      if (!isNew) {
        return new NextResponse(null, { status: 202 });
      }
    }

    await redis.incr(["likes", "articles", slug].join(":"));
    return new NextResponse(null, { status: 201 });
  }

  if (req.method === "GET") {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const likes =
      (await redis.get<number>(["likes", "articles", slug].join(":"))) ?? 0;

    return NextResponse.json({ likes });
  }

  return new NextResponse("Method not allowed", { status: 405 });
}
