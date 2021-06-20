import Image from '@components/image';
import Text from '@components/text';
import Carousel from '@components/carousel';
import React, { Fragment } from 'react';
import { Header } from './header/Header';
import { useAccount } from './useAccount';
import { useFeeds } from './useFeeds';
import { Dot } from '@components/carousel/Dot';
import arrayOf from '@utils/array/arrayOf';
import { css } from 'stitches.config';

const 스크린_너비 = 520;

const descriptionStyle = css({
  px: '$12',
});

export function Feed() {
  const { data: account } = useAccount();
  const { data: feeds } = useFeeds();

  return (
    <div className={css({ pt: 10 })()}>
      {feeds.data.map(feed => {
        return (
          <Fragment key={feed.id}>
            <Header />
            <Carousel
              dot={({ size, currentIndex }) => (
                <Dot.Root css={{ mt: '$17', mb: '$8' }}>
                  {arrayOf(size).map(index => (
                    <Dot
                      key={index}
                      color={index === currentIndex ? '$blue400' : '$gray200'}
                    />
                  ))}
                </Dot.Root>
              )}
            >
              {feed.imageContents.map((imageSource, index) => {
                return (
                  <Image.Root key={index}>
                    <Image key={index} width={스크린_너비} height={스크린_너비}>
                      <Image.Source src={imageSource} alt="feed_사진" />
                    </Image>
                  </Image.Root>
                );
              })}
            </Carousel>

            <div className={descriptionStyle()}>
              <Text elementType="span" weight="bold" size="sm">
                {account.name}
              </Text>
              <Text
                elementType="p"
                css={{ display: 'inline', ml: '$8' }}
                weight="light"
                size="sm"
              >
                {feed.description}
              </Text>
              <Text weight="extralight" size="sm" css={{ color: '$gray300' }}>
                {feed.createdAt}
              </Text>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
