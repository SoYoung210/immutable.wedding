import { CSSProps } from '@utils/styles';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'stitches.config';

interface Props extends CSSProps {
  children: ReactNode;
}

const SDiv = styled('div', {
  position: 'relative',
  width: '100%',
});

export function Portal({ children, ...props }: Props) {
  const [mounted, setMounted] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    elementRef.current = document.createElement('div');
    document.body.appendChild(elementRef.current);
    return () => {
      if (elementRef.current != null) {
        document.body.removeChild(elementRef.current);
      }
    };
  }, []);

  if (!mounted || elementRef.current == null) {
    return null;
  }

  return createPortal(<SDiv {...props}>{children}</SDiv>, elementRef.current);
}
