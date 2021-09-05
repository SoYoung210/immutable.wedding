import { EmptyHeart, FillHeart } from '@components/icon/Heart';
import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import { ToastWrapper } from '@components/toast/ToastWrapper';
import useBooleanState from '@hooks/useBooleanState';
import fadingZoom from '@utils/animation/fadingZoom';
import cx from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  Ref,
  useCallback,
  useEffect,
} from 'react';
import { styled } from 'stitches.config';
import iconStyles from './likeIcon.module.scss';

type Props = HTMLAttributes<HTMLButtonElement>;

const StyledMotionDiv = styled(motion.div, {});

function _LikeIcon({ onClick, ...props }: Props, ref: Ref<HTMLButtonElement>) {
  const { showNotification } = useNotifications();
  const [like, , setLikeToFalse, toggleLike] = useBooleanState();
  const likeAnimationControl = useAnimation();

  const openToast = useCallback(() => {
    showNotification({
      element: <ToastWrapper>💖 고마워요, 댓글도 남겨주실래요?</ToastWrapper>,
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
      e.preventDefault();
      onClick?.(e);
      toggleLike();
      likeAnimationControl.stop();
      likeAnimationControl.start(fadingZoom());
    },
    [likeAnimationControl, onClick, toggleLike]
  );

  return (
    <Image.Root
      ref={ref}
      as="button"
      type="button"
      onClick={handleClickLikeButton}
      css={{
        p: '$8',
        margin: '-8px',
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
        animate={likeAnimationControl}
      >
        {like ? <FillHeart /> : <EmptyHeart />}
      </StyledMotionDiv>
    </Image.Root>
  );
}
export const LikeIcon = forwardRef(_LikeIcon);
