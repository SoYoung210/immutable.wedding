import { useCallback } from 'react';

type ErrorType = 'UNSUPPORTED' | 'UNKNOWN' | 'ABORTED';

interface Params {
  onError?: (errorType: ErrorType) => void;
  value: ShareData;
  onSuccess?: () => void;
}

export function useOsShareBottomSheet({ onError, onSuccess, value }: Params) {
  const open = useCallback(async () => {
    if (window != null) {
      if ('share' in window.navigator) {
        try {
          await window.navigator.share(value);
          onSuccess?.();
        } catch (error) {
          onError?.(error.name === 'AbortError' ? 'ABORTED' : 'UNKNOWN');
        }
      } else {
        onError?.('UNSUPPORTED');
      }
    }
  }, [onError, onSuccess, value]);

  return open;
}
