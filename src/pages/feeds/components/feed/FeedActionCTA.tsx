import { ArrowRightIcon } from '@pages/feeds/components/feed/icon/ArrowRightIcon';
import {
  FeedAction,
  링크_액션인가,
  팝업_액션인가,
} from '@pages/feeds/components/feed/useFeedAction';
import React, { AllHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { css } from 'stitches.config';

interface Props {
  action: FeedAction;
}

export function FeedActionCTA({ action }: Props) {
  if (링크_액션인가(action)) {
    return (
      <FeedCTA
        as="a"
        backgroundColor={action.color}
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action.text}
      </FeedCTA>
    );
  }

  if (팝업_액션인가(action)) {
    return (
      <FeedCTA
        backgroundColor={action.color}
        onClick={() => {
          // TODO: change to toast
          alert(action.message);
        }}
      >
        {action.text}
      </FeedCTA>
    );
  }

  return <FeedCTA backgroundColor={action.color}>{action.text}</FeedCTA>;
}

type FeedCTAProps<ElementType extends keyof JSX.IntrinsicElements = 'div'> =
  HTMLAttributes<AllHTMLAttributes<ElementType>> &
    Omit<React.AllHTMLAttributes<ElementType>, 'as'> & {
      as?: ElementType;
      backgroundColor: string;
      children: ReactNode;
    };

function FeedCTA<ElementType extends keyof JSX.IntrinsicElements>({
  as,
  backgroundColor,
  children,
  ...props
}: FeedCTAProps<ElementType>) {
  const Component = (as ?? 'div') as any;

  return (
    <Component
      className={css({
        backgroundColor,
        display: 'flex',
        padding: '10px 18px',

        alignItems: 'center',
        justifyContent: 'space-between',
        color: '$white',
        fontSize: 14,
        fontWeight: 'medium',
      })()}
      {...props}
    >
      {children}
      <ArrowRightIcon />
    </Component>
  );
}
