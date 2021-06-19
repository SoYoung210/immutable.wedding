import Image from '@components/image';
import Text from '@components/text';
import Carousel from '@components/carousel';
import React, { Fragment } from 'react';
import { Header } from './header/Header';
import { useAccount } from './useAccount';
import { useFeeds } from './useFeeds';
import { Dot } from '@components/carousel/Dot';
import arrayOf from '@utils/array/arrayOf';

const 스크린_너비 = 520;

export function Feed() {
  const { data: account } = useAccount();
  const { data: feeds } = useFeeds();

  return (
    <div className="pt-10">
      {feeds.data.map(feed => {
        return (
          <Fragment key={feed.id}>
            <Header />
            <Carousel
              dot={({ size, currentIndex }) => (
                <Dot.Root>
                  {arrayOf(size).map(index => (
                    <Dot
                      key={index}
                      color={index === currentIndex ? 'blue-400' : 'gray-200'}
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

            <Text component="span" weight="bold" size="sm">
              {account.name}
            </Text>
            <Text
              component="p"
              className="inline ml-8"
              weight="light"
              size="sm"
            >
              {feed.description}
            </Text>
            <Text weight="extralight" size="sm" color="gray-300">
              {feed.createdAt}
            </Text>
          </Fragment>
        );
      })}
    </div>
  );
}
