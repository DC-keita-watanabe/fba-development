import type { Post } from '@/types';
import { Calendar, User } from 'lucide-react';

type PostProps = {
  post: Post;
}

const Post = ({ post }: PostProps) => {
  return (
    <article
      key={post.id}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-blue-50 transition-all hover:scale-[1.01] cursor-pointer group"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <User size={16} className="text-blue-500" />
          <span>{post.authorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-cyan-500" />
          <span>{post.createdAt.toLocaleDateString('ja-JP')}</span>
        </div>
      </div>
    </article>
  )
}

export default Post
