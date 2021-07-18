import CloseIcon from '@components/icon/Close';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const BottomSheetCloseButton = (props: Props) => {
  return (
    <button type="button" {...props}>
      <CloseIcon />
      <VisuallyHidden>닫기</VisuallyHidden>
    </button>
  );
};
