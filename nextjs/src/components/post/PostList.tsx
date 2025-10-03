import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import Post from './Post';
import Link from 'next/link';

const PostList = async () => {
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
        記事一覧
      </h2>
      <div className="space-y-6">
        {allPosts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Post post={post} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostList
