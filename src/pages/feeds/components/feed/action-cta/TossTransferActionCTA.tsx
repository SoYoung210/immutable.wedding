import { BottomSheet } from '@components/bottom-sheet';
import { List } from '@components/list/List';
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
      <BottomSheet.Root
        open={isOpen}
        onClose={close}
        title="소영, 재엽의 결혼을 축하해주세요 💖"
        description="감사한 마음 잊지 않고 오랫동안 간직할게요."
      >
        <List css={{ my: '$16' }}>
          <List.Item
            leftAddon={
              <List.Item.Image src="/assets/svg/tossbank.svg" alt="토스뱅크" />
            }
          >
            재엽에게 송금하기
          </List.Item>
          <List.Item
            leftAddon={
              <List.Item.Image
                src="/assets/svg/kakaobank.svg"
                alt="카카오뱅크"
              />
            }
          >
            소영에게 송금하기
          </List.Item>
          <List.Divider />
          <List.Item
            css={{ color: '$gray500 ' }}
            leftAddon={
              <List.Item.Image src="/assets/svg/transfer-icon.svg" alt="송금" />
            }
            rightAddon={
              <List.Item.Image src="/assets/svg/arrow-right.svg" alt="" />
            }
          >
            계좌번호로 송금하기
          </List.Item>
        </List>
      </BottomSheet.Root>
    </>
  );
}
