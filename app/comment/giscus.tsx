"use client";
import Giscus, {Repo} from "@giscus/react";

export default function GiscusComment() {
  const rep: Repo = `${process.env.NEXT_PUBLIC_GISCUS_USER}/${process.env.NEXT_PUBLIC_GISCUS_REPO}`
  return (
    <Giscus
      id="comments"
      repo={rep}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="title"
      term="Hi"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="bottom"
      theme="noborder_dark"
      lang="zh-CN"
      loading="lazy"
    />
  );
}
