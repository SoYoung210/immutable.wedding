import CloseIcon from '@components/icon/Close';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React from 'react';

export const BottomSheetCloseButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <CloseIcon />
      <VisuallyHidden>닫기</VisuallyHidden>
    </button>
  );
};
