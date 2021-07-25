import { BottomSheet } from '@components/bottom-sheet';
import { List } from '@components/list/List';
import { useNotifications } from '@components/notification/NotificationContext';
import useBooleanState from '@hooks/useBooleanState';
import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/BottomSheetActionCTA';
import { useBankData } from '@pages/feeds/components/feed/action-cta/useBankData';
import { ToastWrapper } from '@pages/feeds/components/feed/ToastWrapper';
import { copyToClipboard } from '@utils/copyToClipboard';
import React, { useCallback } from 'react';

interface BankInfo {
  holderName: string;
  bankName: string;
  accountNumber: string;
  logo: string;
}

interface Props {
  action: FeedAction;
}

export function AccountTransferActionCTA({ action }: Props) {
  const {
    data: { groom, bridge },
  } = useBankData();
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
          <List.Group title="신랑측">
            {groom.map(BankAccountListItem)}
          </List.Group>
          <List.Group title="신부측">
            {bridge.map(BankAccountListItem)}
          </List.Group>
        </List>
      </BottomSheet.Root>
    </>
  );
}

function BankAccountListItem({
  holderName,
  bankName,
  accountNumber,
  logo,
}: BankInfo) {
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

  return (
    <List.Item
      leftAddon={<List.Item.Image src={logo} alt={bankName} />}
      rightAddon={<List.Item.ArrowIcon />}
      onClick={openToast}
    >
      {holderName}
      <List.Item.BottomText>
        {bankName} {accountNumber}
      </List.Item.BottomText>
    </List.Item>
  );
}
