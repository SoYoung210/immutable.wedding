import { BottomSheet } from '@components/bottom-sheet/BottonSheet';
import useBooleanState from '@hooks/useBooleanState';
import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/BottomSheetActionCTA';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function AccountTransferActionCTA({ action }: Props) {
  const [isOpen, open, close] = useBooleanState();

  return (
    <>
      <BottomSheetActionCTA action={action} onClick={open} />
      <BottomSheet
        open={isOpen}
        onClose={close}
        title="소영, 재엽의 결혼을 축하해주세요 💖"
        description="감사한 마음 잊지 않고 오랫동안 간직할게요."
      >
        <ul>
          <li>children</li>
          <li>children</li>
          <li>children</li>
        </ul>
      </BottomSheet>
    </>
  );
}
