import { BottomSheet } from '@components/bottom-sheet';
import { List } from '@components/list/List';
import { useDialog } from '@hooks/useDialog';
import { useTransferData } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/toss-transfer/useTransferData';
import React, { useCallback, useMemo } from 'react';

export function useTossTransferBottomSheet() {
  const { open } = useDialog();
  const {
    data: { title, description, transfer },
  } = useTransferData();

  const openBottomSheet = useCallback(() => {
    return open(({ onConfirm, onCancel }) => {
      return (
        <BottomSheet.Root
          open={true}
          onClose={onCancel}
          title={title}
          description={description}
        >
          <List css={{ my: '$16' }}>
            {transfer.map(({ message, link, logo }) => {
              return (
                <List.Item
                  elementType="a"
                  leftAddon={<List.Item.Image src={logo} alt="토스로고" />}
                  href={link}
                  onClick={onCancel}
                >
                  {message}
                </List.Item>
              );
            })}
            <List.Divider />
            <List.Item
              css={{ color: '$gray500' }}
              leftAddon={
                <List.Item.Image
                  src="/assets/svg/transfer-icon.svg"
                  alt="송금"
                />
              }
              rightAddon={<List.Item.ArrowIcon />}
              onClick={onConfirm}
            >
              <List.Item.Text size="xl">계좌번호로 송금하기</List.Item.Text>
            </List.Item>
          </List>
        </BottomSheet.Root>
      );
    });
  }, [description, open, title, transfer]);

  return useMemo(() => ({ open: openBottomSheet }), [openBottomSheet]);
}
