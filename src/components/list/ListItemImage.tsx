import { HTMLAttributes, HTMLProps } from 'react';

type Props = HTMLProps<HTMLImageElement>;

export function ListItemImage({ width = 36, ...props }: Props) {
  return <img {...(props as HTMLAttributes<HTMLImageElement>)} width={width} />;
}
