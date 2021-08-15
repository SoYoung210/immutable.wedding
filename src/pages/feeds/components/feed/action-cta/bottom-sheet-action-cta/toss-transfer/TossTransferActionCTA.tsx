import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/BottomSheetActionCTA';
import { useTossTransferBottomSheet } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/toss-transfer/useTossTransferBottomSheet';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function TossTransferActionCTA({ action }: Props) {
  const { open } = useTossTransferBottomSheet();

  return <BottomSheetActionCTA action={action} onClick={open} />;
}
