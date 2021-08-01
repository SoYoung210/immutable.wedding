import { ComponentProps, Suspense, useEffect, useState } from 'react';

type Props = ComponentProps<typeof Suspense>;

export function SSRSuspense({ fallback, children }: Props) {
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
  return <>{fallback}</>;
}

function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
