'use client';

import { addPost } from '@/app/posts/actions';
import React, { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {pending ? '記事を投稿中...' : '記事を投稿'}
    </button>
  );
}

const PostForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const USER_ID = 1;

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    const result = await addPost(USER_ID, formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      formRef.current?.reset();

      // 3秒後に成功メッセージを消す
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
        新規記事を作成
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          記事を投稿しました！
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="space-y-5">
        {/* <div>
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
            投稿者名
          </label>
          <input
            type="text"
            id="author"
            placeholder="山田太郎"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div> */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name='title'
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
            name='content'
            rows={6}
            placeholder="記事の内容を入力"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
          />
        </div>
        {/* <button
          type="button"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          投稿する
        </button> */}
        <SubmitButton />
      </form>
    </div>
  )
}

export default PostForm
