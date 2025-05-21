import { getSortedPostsData } from '@/lib/posts';

const posts = getSortedPostsData();

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📘 블로그</h1>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id} className="mb-2">
            <a href={`/posts/${id}`} className="text-blue-600 hover:underline">{title}</a>
            <div className="text-sm text-gray-500">{date}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}