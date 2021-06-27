import React, {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import useNotificationsState from './useNotificationState';
import { Portal } from '@components/util/Portal';
import { CSSType } from 'stitches.config';
import { NotificationContainer } from './NotificationContainer';

export interface NotificationProps {
  id?: string;
  autoClose?: false | number;
  onClose?: (props: NotificationProps) => void;
  onOpen?: (props: NotificationProps) => void;
  element: Exclude<ReactNode, null | boolean | undefined>;
}

interface NotificationsContextProps {
  notifications: NotificationProps[];
  queue: NotificationProps[];
  showNotification(props: NotificationProps): string;
  updateNotification(id: string, props: NotificationProps): void;
  hideNotification(id: string): void;
  clean(): void;
  cleanQueue(): void;
}

interface NotificationProviderProps
  extends Pick<NotificationProps, 'id' | 'autoClose'>,
    ComponentPropsWithoutRef<'div'> {
  limit?: number;
  zIndex?: CSSType['zIndex'];
}

export const NotificationsContext =
  createContext<NotificationsContextProps | null>(null);

export function NotificationProvider({
  limit = 3,
  children,
  zIndex = '$max',
  autoClose = 4000,
  ...props
}: NotificationProviderProps) {
  const {
    notifications,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue,
  } = useNotificationsState({ limit });
  const items = notifications.map(notification => {
    return (
      <NotificationContainer
        key={notification.id}
        notification={notification}
        onHide={hideNotification}
        autoClose={autoClose}
      >
        {/* <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 0, scale: 0.3 }}
          animate={{ opacity: 1, y: 50, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
        >
          {notification.element}
        </motion.div> */}
        {notification.element}
      </NotificationContainer>
    );
  });

  const momoizedContext = useMemo(
    () => ({
      notifications,
      queue,
      showNotification,
      hideNotification,
      updateNotification,
      clean,
      cleanQueue,
    }),
    [
      clean,
      cleanQueue,
      hideNotification,
      notifications,
      queue,
      showNotification,
      updateNotification,
    ]
  );
  return (
    <NotificationsContext.Provider value={momoizedContext} {...props}>
      <Portal css={{ zIndex }}>{items}</Portal>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('NotificationsProvider 안쪽에서 사용해주세요');
  }

  return context;
}
