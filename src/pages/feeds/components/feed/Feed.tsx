import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { Author } from '@pages/feeds/components/feed/Author';
import { Description } from '@pages/feeds/components/feed/Description';
import { FeedActionCTA } from '@pages/feeds/components/feed/FeedActionCTA';
import { CommentIcon } from '@pages/feeds/components/feed/icon/CommentIcon';
import { LikeIcon } from '@pages/feeds/components/feed/icon/LikeIcon';
import { Tags } from '@pages/feeds/components/feed/Tags';
import { FeedEntity, 액션를_포함하는_피드인가 } from '@pages/feeds/models/Feed';
import React, { useCallback } from 'react';
import { css, styled } from 'stitches.config';
import { FeedCarouselWrapper } from './FeedCarouselWrapper';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { useAccount } from './useAccount';

interface Props {
  feeds: FeedEntity[];
}

export function Feed({ feeds }: Props) {
  const { data: account } = useAccount();

  const renderContent = useCallback((contents: FeedEntity['contents']) => {
    return (
      <FeedCarouselWrapper>
        {contents.map((content, index) => {
          return (
            <Image.Root key={index}>
              <Image
                key={index}
                {...content.image}
                placeholder="blur"
                className={css({ transition: 'all 0.2s' })()}
              >
                <Image.Source src={content.image.src} alt="feed_사진" />
              </Image>
              {액션를_포함하는_피드인가(content) ? (
                <FeedActionCTA action={content.action} />
              ) : null}
            </Image.Root>
          );
        })}
      </FeedCarouselWrapper>
    );
  }, []);

  return (
    <>
      {feeds.map(({ id, contents, description, tags }) => {
        return (
          <Wrapper key={id}>
            <Header />
            {renderContent(contents)}
            <DescriptionWrapper>
              <Flex css={{ spaceX: '$16' }}>
                <LikeIcon />
                <CommentIcon />
              </Flex>
              <div className={css({ spaceX: '$8' })()}>
                <Author>{account.name}</Author>
                <Description>{description}</Description>
              </div>
              {tags != null ? <Tags values={tags} /> : null}
            </DescriptionWrapper>
          </Wrapper>
        );
      })}
      <Footer />
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
