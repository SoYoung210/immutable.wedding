import { Flex } from '@components/util/layout/Flex';
import React, { useEffect } from 'react';
import Text from '@components/text';
import { useInView } from 'react-intersection-observer';
import { Share } from './Share';
import { motion, useAnimation } from 'framer-motion';
import { CheckIcon } from './CheckIcon';

export function Footer() {
  const textAnimationControl = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      textAnimationControl.start((delay = 0) => {
        return {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay },
        };
      });
    }
  }, [textAnimationControl, inView]);

  return (
    <div ref={ref}>
      <Flex.Center
        direction="column"
        css={{ height: 300, pt: '$40', pb: '$28', boxSizing: 'border-box' }}
      >
        <CheckIcon isStartAnimation={inView} />
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={textAnimationControl}
          custom={1}
          transition={{ duration: 0.3 }}
        >
          <Text
            weight="extralight"
            size="xxl"
            css={{ mt: '$20', color: '$warmGray700' }}
          >
            끝까지 읽어주셔서 감사합니다
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={textAnimationControl}
          custom={1.2}
          transition={{ duration: 0.3 }}
        >
          <Share />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1.25 }}
          style={{ marginTop: 'auto' }}
        >
          <Text.Anchor
            weight="extralight"
            as="button"
            type="button"
            css={{ color: '$trueGray500', p: '$20' }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            처음부터 다시보기
          </Text.Anchor>
        </motion.div>
      </Flex.Center>
    </div>
  );
}
