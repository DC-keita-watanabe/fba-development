import { db } from "@/db";
import { comments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";


const sampleComments = [
  {
    id: 1,
    author: '佐藤花子',
    content: 'とても参考になりました！Partial Prerenderingを試してみたいと思います。',
    createdAt: new Date('2024-03-15T10:30:00'),
  },
  {
    id: 2,
    author: '鈴木一郎',
    content: 'ビルド時間が30%短縮されたのは素晴らしいですね。具体的な設定方法についても記事にしていただけると嬉しいです。',
    createdAt: new Date('2024-03-15T14:20:00'),
  },
  {
    id: 3,
    author: '田中美咲',
    content: 'Server Actionsの改善について詳しく知りたいです。サンプルコードなどありますか？',
    createdAt: new Date('2024-03-16T09:15:00'),
  },
];

type CommentListProps = {
  postId: string;
}

const CommentList = async ({postId}: CommentListProps) => {
  const allComments = await db
    .select({
      id: comments.id,
      username: comments.username,
      content: comments.content,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .where(eq(comments.postId, parseInt(postId)))
    .orderBy(desc(comments.createdAt));
    
  // 2.5秒の遅延をシミュレート（ストリーミングSSRのデモ）
  await new Promise(resolve => setTimeout(resolve, 2500));

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">
        コメント一覧 ({allComments.length}件)
      </h3>
      <div className="space-y-4">
        {allComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                {comment.username.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{comment.username}</p>
                <p className="text-xs text-gray-500">
                  {comment.createdAt.toLocaleString('ja-JP')}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList
