import Link from 'next/link';
import { BookOpen, PenTool, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Tech Blog</h1>
              <p className="text-blue-100 mt-1">Next.js × Drizzle × PostgreSQL</p>
            </div>
            <Link
              href="/posts"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              記事一覧を見る
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-6">
        {/* ヒーローセクション */}
        <section className="py-20 text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl mb-6">
              <PenTool size={48} className="text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            技術記事を
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              投稿・共有
            </span>
            しよう
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Next.js App Routerを使った最新のブログプラットフォーム。
            あなたの知識を共有して、開発者コミュニティに貢献しましょう。
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/posts"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              記事を投稿する
            </Link>
            <Link
              href="/posts"
              className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl border-2 border-blue-600 hover:bg-blue-50 hover:scale-105 transition-all"
            >
              記事を読む
            </Link>
          </div>
        </section>

        {/* 機能紹介 */}
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                簡単に記事作成
              </h3>
              <p className="text-gray-600 leading-relaxed">
                シンプルなフォームで誰でも簡単に技術記事を投稿できます。マークダウンにも対応予定。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                コメント機能
              </h3>
              <p className="text-gray-600 leading-relaxed">
                記事にコメントを残して、著者や他の読者とディスカッションできます。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Zap size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                高速なパフォーマンス
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Next.js App RouterとDrizzle ORMによる最適化されたデータ取得で高速表示を実現。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              今すぐ始めよう
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              あなたの技術知識を共有して、開発者コミュニティに貢献しましょう
            </p>
            <Link
              href="/posts"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              記事を投稿する
            </Link>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2024 Tech Blog. Built with Next.js, Drizzle ORM & PostgreSQL.</p>
        </div>
      </footer>
    </div>
  );
}