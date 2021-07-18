import { useNotifications } from '@components/notification/NotificationContext';
import { AccountTransferActionCTA } from '@pages/feeds/components/feed/action-cta/AccountTransferActionCTA';
import { ActionCTA } from '@pages/feeds/components/feed/action-cta/ActionCTA';
import { TossTransferActionCTA } from '@pages/feeds/components/feed/action-cta/TossTransferActionCTA';
import { copyToClipboard } from '@utils/copyToClipboard';
import React from 'react';
import {
  FeedAction,
  링크_액션인가,
  바텀싯_액션인가,
  팝업_액션인가,
} from 'src/models/Feed';
import { ToastWrapper } from './ToastWrapper';

interface Props {
  action: FeedAction;
}

export function FeedActionCTA({ action }: Props) {
  const { showNotification } = useNotifications();

  if (링크_액션인가(action)) {
    return (
      <ActionCTA
        as="a"
        backgroundColor={action.color}
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action.text}
      </ActionCTA>
    );
  }

  if (팝업_액션인가(action)) {
    return (
      <ActionCTA
        as="button"
        backgroundColor={action.color}
        css={{ width: '100%' }}
        type="button"
        onClick={() => {
          copyToClipboard('계좌번호지롱');
          showNotification({
            element: <ToastWrapper>✅ {action.message}</ToastWrapper>,
          });
        }}
      >
        {action.text}
      </ActionCTA>
    );
  }

  if (바텀싯_액션인가(action)) {
    if (action.type === 'bottom-sheet_toss') {
      return <TossTransferActionCTA action={action} />;
    }
    if (action.type === 'bottom-sheet_account') {
      return <AccountTransferActionCTA action={action} />;
    }
  }

  return <ActionCTA backgroundColor={action.color}>{action.text}</ActionCTA>;
}
