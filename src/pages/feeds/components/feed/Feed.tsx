import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { SSRSuspense } from '@components/util/SSRSafeSusepnse';
import useBooleanState from '@hooks/useBooleanState';
import { FeedEntity, 액션를_포함하는_피드인가 } from '@models/Feed';
import { Author } from '@pages/feeds/components/feed/Author';
import { CommentForm } from '@pages/feeds/components/feed/comment-form/CommentForm';
import { Comments } from '@pages/feeds/components/feed/comments/Comments';
import { Description } from '@pages/feeds/components/feed/Description';
import { FeedActionCTA } from '@pages/feeds/components/feed/FeedActionCTA';
import { CommentIcon } from '@pages/feeds/components/feed/icon/CommentIcon';
import { LikeIcon } from '@pages/feeds/components/feed/icon/LikeIcon';
import { Tags } from '@pages/feeds/components/feed/Tags';
import fadeEntrance from '@utils/animation/fadeEntrance';
import { scrollIntoView } from '@utils/scrollIntoView';
import { motion } from 'framer-motion';
import React, { ReactNode, useCallback, useRef } from 'react';
import { css, styled } from 'stitches.config';
import { FeedCarouselWrapper } from './FeedCarouselWrapper';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { useAccount } from './useAccount';

interface Props {
  feeds: FeedEntity[];
}

export function Feed({ feeds }: Props) {
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
    <motion.div {...fadeEntrance.y()} transition={{ duration: 0.4 }}>
      {feeds.map(feed => (
        <FeedItemContainer {...feed}>
          {renderContent(feed.contents)}
        </FeedItemContainer>
      ))}
      <Footer />
    </motion.div>
  );
}

function FeedItemContainer({
  id,
  description,
  tags,
  children,
}: FeedEntity & { children: ReactNode }) {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const { data: account } = useAccount();
  const [isInputMode, toInputMode, toDisplayMode] = useBooleanState(false);
  const handleCommentIconClick = useCallback(() => {
    if (descriptionRef.current != null) {
      scrollIntoView(descriptionRef.current, { offset: 90 });
    }
    toInputMode();
  }, [toInputMode]);

  return (
    <Wrapper key={id}>
      <Header />
      {children}
      <DescriptionWrapper ref={descriptionRef}>
        <Flex css={{ spaceX: '$8' }}>
          <LikeIcon />
          <CommentIcon onClick={handleCommentIconClick} />
        </Flex>
        <div className={css({ spaceX: '$8' })()}>
          <Author>{account.name}</Author>
          <Description>{description}</Description>
        </div>
        {tags != null ? <Tags values={tags} /> : null}
      </DescriptionWrapper>
      <SSRSuspense fallback={null}>
        <CommentWrapper>
          {isInputMode ? (
            <CommentForm id={id} onSubmit={toDisplayMode} />
          ) : (
            <Comments id={id} />
          )}
        </CommentWrapper>
      </SSRSuspense>
    </Wrapper>
  );
}

const Wrapper = styled('section', {
  pb: '$32',
});

const DescriptionWrapper = styled('div', {
  px: '$12',
  mt: '-24px',
});

const CommentWrapper = styled('div', {
  padding: '12px',
});
