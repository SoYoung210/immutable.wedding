import useIsMounted from '@hooks/useIsMounted';
import { isMobileWeb } from '@utils/device/isMobileWeb';
import { useMemo } from 'react';

export function useIsMobileWeb(defaultValue = false) {
  const isMounted = useIsMounted();
  return useMemo(
    () => (isMounted ? isMobileWeb() : defaultValue),
    [defaultValue, isMounted]
  );
}
