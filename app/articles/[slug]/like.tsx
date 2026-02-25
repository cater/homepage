"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export const LikeButton: React.FC<{ slug: string }> = ({ slug }) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 获取当前文章的点赞数
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/like?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // 检查用户是否已点赞
    const hasLiked = localStorage.getItem(`liked:${slug}`);
    if (hasLiked) {
      setIsLiked(true);
    }

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    if (isLiked) return;

    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
        localStorage.setItem(`liked:${slug}`, "true");
      }
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}
      className={`flex items-center gap-1 transition-all duration-200 ${
        isLiked
          ? "text-red-500 cursor-default"
          : "text-zinc-400 hover:text-red-500 hover:font-medium"
      }`}
      title={isLiked ? "You liked this article" : "Like this article"}
    >
      <Heart
        className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`}
      />
      <span>{Intl.NumberFormat("en-US", { notation: "compact" }).format(likes)}</span>
    </button>
  );
};
