// サンプルデータ
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

export function CommentsList() {
  return (
    <div className="space-y-4">
      {sampleComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              {comment.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{comment.author}</p>
              <p className="text-xs text-gray-500">
                {comment.createdAt.toLocaleString('ja-JP')}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}