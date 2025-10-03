import PostList from '@/components/post/PostList';
import { Calendar, User } from 'lucide-react';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Tech Blog</h1>
          <p className="text-blue-100 mt-2">Next.js × Drizzle × PostgreSQL</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* 新規記事作成フォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            新規記事を作成
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                投稿者名
              </label>
              <input
                type="text"
                id="author"
                placeholder="山田太郎"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                placeholder="記事のタイトルを入力"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                本文
              </label>
              <textarea
                id="content"
                rows={6}
                placeholder="記事の内容を入力"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              投稿する
            </button>
          </div>
        </div>

        {/* 記事一覧 */}
        <PostList />
      </main>
    </div>
  );
}
