import { HTMLAttributes, HTMLProps } from 'react';

type Props = HTMLProps<HTMLImageElement>;

export function ListItemImage(props: Props) {
  return <img {...(props as HTMLAttributes<HTMLImageElement>)} />;
}
