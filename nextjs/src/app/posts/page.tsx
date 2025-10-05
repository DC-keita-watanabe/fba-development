import PostForm from '@/components/post/PostForm';
import PostList from '@/components/post/PostList';
export const dynamic = "force-dynamic";

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
        <PostForm />

        {/* 記事一覧 */}
        <PostList />
      </main>
    </div>
  );
}
