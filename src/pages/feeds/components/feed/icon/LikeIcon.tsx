import { EmptyHeart, FillHeart } from '@components/icon/Heart';
import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import useBooleanState from '@hooks/useBooleanState';
import { motion } from 'framer-motion';
import React, {
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
} from 'react';
import { styled } from 'stitches.config';
import { ToastWrapper } from '../ToastWrapper';
import iconStyles from './likeIcon.module.scss';
import cx from 'classnames';
type Props = HTMLAttributes<HTMLButtonElement>;

const StyledMotionDiv = styled(motion.div, {});

export function LikeIcon({ onClick, ...props }: Props) {
  const { showNotification } = useNotifications();
  const [like, , setLikeToFalse, toggleLike] = useBooleanState();

  const openToast = useCallback(() => {
    showNotification({
      element: (
        <ToastWrapper>
          💖 저희도 고마워요, 눌러주신 마음은 따로 저장하진 않을게요
        </ToastWrapper>
      ),
    });
  }, [showNotification]);

  useEffect(() => {
    let timeoutId: any;
    if (like) {
      timeoutId = setTimeout(setLikeToFalse, 1550);
      openToast();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [like, openToast, setLikeToFalse]);

  const handleClickLikeButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      toggleLike();
    },
    [onClick, toggleLike]
  );

  return (
    <Image.Root
      as="button"
      onClick={handleClickLikeButton}
      css={{
        zIndex: '$1',
      }}
      {...props}
    >
      <StyledMotionDiv
        className={cx(
          {
            [iconStyles.animate]: like,
          },
          iconStyles.likeButton
        )}
      >
        {like ? <FillHeart /> : <EmptyHeart />}
      </StyledMotionDiv>
    </Image.Root>
  );
}
