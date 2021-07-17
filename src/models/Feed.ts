import { NextImage } from '@models/common/NextImage';

/**
 * contents
 */
interface SimpleFeedContent {
  image: NextImage;
  action: never;
}

interface LinkFeedContent {
  image: NextImage;
  action: FeedAction;
}

export type FeedContent = SimpleFeedContent | LinkFeedContent;

/**
 * actions
 */
interface Action {
  text: string;
  color: string;
}

interface LinkAction extends Action {
  href: string;
  message: never;
}

interface PopupAction extends Action {
  href: never;
  message: string;
}

export type FeedAction = LinkAction | PopupAction | Action;

export function 링크_액션인가(action: FeedAction): action is LinkAction {
  return (action as any).href != null;
}

export function 팝업_액션인가(action: FeedAction): action is PopupAction {
  return (action as any).message != null;
}

export interface FeedEntity {
  id: number;
  contents: FeedContent[];
  description: string;
  createdAt?: string;
  tags: string[];
}

export function 액션를_포함하는_피드인가(
  feed: FeedContent
): feed is LinkFeedContent {
  return feed.action != null;
}

export interface RawFeedData {
  id: number;
  contents: Array<{
    imageSrc: string;
    action: {
      text?: string;
      color?: string;
    };
  }>;
  description: string;
  createdAt?: string;
  tags: string[];
}
