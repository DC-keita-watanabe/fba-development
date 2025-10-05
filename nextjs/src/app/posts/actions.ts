'use server';

import { db } from '@/db';
import { posts } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function addPost(userId: number, formData: FormData) {
  // フォームデータを取得
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // バリデーション
  if (!title || title.trim().length === 0) {
    return { error: 'タイトルを入力してください' };
  }

  if (!content || content.trim().length === 0) {
    return { error: '記事内容を入力してください' };
  }

  if (content.length > 1000) {
    return { error: '記事内容は1000文字以内で入力してください' };
  }

  try {
    // 記事を挿入
    await db.insert(posts).values({
      userId: userId,
      title: title.trim(),
      content: content.trim(),
    });

    // 記事を再検証してコメント一覧を更新
    revalidatePath('/posts');

    return { success: true };
  } catch (error) {
    console.error('記事投稿エラー:', error);
    return { error: '記事の投稿に失敗しました' };
  }
}