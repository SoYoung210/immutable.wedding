import { api } from '@remotes/supabaseClient';

interface Comment {
  id: number;
  feedId: number;
  message: string;
  createAt: string;
}

export async function getComments(id: number) {
  const { data } = await api
    .from<Comment>('comments')
    .select('feedId, message, createAt')
    .eq('feedId', id)
    .order('id', { ascending: false });

  return data;
}

export async function addComment(
  id: number,
  { message }: Pick<Comment, 'message'>
) {
  return api.from<Comment>('comments').upsert({
    feedId: id,
    message,
    createAt: new Date().toISOString(),
  });
}
