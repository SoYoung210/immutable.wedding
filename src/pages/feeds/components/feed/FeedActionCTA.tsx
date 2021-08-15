import { useNotifications } from '@components/notification/NotificationContext';
import { useIsMobileWeb } from '@hooks/useIsMobileWeb';
import { ActionCTA } from '@pages/feeds/components/feed/action-cta/ActionCTA';
import { AccountTransferActionCTA } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/account-transfer/AccountTransferActionCTA';
import { TossTransferActionCTA } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/toss-transfer/TossTransferActionCTA';
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
  const isMobileWeb = useIsMobileWeb();
  const { showNotification } = useNotifications();

  if (링크_액션인가(action)) {
    return (
      <ActionCTA
        as="a"
        backgroundColor={action.color}
        href={
          isMobileWeb
            ? action.mobileLink ?? action.href
            : action.pcLink ?? action.href
        }
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
