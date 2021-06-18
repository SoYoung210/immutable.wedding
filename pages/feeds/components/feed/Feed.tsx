import Image from '@components/image';
import Text from '@components/text';
import React, { Fragment } from 'react';
import { Header } from './Header';
import { useAccount } from './useAccount';
import { useFeeds } from './useFeeds';

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
            <Image width={스크린_너비} height={스크린_너비}>
              <Image.Source src={feed.imageContents[0]} alt="feed_사진" />
            </Image>

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
