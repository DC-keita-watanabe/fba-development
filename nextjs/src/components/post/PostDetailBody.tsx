import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { Post } from '@/types';
import { desc, eq } from 'drizzle-orm';
import { Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';

type PostDetailBodyProps = {
  postId: string;
}

const PostDetailBody = async ({ postId }: PostDetailBodyProps) => {

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(postId)),
    columns: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
  });
  
  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b-2 border-blue-100">
        <div className="flex items-center gap-2">
          <User size={18} className="text-blue-500" />
          <span className="font-medium">{post.user.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-cyan-500" />
          <span>{post.createdAt.toLocaleDateString('ja-JP')}</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

export default PostDetailBody
