import feedsJson from '@assets/feeds.json';

interface SimpleFeedContent {
  imageSrc: string;
  link: never;
}
interface LinkFeedContent {
  imageSrc: string;
  link: {
    text: string;
    color: string;
  };
}

type FeedContent = SimpleFeedContent | LinkFeedContent;

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

export function 링크를_포함하는_피드인가(
  feed: FeedContent
): feed is LinkFeedContent {
  return feed.link != null;
}
