import { FeedAction } from '@models/Feed';
import { useAccountTransferBottomSheet } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/account-transfer/useAccountTransferBottomSheet';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/BottomSheetActionCTA';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function AccountTransferActionCTA({ action }: Props) {
  const { open } = useAccountTransferBottomSheet();

  return <BottomSheetActionCTA action={action} onClick={open} />;
}
