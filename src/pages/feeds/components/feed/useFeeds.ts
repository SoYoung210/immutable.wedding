import feedsJson from 'public/assets/data/feeds.json';
import { FeedAction } from '@pages/feeds/components/feed/useFeedAction';

interface SimpleFeedContent {
  imageSrc: string;
  action: never;
}

interface LinkFeedContent {
  imageSrc: string;
  action: FeedAction;
}

export type FeedContent = SimpleFeedContent | LinkFeedContent;

interface Feed {
  id: number;
  contents: FeedContent[];
  description: string;
  createdAt: string;
}

export function useFeeds() {
  const data = feedsJson.data as unknown as Feed[];

  return { data };
}

export function 액션를_포함하는_피드인가(
  feed: FeedContent
): feed is LinkFeedContent {
  return feed.action != null;
}
