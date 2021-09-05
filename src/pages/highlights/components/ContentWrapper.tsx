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

  setPrevToBackgroundContent?: () => void;
  setNextToBackgroundContent?: () => void;
}

const FADE_OUT = {
  LEFT: -250,
  RIGHT: 250,
};

const DRAG_BREAK_POINT = 100;
export default function ContentWrapper({
  imageContent,
  setNext,
  setPrev,
  children,
  setPrevToBackgroundContent,
  setNextToBackgroundContent,
  ...props
}: PropsWithChildren<Props>) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const [exitX, setExitX] = useState<string | number>('100%');

  useEffect(() => {
    // 모바일에서 컨텐츠 넘겼을때 스크롤 밀리는 것 방지
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const unsubscribeX = x.onChange(value => {
      if (value < -20) {
        setNextToBackgroundContent?.();
      }

      if (value > 20) {
        setPrevToBackgroundContent?.();
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [setNextToBackgroundContent, setPrevToBackgroundContent, x]);

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

  // framer-motion이 drag="x"때 pan-y넣는것 override
  touchAction: 'pan-x !important',
});

const BackgroundMotionDiv = styled(motion.div, {
  br: '$3',

  backgroundSize: 'cover',
  height: '100%',
});
