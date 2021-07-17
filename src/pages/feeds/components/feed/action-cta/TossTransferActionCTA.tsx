import useBooleanState from '@hooks/useBooleanState';
import { FeedAction } from '@models/Feed';
import { BottomSheetActionCTA } from '@pages/feeds/components/feed/action-cta/BottomSheetActionCTA';

interface Props {
  action: FeedAction;
}

export function TossTransferActionCTA({ action }: Props) {
  const [isOpen, open, close] = useBooleanState();

  return (
    <>
      <BottomSheetActionCTA action={action} onClick={open} />
      {isOpen ? <div onClick={close}>open</div> : null}
    </>
  );
}
