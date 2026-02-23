import fs from "node:fs";
import path from "node:path";

export type BookmarkLink = {
  folder: string;
  title: string;
  url: string;
};

export type BookmarkGroup = {
  folder: string;
  links: BookmarkLink[];
};

type FirefoxBookmarkNode = {
  children?: FirefoxBookmarkNode[];
  root?: string;
  title?: string;
  type?: string;
  typeCode?: number;
  uri?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const HTML_BOOKMARK_FILE_PATH = path.join(CONTENT_DIR, "bookmarks.html");

const ROOT_CONTAINER_TITLES = new Set(["menu", "toolbar", "unfiled", "mobile"]);

const ENTITY_MAP: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

const decodeHtmlEntities = (value: string): string => {
  return value.replace(/&(#x?[\da-fA-F]+|[a-zA-Z]+);/g, (_match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const parsed = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(parsed) ? "" : String.fromCodePoint(parsed);
    }

    if (entity.startsWith("#")) {
      const parsed = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(parsed) ? "" : String.fromCodePoint(parsed);
    }

    return ENTITY_MAP[entity] ?? `&${entity};`;
  });
};

const normalizeText = (value: string): string => {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
};

const extractAttribute = (attributes: string, key: string): string => {
  const pattern = new RegExp(`${key}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const matched = attributes.match(pattern);
  if (!matched) {
    return "";
  }

  const value = matched[2] ?? matched[3] ?? matched[4] ?? "";
  return decodeHtmlEntities(value).trim();
};

const isHttpUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

const addLinkToFolder = (store: Map<string, BookmarkLink[]>, folder: string, link: BookmarkLink) => {
  const current = store.get(folder);
  if (current) {
    current.push(link);
    return;
  }

  store.set(folder, [link]);
};

const getLatestJsonBookmarkFilePath = (): string | null => {
  if (!fs.existsSync(CONTENT_DIR)) {
    return null;
  }

  const candidates = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => /^bookmarks-\d{4}-\d{2}-\d{2}\.json$/i.test(name))
    .sort();

  if (candidates.length === 0) {
    return null;
  }

  return path.join(CONTENT_DIR, candidates[candidates.length - 1]);
};

const shouldUseAsFolder = (node: FirefoxBookmarkNode): boolean => {
  if (node.typeCode !== 2) {
    return false;
  }

  const title = node.title?.trim();
  if (!title) {
    return false;
  }

  if (node.root) {
    return false;
  }

  return !ROOT_CONTAINER_TITLES.has(title.toLowerCase());
};

const walkFirefoxBookmarks = (
  node: FirefoxBookmarkNode,
  folderPath: string[],
  store: Map<string, BookmarkLink[]>
) => {
  if (node.typeCode === 1 && typeof node.uri === "string") {
    const url = node.uri?.trim() ?? "";
    if (!isHttpUrl(url)) {
      return;
    }

    const folder = folderPath.length > 0 ? folderPath.join(" / ") : "未分类";
    const rawTitle = node.title?.trim();
    const title = rawTitle || getHostname(url);

    addLinkToFolder(store, folder, {
      folder,
      title,
      url,
    });
    return;
  }

  if (!Array.isArray(node.children) || node.children.length === 0) {
    return;
  }

  const currentPath = shouldUseAsFolder(node)
    ? [...folderPath, (node.title ?? "").trim()]
    : folderPath;

  for (const child of node.children) {
    walkFirefoxBookmarks(child, currentPath, store);
  }
};

export const parseFirefoxBookmarksJson = (jsonText: string): BookmarkGroup[] => {
  const parsed = JSON.parse(jsonText) as FirefoxBookmarkNode;
  const store = new Map<string, BookmarkLink[]>();

  walkFirefoxBookmarks(parsed, [], store);

  return [...store.entries()].map(([folder, links]) => ({
    folder,
    links,
  }));
};

export const parseBookmarksHtml = (html: string): BookmarkGroup[] => {
  const linksByFolder = new Map<string, BookmarkLink[]>();
  const folderStack: string[] = [];
  let pendingFolder: string | null = null;

  const tokenPattern = /<H3\b[^>]*>[\s\S]*?<\/H3>|<\/DL>|<DL\b[^>]*>|<A\b[^>]*>[\s\S]*?<\/A>/gi;

  for (const matched of html.matchAll(tokenPattern)) {
    const token = matched[0];

    if (/^<H3\b/i.test(token)) {
      const heading = token.replace(/^<H3\b[^>]*>/i, "").replace(/<\/H3>$/i, "");
      pendingFolder = normalizeText(heading) || "未命名";
      continue;
    }

    if (/^<DL\b/i.test(token)) {
      if (pendingFolder) {
        folderStack.push(pendingFolder);
        pendingFolder = null;
      }
      continue;
    }

    if (/^<\/DL>/i.test(token)) {
      if (folderStack.length > 0) {
        folderStack.pop();
      }
      continue;
    }

    if (!/^<A\b/i.test(token)) {
      continue;
    }

    const attributeMatch = token.match(/^<A\b([^>]*)>/i);
    const attributes = attributeMatch?.[1] ?? "";
    const url = extractAttribute(attributes, "HREF");

    if (!isHttpUrl(url)) {
      continue;
    }

    const anchorContent = token.replace(/^<A\b[^>]*>/i, "").replace(/<\/A>$/i, "");
    const normalizedTitle = normalizeText(anchorContent);

    let fallbackHost = url;
    try {
      fallbackHost = new URL(url).hostname;
    } catch {
      // ignore malformed URL fallback
    }

    const folder = folderStack.length > 0 ? folderStack[folderStack.length - 1] : "未分类";
    const record: BookmarkLink = {
      folder,
      title: normalizedTitle || fallbackHost,
      url,
    };

    addLinkToFolder(linksByFolder, folder, record);
  }

  return [...linksByFolder.entries()].map(([folder, links]) => ({
    folder,
    links,
  }));
};

export const getBookmarkGroups = (): BookmarkGroup[] => {
  const jsonFilePath = getLatestJsonBookmarkFilePath();
  if (jsonFilePath) {
    try {
      const jsonText = fs.readFileSync(jsonFilePath, "utf8");
      const jsonGroups = parseFirefoxBookmarksJson(jsonText);
      if (jsonGroups.length > 0) {
        return jsonGroups;
      }
    } catch {
      // fallback to html file
    }
  }

  if (!fs.existsSync(HTML_BOOKMARK_FILE_PATH)) {
    return [];
  }

  try {
    const html = fs.readFileSync(HTML_BOOKMARK_FILE_PATH, "utf8");
    return parseBookmarksHtml(html);
  } catch {
    return [];
  }
};
