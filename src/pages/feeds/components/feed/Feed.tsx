import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { Author } from '@pages/feeds/components/feed/Author';
import { CreateAt } from '@pages/feeds/components/feed/CreateAt';
import { Description } from '@pages/feeds/components/feed/Description';
import { FeedActionCTA } from '@pages/feeds/components/feed/FeedActionCTA';
import { CommentIcon } from '@pages/feeds/components/feed/icon/CommentIcon';
import { LikeIcon } from '@pages/feeds/components/feed/icon/LikeIcon';
import React from 'react';
import { css, styled } from 'stitches.config';
import { FeedCarouselWrapper } from './FeedCarouselWrapper';
import { Header } from './header/Header';
import { useAccount } from './useAccount';
import { useFeeds, 액션를_포함하는_피드인가 } from './useFeeds';

const 이미지_크기 = 1024;

export function Feed() {
  const { data: account } = useAccount();
  const { data: feeds } = useFeeds();

  return (
    <>
      {feeds.map(({ id, contents, description, createdAt }) => {
        return (
          <Wrapper key={id}>
            <Header />
            <FeedCarouselWrapper>
              {contents.map((feedContents, index) => {
                return (
                  <Image.Root key={index}>
                    <Image key={index} width={이미지_크기} height={이미지_크기}>
                      <Image.Source
                        src={feedContents.imageSrc}
                        alt="feed_사진"
                      />
                    </Image>
                    {액션를_포함하는_피드인가(feedContents) ? (
                      <FeedActionCTA action={feedContents.action} />
                    ) : null}
                  </Image.Root>
                );
              })}
            </FeedCarouselWrapper>

            <DescriptionWrapper>
              <Flex css={{ spaceX: '$16' }}>
                <LikeIcon />
                <CommentIcon />
              </Flex>
              <div className={css({ spaceX: '$8' })()}>
                <Author>{account.name}</Author>
                <Description>{description}</Description>
              </div>
              <CreateAt>{createdAt}</CreateAt>
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
