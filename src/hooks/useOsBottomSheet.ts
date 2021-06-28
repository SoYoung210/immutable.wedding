import { useCallback } from 'react';

type ErrorType = 'UNSUPPORTED' | 'UNKNOWN';

interface Params {
  onError?: (errorType: ErrorType) => void;
  value: ShareData;
  onSuccess?: () => void;
}

export function useOsBottomSheet({ onError, onSuccess, value }: Params) {
  const open = useCallback(() => {
    if (window != null) {
      if ('share' in window.navigator) {
        window.navigator
          .share(value)
          .then(onSuccess)
          .catch(error => {
            // 사용자가 취소한 것이므로 따로 처리하지 않는다.
            if (error.name === 'AbortError') {
              return;
            }

            onError?.('UNKNOWN');
          });
      } else {
        onError?.('UNSUPPORTED');
      }
    }
  }, [onError, onSuccess, value]);

  return open;
}
