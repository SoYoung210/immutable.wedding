import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import React, { ComponentProps } from 'react';
import { mergeCss } from '@utils/styles';

interface Props extends Omit<ComponentProps<typeof Flex>, 'title'> {
  title?: string;
  spaceY?: number;
}

export function ListGroup({
  title,
  spaceY = 24,
  children,
  css,
  ...props
}: Props) {
  return (
    <Flex
      elementType="section"
      direction="column"
      css={mergeCss({ spaceY }, css)}
      {...(props as any)}
    >
      {typeof title === 'string' ? (
        <ListGroupTitle>{title}</ListGroupTitle>
      ) : (
        title
      )}
      {children}
    </Flex>
  );
}

ListGroup.Title = ListGroupTitle;

function ListGroupTitle({
  size = 'medium',
  weight = 'normal',
  color = '$gray500',
  ...props
}: ComponentProps<typeof Text>) {
  return (
    <Text
      elementType="span"
      size={size}
      weight={weight}
      css={{ color }}
      {...props}
    />
  );
}
