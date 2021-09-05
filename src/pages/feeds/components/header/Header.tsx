import PaperAirplane from '@components/icon/PaperAirplane';
import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import { Flex } from '@components/util/layout/Flex';
import { ToastWrapper } from '@components/toast/ToastWrapper';
import React, { useCallback } from 'react';

export function Header() {
  const { showNotification } = useNotifications();
  const openToast = useCallback(() => {
    showNotification({
      element: <ToastWrapper>결혼식이 정해지면 다시 찾아올게요!</ToastWrapper>,
    });
  }, [showNotification]);

  return (
    <Flex.CenterVertical
      css={{
        zIndex: '$max',
        pt: '$20',
        pb: '$12',
        position: 'sticky',
        top: 0,
        backgroundColor: '$white',
        px: '$15',
        borderBottom: '1px solid $gray100',
      }}
    >
      <Flex
        elementType="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Image width={123} height={40}>
          <Image.Source src="/assets/icon/logo.jpg" alt="웨딩로그_로고" />
        </Image>
      </Flex>
      <Flex css={{ ml: 'auto', spaceX: '$24' }}>
        <button type="button" onClick={openToast}>
          <PaperAirplane />
        </button>
      </Flex>
    </Flex.CenterVertical>
  );
}
