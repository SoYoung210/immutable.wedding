import { useCallback, useMemo, useState } from 'react';

export function useQueue<T>({
  initialValues = [],
  limit,
}: {
  initialValues?: T[];
  limit: number;
}) {
  const [{ state, queue }, setState] = useState({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit),
  });

  const add = useCallback(
    (...items: T[]) =>
      setState(current => {
        const results = [...current.state, ...current.queue, ...items];

        return {
          state: results.slice(0, limit),
          queue: results.slice(limit),
        };
      }),
    [limit]
  );

  const update = useCallback(
    (fn: (state: T[]) => T[]) =>
      setState(current => {
        const results = fn([...current.state, ...current.queue]);

        return {
          state: results.slice(0, limit),
          queue: results.slice(limit),
        };
      }),
    [limit]
  );

  const cleanQueue = useCallback(
    () => setState(current => ({ state: current.state, queue: [] })),
    []
  );

  return useMemo(
    () => ({
      state,
      queue,
      add,
      update,
      cleanQueue,
    }),
    [add, cleanQueue, queue, state, update]
  );
}
