import React, { Fragment } from 'react';
import feedData from '@assets/feed.json';
import { Flex } from '@components/util/layout/Flex';
import Text from '@components/text';
import Image from '@components/image';
import { 스크린_너비 } from 'constants/styles';
import { 계정_이름, 계정_프로필_사진 } from 'constants/config';
import Carousel from '@components/carousel';

const FeedSection = () => {
  return (
    <div className="pt-10">
      {feedData.data.map(feed => {
        return (
          <Fragment key={feed.id}>
            <Header />
            <Carousel indicator={false}>
              {feed.imageContents.map((imageSource, index) => {
                return (
                  <Image.Root>
                    <Image key={index} width={스크린_너비} height={스크린_너비}>
                      <Image.Source src={imageSource} alt="feed_사진" />
                    </Image>
                  </Image.Root>
                );
              })}
            </Carousel>

            <Text component="span" weight="bold" size="sm">
              {계정_이름}
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
};

const Header = () => (
  <Flex.CenterVertical className="py-9 px-8">
    <Image.Root className="flex">
      <Image.RoundShape width={30} height={30}>
        <Image.Source src={계정_프로필_사진} alt="재엽소영사진" />
      </Image.RoundShape>
    </Image.Root>
    <Text weight="bold" className="ml-6">
      {계정_이름}
    </Text>
  </Flex.CenterVertical>
);

export default FeedSection;
