import Gradient from '@components/gradient';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { css, styled } from 'stitches.config';
import { useHighlights } from './useHighlights';

const highlightImageLayout = css({ position: 'relative' });

export function Highlight() {
  const { data: highlights } = useHighlights();

  return (
    <Flex
      elementType="ol"
      css={{
        spaceX: '$16',
        p: '$20',
        mb: '$20',
        overflowX: 'scroll',
        borderBottom: '1px solid $gray100',
      }}
    >
      {highlights.data.map(highlight => {
        return (
          <Flex.CenterVertical
            elementType="li"
            key={highlight.id}
            direction="column"
            css={{ flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }}
          >
            <Image.Root className={highlightImageLayout()}>
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
            <HighlightName css={{ mt: '$6' }}>{highlight.name}</HighlightName>
          </Flex.CenterVertical>
        );
      })}
    </Flex>
  );
}

const HighlightName = styled('span', {
  fontSize: '$xs',
});
