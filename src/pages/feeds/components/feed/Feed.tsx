import Image from '@components/image';
import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import { styled } from 'stitches.config';
import { FeedCarouselWrapper } from './FeedCarouselWrapper';
import { Header } from './header/Header';
import { useAccount } from './useAccount';
import { useFeeds } from './useFeeds';

const 이미지_크기 = 1024;

export function Feed() {
  const { data: account } = useAccount();
  const { data: feeds } = useFeeds();

  return (
    <>
      {feeds.data.map(feed => {
        return (
          <Wrapper key={feed.id}>
            <Header />
            <FeedCarouselWrapper>
              {feed.imageContents.map((imageSource, index) => {
                return (
                  <Image.Root key={index}>
                    <Image key={index} width={이미지_크기} height={이미지_크기}>
                      <Image.Source src={imageSource} alt="feed_사진" />
                    </Image>
                  </Image.Root>
                );
              })}
            </FeedCarouselWrapper>

            <DescriptionWrapper>
              <Flex css={{ gap: '$14' }}>
                <Image.Root as="button">
                  <Image width={24} height={24}>
                    <Image.Source
                      src="/assets/icon/heart.png"
                      alt="좋아요_아이콘"
                    />
                  </Image>
                </Image.Root>
                <Image.Root as="button">
                  <Image width={24} height={24}>
                    <Image.Source
                      src="/assets/icon/comment.png"
                      alt="코멘트_아이콘"
                    />
                  </Image>
                </Image.Root>
              </Flex>

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
              <Text
                weight="extralight"
                size="sm"
                css={{ color: '$gray400', mt: '$4' }}
              >
                {feed.createdAt}
              </Text>
            </DescriptionWrapper>
          </Wrapper>
        );
      })}
    </>
  );
}

const Wrapper = styled('section', {
  pb: '$32',
});

const DescriptionWrapper = styled('div', {
  px: '$12',
  mt: '-24px',
});
