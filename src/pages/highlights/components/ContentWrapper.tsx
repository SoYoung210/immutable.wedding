import { NextImage } from '@models/common/NextImage';
import {
  DraggableProps,
  motion,
  MotionProps,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'stitches.config';

interface Props extends DraggableProps, MotionProps {
  imageContent: NextImage | null;
  setNext?: () => void;
  setPrev?: () => void;
}

const FADE_OUT = {
  LEFT: -250,
  RIGHT: 250,
};

const DRAG_BREAK_POINT = 130;
export default function ContentWrapper({
  imageContent,
  setNext,
  setPrev,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const [exitX, setExitX] = useState<string | number>('100%');

  useEffect(() => {
    if (exitX === FADE_OUT.LEFT) {
      setNext?.();
    }

    if (exitX === FADE_OUT.RIGHT) {
      setPrev?.();
    }

    return () => {
      setExitX('100%');
    };
  }, [exitX, setNext, setPrev]);

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.x < -DRAG_BREAK_POINT) {
      return setExitX(FADE_OUT.LEFT);
    }
    if (info.offset.x > DRAG_BREAK_POINT) {
      return setExitX(FADE_OUT.RIGHT);
    }
  }

  return (
    <StyledMotionWrapper
      style={{
        x,
        width: '100%',
        cursor: 'grab',
      }}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      exit={{
        x: exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      {imageContent != null ? (
        <BackgroundMotionDiv
          style={{
            scale,
            backgroundImage: `url(${imageContent.blurDataURL})`,
            width: '100%',
          }}
        >
          {children}
        </BackgroundMotionDiv>
      ) : null}
    </StyledMotionWrapper>
  );
}

const StyledMotionWrapper = styled(motion.section, {
  backgroundColor: '$transparent',
  height: '100vh',

  position: 'absolute',
  top: 0,
});

const BackgroundMotionDiv = styled(motion.div, {
  height: '100%',
  br: '$3',

  backgroundSize: 'cover',
});
