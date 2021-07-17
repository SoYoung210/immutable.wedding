import { ArrowRight as ArrowRightIcon } from '@components/icon/ArrowRight';
import { useNotifications } from '@components/notification/NotificationContext';
import { FeedAction, 링크_액션인가, 팝업_액션인가 } from 'src/models/Feed';
import { copyToClipboard } from '@utils/copyToClipboard';
import { CSSProps } from '@utils/styles';
import React, { AllHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { styled } from 'stitches.config';
import { ToastWrapper } from './ToastWrapper';

interface Props {
  action: FeedAction;
}

export function FeedActionCTA({ action }: Props) {
  const { showNotification } = useNotifications();

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
        as="button"
        backgroundColor={action.color}
        css={{
          width: '100%',
        }}
        type="button"
        onClick={() => {
          copyToClipboard('계좌번호지롱');
          showNotification({
            element: <ToastWrapper>✅ {action.message}</ToastWrapper>,
          });
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
    } & CSSProps;

function FeedCTA<ElementType extends keyof JSX.IntrinsicElements>({
  as,
  backgroundColor,
  children,
  css,
  ...props
}: FeedCTAProps<ElementType>) {
  const Component = styled(as ?? 'div', {}) as any;

  return (
    <Component
      css={{
        backgroundColor,
        display: 'flex',
        padding: '10px 18px',

        alignItems: 'center',
        justifyContent: 'space-between',
        color: '$white',
        fontSize: 14,
        fontWeight: 'medium',
        ...css,
      }}
      {...props}
    >
      {children}
      <ArrowRightIcon />
    </Component>
  );
}
