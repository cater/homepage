"use client";

import { useMemo, useState } from "react";
import DefaultIcon from "../components/avatar-icon";

type SiteIconProps = {
  url: string;
};

const getFaviconCandidates = (url: string): string[] => {
  try {
    const parsed = new URL(url);
    const origin = `${parsed.protocol}//${parsed.host}`;
    return [`${origin}/favicon.ico`, `${origin}/apple-touch-icon.png`, `${origin}/favicon.png`];
  } catch {
    return [];
  }
};

export default function SiteIcon({ url }: SiteIconProps) {
  const candidates = useMemo(() => getFaviconCandidates(url), [url]);
  const [index, setIndex] = useState(0);

  if (candidates.length === 0 || index >= candidates.length) {
    return <DefaultIcon />;
  }

  return (
    <img
      src={candidates[index]}
      alt=""
      aria-hidden
      className="h-10 w-10 rounded-full object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIndex((value) => value + 1)}
    />
  );
}
