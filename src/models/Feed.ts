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
  type: string;
  text: string;
  color: string;
}

interface LinkAction extends Action {
  type: 'link';
  href: string;
  mobileLink?: string;
  pcLink?: string;
  message: never;
}

interface PopupAction extends Action {
  type: 'popup';
  href: never;
  message: string;
}

interface BottomSheetAction extends Action {
  type: 'bottom-sheet_toss' | 'bottom-sheet_account';
  href: never;
  message: never;
}

export type FeedAction = LinkAction | PopupAction | BottomSheetAction | Action;

export function 링크_액션인가(action: FeedAction): action is LinkAction {
  return action.type === 'link';
}

export function 팝업_액션인가(action: FeedAction): action is PopupAction {
  return action.type === 'popup';
}

export function 바텀싯_액션인가(
  action: FeedAction
): action is BottomSheetAction {
  return (
    action.type === 'bottom-sheet_toss' ||
    action.type === 'bottom-sheet_account'
  );
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
      type: string;
      text?: string;
      color?: string;
    };
  }>;
  description: string;
  createdAt?: string;
  tags: string[];
}
