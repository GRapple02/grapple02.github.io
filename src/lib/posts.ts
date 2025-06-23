import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type PostType = 'posts' | 'travels' | 'etc';

export function getPostsData(type: PostType = 'posts') {
  const postsDirectory = path.join(process.cwd(), `data/${type}`);
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = encodeURI(fileName.replace(/\.mdx$/, ''));
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string }),
    };
  });

  return allPostsData;
}

export function getSortedPostsData(type: PostType = 'posts') {
  return getPostsData(type).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(type: PostType = 'posts', id: string) {
  const fileName = decodeURI(id);
  const postsDirectory = path.join(process.cwd(), `data/${type}`);
  const fullPath = path.join(postsDirectory, `${fileName}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    fileName,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; tags: string[]; description: string }),
  };
}
