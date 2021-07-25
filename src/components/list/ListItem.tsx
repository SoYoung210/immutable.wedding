import { ListItemImage } from '@components/list/ListItemImage';
import { ListItemText } from '@components/list/ListItemText';
import { Flex } from '@components/util/layout/Flex';
import { mergeCss } from '@utils/styles';
import React, { Children, ComponentProps, ReactNode, useMemo } from 'react';

type Props = ComponentProps<typeof Flex['CenterVertical']> & {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  spaceX?: number;
};

export function ListItem({
  children,
  spaceX = 12,
  css,
  leftAddon,
  rightAddon,
  elementType = 'li',
  ...props
}: Props) {
  const contents = useMemo(() => {
    if (typeof children === 'string') {
      return <ListItemText>{children}</ListItemText>;
    }

    if (Children.count(children) === 2) {
      const firstElement = Children.toArray(children)[0];
      const secondElement = Children.toArray(children)[1];

      return (
        <Flex direction="column">
          {typeof firstElement === 'string' ? (
            <ListItemText size="xl">{firstElement}</ListItemText>
          ) : (
            firstElement
          )}
          {typeof secondElement === 'string' ? (
            <ListItem.BottomText>{secondElement}</ListItem.BottomText>
          ) : (
            secondElement
          )}
        </Flex>
      );
    }
    return children;
  }, [children]);

  return (
    <Flex.CenterVertical
      elementType={elementType}
      role={elementType === 'li' ? 'button' : ''}
      justify="between"
      css={mergeCss({ width: '100%' }, css)}
      {...props}
    >
      <Flex.CenterVertical css={{ spaceX }}>
        {leftAddon}
        {contents}
      </Flex.CenterVertical>
      {rightAddon}
    </Flex.CenterVertical>
  );
}

ListItem.Text = ListItemText;
ListItem.Image = ListItemImage;
ListItem.ArrowIcon = function ListItemArrowIcon() {
  return <ListItemImage src="/assets/svg/arrow-right.svg" alt="" width={18} />;
};
ListItem.BottomText = function ListItemBottomText({
  weight = 'semibold',
  size = 'medium',
  color = '$gray500',
  ...props
}: ComponentProps<typeof ListItemText>) {
  return (
    <ListItemText weight={weight} size={size} css={{ color }} {...props} />
  );
};
