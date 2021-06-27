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
