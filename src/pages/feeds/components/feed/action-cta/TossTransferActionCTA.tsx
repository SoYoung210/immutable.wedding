import { BottomSheet } from '@components/bottom-sheet/BottonSheet';
import useBooleanState from '@hooks/useBooleanState';
import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/BottomSheetActionCTA';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function TossTransferActionCTA({ action }: Props) {
  const [isOpen, open, close] = useBooleanState();

  return (
    <>
      <BottomSheetActionCTA action={action} onClick={open} />
      <BottomSheet
        open={isOpen}
        onClose={close}
        title="타이틀 영역입니다"
        description="디스크립션 영역입니다"
        rightAddon={<button onClick={close}>X</button>}
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
