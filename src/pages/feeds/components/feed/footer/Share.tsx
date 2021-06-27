import React from 'react';
import Text from '@components/text';
import { useOsBottomSheet } from '@hooks/useOsBottomSheet';
import { isServer } from '@utils/env/isServer';
import { useNotifications } from '@components/notification/NotificationContext';
import { copyToClipboard } from '@utils/copyToClipboard';
import { ToastWrapper } from '../ToastWrapper';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';

const 공유하기_아이콘_크기 = 16;
export function Share() {
  const { showNotification } = useNotifications();

  const openBottomSheet = useOsBottomSheet({
    value: {
      title: '소영과 재엽의 wedding.log',
      text: '소영과 재엽의 wedding.log',
      url: !isServer() ? window.location.href : '',
    },
    onError: () => {
      copyToClipboard(!isServer() ? window.location.href : '');
      showNotification({
        element: (
          <ToastWrapper>✅ 이제 링크를 붙여넣기 할 수 있어요</ToastWrapper>
        ),
        autoClose: 2500,
      });
    },
  });

  return (
    <Flex.Center
      onClick={openBottomSheet}
      css={{
        mt: '$4',
        spaceX: '$8',
      }}
    >
      <Text
        color="$blue"
        elementType="button"
        size="lg"
        type="button"
        css={{
          color: '$blue400',
        }}
      >
        다른 사람에게도 알려주기
      </Text>
      <Image.Root>
        <Image width={공유하기_아이콘_크기} height={공유하기_아이콘_크기}>
          <Image.Source src="/assets/icon/export.png" alt="공유하기_아이콘" />
        </Image>
      </Image.Root>
    </Flex.Center>
  );
}
