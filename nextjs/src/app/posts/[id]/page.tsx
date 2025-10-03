import React, { Suspense } from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PostDetailBody from '@/components/post/PostDetailBody';
import CommentList from '@/components/comment/CommentList';
import CommentForm from '@/components/comment/CommentForm';


export default async function PostDetail({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href={'/'} className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>一覧に戻る</span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">記事詳細</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 記事本文 */}
        <PostDetailBody postId={id} />

        {/* コメントセクション */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageCircle size={24} className="text-blue-600" />
            コメント
          </h2>

          {/* コメント追加フォーム */}
          <CommentForm postId={id} />

          {/* コメント一覧（Suspense） */}
          <Suspense fallback={<CommentsLoading />}>
            <CommentList postId={id} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// ローディングコンポーネント
function CommentsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-12">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          {/* 外側の回転する円 */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          {/* 内側の逆回転する円 */}
          <div
            className="absolute top-2 left-2 w-12 h-12 border-4 border-cyan-200 border-b-cyan-500 rounded-full animate-spin"
            style={{ animationDirection: 'reverse' }}
          ></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">コメントを読み込んでいます...</p>
        <p className="mt-2 text-sm text-gray-400">ストリーミングSSRのデモ</p>
      </div>
    </div>
  );
}