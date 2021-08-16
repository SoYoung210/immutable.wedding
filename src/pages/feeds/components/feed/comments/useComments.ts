/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getComments } from '@remotes/comments';
import useSWR from 'swr';

export function useComments(id: number) {
  const { data, ...rest } = useSWR([id, 'getComments'], getComments, {
    suspense: true,
  });

  return {
    data: data!,
    isEmpty: data!.length === 0,
    hasOnlyOne: data!.length - 1 === 0,
    ...rest,
  };
}
