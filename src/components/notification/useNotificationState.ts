import { useQueue } from '@hooks/useQueue';
import { randomId } from '@utils/randomId';
import { useCallback, useMemo } from 'react';
import { NotificationProps } from './NotificationContext';

export default function useNotificationsState({ limit }: { limit: number }) {
  const { state, queue, update, cleanQueue } = useQueue<NotificationProps>({
    initialValues: [],
    limit,
  });

  const showNotification = useCallback(
    (notification: NotificationProps) => {
      const id = notification.id || randomId();

      update(notifications => {
        if (
          notification.id &&
          notifications.some(n => n.id === notification.id)
        ) {
          return notifications;
        }

        return [...notifications, { ...notification, id }];
      });

      return id;
    },
    [update]
  );

  const updateNotification = useCallback(
    (id: string, notification: NotificationProps) =>
      update(notifications => {
        const index = notifications.findIndex(n => n.id === id);

        if (index === -1) {
          return notifications;
        }

        const newNotifications = [...notifications];
        newNotifications[index] = notification;

        return newNotifications;
      }),
    [update]
  );

  const hideNotification = useCallback(
    (id: string) =>
      update(notifications =>
        notifications.filter(notification => {
          if (notification.id === id) {
            typeof notification.onClose === 'function' &&
              notification.onClose(notification);
            return false;
          }

          return true;
        })
      ),
    [update]
  );

  const clean = useCallback(() => update(() => []), [update]);

  return useMemo(
    () => ({
      notifications: state,
      queue,
      showNotification,
      updateNotification,
      hideNotification,
      cleanQueue,
      clean,
    }),
    [
      clean,
      cleanQueue,
      hideNotification,
      queue,
      showNotification,
      state,
      updateNotification,
    ]
  );
}
