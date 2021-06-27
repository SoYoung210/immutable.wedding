import { useCallback } from 'react';

type ErrorType = 'UNSUPPORTED' | 'UNKNOWN' | 'PERMISSION_DENIED';

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
            console.log('error', error);
            onError?.('UNKNOWN');
          });
      } else {
        onError?.('UNSUPPORTED');
      }
    }
  }, [onError, onSuccess, value]);

  return open;
}
