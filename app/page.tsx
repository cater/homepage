'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { siteData } from "@/config/site";
import { Metadata } from "next";

// export const metadata: Metadata = siteData("cater");

const navigation = [
  { name: "项目", href: "/projects" },
  { name: "文章", href: "/articles" },
  { name: "导航", href: "/comment" },
  { name: "关于", href: "/about" },
];

export default function Home() {
  const [poem, setPoem] = useState<String>('技术为翼，知识为舟，心怀慈悲，驶向智慧的彼岸')
  const currentYear = new Date().getFullYear();

  const query = async () => {

    const response = await fetch("/poem", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error('fetch error')
      return
    }

    const result: string = await response.text();
    const jsonResult = JSON.parse(result);

    setPoem(jsonResult.content)
}

  useEffect(() => {
    query()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-slate-500 hover:text-zinc-300">
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        cater's home
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 mb-1">
          {poem}
        </h2>
        <p className="text-sm text-zinc-500">Copyright © cater {currentYear}</p>
      </div>
    </div>
  );
}
