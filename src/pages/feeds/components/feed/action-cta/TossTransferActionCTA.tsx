import { BottomSheet } from '@components/bottom-sheet';
import { List } from '@components/list/List';
import useBooleanState from '@hooks/useBooleanState';
import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/BottomSheetActionCTA';
import { useTransferData } from '@pages/feeds/components/feed/action-cta/useTransferData';
import React from 'react';

interface Props {
  action: FeedAction;
}

export function TossTransferActionCTA({ action }: Props) {
  const {
    data: { transfer },
  } = useTransferData();
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
          {transfer.map(({ message, link, logo }) => {
            return (
              <List.Item
                elementType="a"
                leftAddon={<List.Item.Image src={logo} alt="토스로고" />}
                href={link}
              >
                {message}
              </List.Item>
            );
          })}
          <List.Divider />
          <List.Item
            css={{ color: '$gray500' }}
            leftAddon={
              <List.Item.Image src="/assets/svg/transfer-icon.svg" alt="송금" />
            }
            rightAddon={<List.Item.ArrowIcon />}
            onClick={close}
          >
            <List.Item.Text size="xl">계좌번호로 송금하기</List.Item.Text>
          </List.Item>
        </List>
      </BottomSheet.Root>
    </>
  );
}
