import { FeedAction } from '@models/Feed';
import { useAccountTransferBottomSheet } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/account-transfer/useAccountTransferBottomSheet';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/BottomSheetActionCTA';
import { useTossTransferBottomSheet } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/toss-transfer/useTossTransferBottomSheet';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function TossTransferActionCTA({ action }: Props) {
  const { open } = useTossTransferBottomSheet();
  const { open: openAccountTransferBottomSheet } =
    useAccountTransferBottomSheet();

  const handleClick = async () => {
    const confirmed = await open();

    if (confirmed) {
      setTimeout(() => {
        openAccountTransferBottomSheet();
      }, 500);
    }
  };

  return <BottomSheetActionCTA action={action} onClick={handleClick} />;
}
