import { ReactNode, useEffect, useRef } from 'react';
import { styled } from 'stitches.config';
import { NotificationProps } from './NotificationContext';

interface Props {
  children: ReactNode;
  notification: NotificationProps;
  onHide(id: string): void;
  autoClose: false | number;
}

function getAutoClose(
  autoClose: boolean | number,
  notification: NotificationProps
) {
  if (typeof notification.autoClose === 'number') {
    return notification.autoClose;
  }

  if (notification.autoClose === false || autoClose === false) {
    return false;
  }

  return autoClose;
}

export function NotificationContainer({
  children,
  notification,
  onHide,
  autoClose,
}: Props) {
  const autoCloseTimeout = getAutoClose(autoClose, notification);
  const hideTimeout = useRef<number>();

  const handleHide = () => {
    onHide(notification.id ?? '');
    window.clearTimeout(hideTimeout.current);
  };

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleDelayedHide = () => {
    if (typeof autoCloseTimeout === 'number') {
      hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout);
    }
  };

  useEffect(() => {
    if (typeof notification.onOpen === 'function') {
      notification.onOpen(notification);
    }
  }, []);

  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  }, [autoClose, notification.autoClose]);

  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled('div', {
  width: '100%',
  margin: '0 auto',
});
