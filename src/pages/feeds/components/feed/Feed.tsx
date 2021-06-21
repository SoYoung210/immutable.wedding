import Image from '@components/image';
import Text from '@components/text';
import Carousel from '@components/carousel';
import React, { Fragment } from 'react';
import { Header } from './header/Header';
import { useAccount } from './useAccount';
import { useFeeds } from './useFeeds';
import { Dot } from '@components/carousel/Dot';
import arrayOf from '@utils/array/arrayOf';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';

const 이미지_크기 = 1024;

export function Feed() {
  const { data: account } = useAccount();
  const { data: feeds } = useFeeds();

  return (
    <Wrapper>
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
              pageInfo={({ size, currentIndex }) => (
                <Box
                  css={{
                    position: 'absolute',
                    top: 14,
                    right: 15,
                    px: '$11',
                    py: '$7',
                    backgroundColor: 'rgba(0,0,0,.75)',
                    color: '$white',
                    br: '$50',
                  }}
                >
                  {currentIndex + 1} / {size}
                </Box>
              )}
            >
              {feed.imageContents.map((imageSource, index) => {
                return (
                  <Image.Root key={index}>
                    <Image key={index} width={이미지_크기} height={이미지_크기}>
                      <Image.Source src={imageSource} alt="feed_사진" />
                    </Image>
                  </Image.Root>
                );
              })}
            </Carousel>

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
          </Fragment>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  pt: '$10',
});

const DescriptionWrapper = styled('div', {
  px: '$12',
  mt: '-24px',
});
