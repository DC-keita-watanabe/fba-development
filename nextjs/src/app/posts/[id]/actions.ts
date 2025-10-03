'use server';

import { db } from '@/db';
import { comments } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function addComment(postId: number, formData: FormData) {
  // フォームデータを取得
  const userName = formData.get('name') as string;
  const content = formData.get('content') as string;

  // バリデーション
  if (!userName || userName.trim().length === 0) {
    return { error: '名前を入力してください' };
  }

  if (!content || content.trim().length === 0) {
    return { error: 'コメントを入力してください' };
  }

  if (content.length > 1000) {
    return { error: 'コメントは1000文字以内で入力してください' };
  }

  try {
    // コメントを挿入
    await db.insert(comments).values({
      postId: postId,
      username: userName.trim(),
      content: content.trim(),
    });

    // ページを再検証してコメント一覧を更新
    revalidatePath(`/posts/${postId}`);

    return { success: true };
  } catch (error) {
    console.error('コメント投稿エラー:', error);
    return { error: 'コメントの投稿に失敗しました' };
  }
}