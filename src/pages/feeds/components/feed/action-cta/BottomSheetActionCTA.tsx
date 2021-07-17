import { FeedAction } from '@models/Feed';
import { ActionCTA } from '@pages/feeds/components/feed/action-cta/ActionCTA';
import React from 'react';

interface Props {
  onClick: () => void;
  action: FeedAction;
}

export function BottomSheetActionCTA({ action, onClick }: Props) {
  return (
    <ActionCTA
      as="button"
      backgroundColor={action.color}
      css={{ width: '100%' }}
      type="button"
      onClick={onClick}
    >
      {action.text}
    </ActionCTA>
  );
}
