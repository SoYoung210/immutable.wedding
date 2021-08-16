import { Button } from '@components/button';
import React, { ComponentProps } from 'react';

export function SmallGrayButton(
  props: Omit<ComponentProps<typeof Button>, 'color'>
) {
  return (
    <Button
      variant="text"
      color="gray500"
      type="button"
      size="xs"
      compact={true}
      {...(props as any)}
    />
  );
}
