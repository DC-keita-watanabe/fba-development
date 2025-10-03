'use client';

import { useFormStatus } from 'react-dom';
import { useRef, useState } from 'react';
import { addComment } from '@/app/posts/[id]/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {pending ? 'コメントを投稿中...' : 'コメントを投稿'}
    </button>
  );
}

export default function CommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    const result = await addComment(parseInt(postId), formData);

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
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
      <h3 className="font-semibold text-gray-800 mb-4">コメントを追加</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          コメントを投稿しました！
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment-author" className="block text-sm font-semibold text-gray-700 mb-2">
            名前
          </label>
          <input
            type="text"
            id="comment-author"
            name="name"
            placeholder="あなたの名前"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
          />
        </div>
        <div>
          <label htmlFor="comment-content" className="block text-sm font-semibold text-gray-700 mb-2">
            コメント
          </label>
          <textarea
            id="comment-content"
            name="content"
            rows={4}
            placeholder="コメントを入力"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none bg-white"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}