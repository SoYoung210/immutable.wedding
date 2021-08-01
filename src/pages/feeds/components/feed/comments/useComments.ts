import { getComments } from '@remotes/comments';
import useSWR from 'swr';

export function useComments(id: number) {
  return useSWR([id, 'getComments'], getComments);
}
