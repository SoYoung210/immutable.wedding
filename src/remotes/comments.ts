import { api } from '@remotes/supabaseClient';

interface Comment {
  id: number;
  feedId: number;
  message: string;
  createAt: string;
}

export async function getComments(feedId: number) {
  const { data } = await api
    .from<Comment>('comments')
    .select('id, feedId, message, createAt')
    .eq('feedId', feedId)
    .order('id', { ascending: false });

  return data;
}

export async function addComment(
  feedId: number,
  { message }: Pick<Comment, 'message'>
) {
  return api.from<Comment>('comments').upsert({
    feedId,
    message,
    createAt: new Date().toISOString(),
  });
}
