import React, {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import useNotificationsState from './useNotificationState';
import { Portal } from '@components/util/Portal';
import { CSSType } from 'stitches.config';
import { NotificationContainer } from './NotificationContainer';
import { AnimatePresence } from 'framer-motion';

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
  showNotification: (props: NotificationProps) => string;
  updateNotification: (id: string, props: NotificationProps) => void;
  hideNotification: (id: string) => void;
  clean: () => void;
  cleanQueue: () => void;
}

interface NotificationProviderProps
  extends Pick<NotificationProps, 'id'>,
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
    const { autoClose = 2500, element } = notification;
    return (
      <NotificationContainer
        key={notification.id}
        notification={notification}
        onHide={hideNotification}
        autoClose={autoClose}
      >
        {element}
      </NotificationContainer>
    );
  });

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        queue,
        showNotification,
        hideNotification,
        updateNotification,
        clean,
        cleanQueue,
      }}
      {...props}
    >
      <Portal css={{ zIndex }}>
        <AnimatePresence>{items}</AnimatePresence>
      </Portal>
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
