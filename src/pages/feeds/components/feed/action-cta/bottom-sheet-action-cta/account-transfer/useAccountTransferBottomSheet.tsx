import { BottomSheet } from '@components/bottom-sheet';
import { List } from '@components/list/List';
import { useNotifications } from '@components/notification/NotificationContext';
import { useDialog } from '@hooks/useDialog';
import { BankInfo } from '@models/Bank';
import { useBankData } from '@pages/feeds/components/feed/action-cta/bottom-sheet-action-cta/account-transfer/useBankData';
import { ToastWrapper } from '@pages/feeds/components/feed/ToastWrapper';
import { copyToClipboard } from '@utils/copyToClipboard';
import React, { ComponentProps, useCallback, useMemo } from 'react';

export function useAccountTransferBottomSheet() {
  const { open } = useDialog();
  const {
    data: { groom, bridge },
  } = useBankData();

  const openBottomSheet = useCallback(() => {
    open(({ onConfirm }) => {
      return (
        <BottomSheet.Root
          open={true}
          onClose={close}
          title="소영, 재엽의 결혼을 축하해주세요 💖"
          description="감사한 마음 잊지 않고 오랫동안 간직할게요."
        >
          <List css={{ my: '$16' }}>
            <List.Group title="신랑측">
              {groom.map(bank => (
                <BankAccountListItem {...bank} onClick={onConfirm} />
              ))}
            </List.Group>
            <List.Group title="신부측">
              {bridge.map(bank => (
                <BankAccountListItem {...bank} onClick={onConfirm} />
              ))}
            </List.Group>
          </List>
        </BottomSheet.Root>
      );
    });
  }, [bridge, groom, open]);

  return useMemo(() => ({ open: openBottomSheet }), [openBottomSheet]);
}

function BankAccountListItem({
  holderName,
  bankName,
  accountNumber,
  logo,
  onClick,
  ...props
}: BankInfo['groom'][number] &
  Omit<ComponentProps<typeof List['Item']>, 'leftAddon' | 'rightAddon'>) {
  const { showNotification } = useNotifications();
  const openToast = useCallback(() => {
    copyToClipboard(accountNumber);
    showNotification({
      element: (
        <ToastWrapper>
          ✅ 계좌번호를 복사했어요.
          <br /> {bankName} {accountNumber} (예금주:{holderName})
        </ToastWrapper>
      ),
    });
  }, [accountNumber, bankName, holderName, showNotification]);
  const handleClick = useCallback(
    e => {
      onClick?.(e);
      openToast();
    },
    [onClick, openToast]
  );

  return (
    <List.Item
      leftAddon={<List.Item.Image src={logo} alt={bankName} />}
      rightAddon={<List.Item.ArrowIcon />}
      onClick={handleClick}
      {...(props as any)}
    >
      {holderName}
      <List.Item.BottomText>
        {bankName} {accountNumber}
      </List.Item.BottomText>
    </List.Item>
  );
}
