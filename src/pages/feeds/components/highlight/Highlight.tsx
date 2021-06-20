import Gradient from '@components/gradient';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { css } from 'stitches.config';
import { theme } from 'tailwind.config';
import { useHighlights } from './useHighlights';

const layout = css({
  display: 'flex',
  spaceX: 24,
  py: 14,
  px: 8,
  borderBottom: '1px solid $gray300',
});

export function Highlight() {
  const { data: highlights } = useHighlights();

  return (
    <Flex elementType="ol" className={layout()}>
      {highlights.data.map(highlight => {
        return (
          <Flex.CenterVertical
            elementType="li"
            key={highlight.id}
            direction="column"
          >
            <Image.Root className={css({ position: 'relative' })()}>
              <Image.RoundShape
                width={60}
                height={60}
                variants={
                  <div
                    className={css({
                      position: 'absolute',
                      top: -6,
                      left: -6,
                    })()}
                  >
                    <Gradient.Circle
                      size={72}
                      strokeWidth={2.3}
                      colorKeys={['deepBlue500', 'lightGreen900']}
                    />
                  </div>
                }
              >
                <Image.Source
                  src={highlight.profileImage}
                  alt="스토리_프로필_이미지"
                />
              </Image.RoundShape>
            </Image.Root>
            <span>{highlight.name}</span>
          </Flex.CenterVertical>
        );
      })}
    </Flex>
  );
}
