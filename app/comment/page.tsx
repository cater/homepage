import { Navigation } from "../components/nav";
import { siteData } from "@/config/site";
import { Metadata } from "next";
import GiscusComment from "./giscus";
import { Card } from "../components/card";
import { ExternalLink } from "lucide-react";
import { getBookmarkGroups } from "@/util/bookmarks";
import SiteIcon from "./site-icon";

export const metadata: Metadata = siteData("导航 | cater");

const getHostName = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default function Example() {
  const bookmarkGroups = getBookmarkGroups();

  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center min-h-screen px-4 mx-auto py-24">
        <h2 className="text-zinc-200 font-bold text-xl mb-6">导航</h2>
        {bookmarkGroups.length === 0 ? (
          <p className="text-sm text-zinc-500 mb-10">
            未找到书签数据，请把浏览器导出的 JSON 书签文件放到
            <span className="text-zinc-300"> content/bookmarks-YYYY-MM-DD.json</span>
            <span>（例如 content/bookmarks-2026-02-23.json）</span>
          </p>
        ) : (
          <div className="w-full max-w-5xl mb-10">
            {bookmarkGroups.map((group) => (
              <section key={group.folder} className="mb-8">
                <h3 className="text-zinc-400 text-sm mb-3">{group.folder}</h3>
                <div className="grid grid-cols-2 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                  {group.links.map((link) => (
                    <Card key={`${group.folder}-${link.url}`}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 block w-36 md:w-56">
                        <div className="mb-1 flex justify-between items-start">
                          <SiteIcon url={link.url} />
                          <ExternalLink className="text-zinc-500" size={16} />
                        </div>
                        <p className="text-zinc-200 text-sm ml-1 mb-1 line-clamp-1">{link.title}</p>
                        <p className="text-zinc-500 text-xs ml-1 line-clamp-1">{getHostName(link.url)}</p>
                      </a>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <h2 className="text-zinc-200 font-bold text-xl mb-6">留言区</h2>
        <GiscusComment />
      </div>
    </div>
  );
}
