import { useNotifications } from '@components/notification/NotificationContext';
import { EmojiProfile } from '@pages/feeds/components/feed/emoji-profile/EmojiProfile';
import { ToastWrapper } from '@pages/feeds/components/feed/ToastWrapper';
import { addComment } from '@remotes/comments';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

interface Props {
  id: number;
  onSubmit: () => void;
}

interface Field {
  message: string;
}

export function CommentForm({ id, onSubmit }: Props) {
  const uniqueId = useMemo(() => {
    return EmojiProfile.getRandom();
  }, []);
  const { showNotification } = useNotifications();
  const toastSuccessMessage = useCallback(() => {
    showNotification({
      element: <ToastWrapper>🥰 고마워요!</ToastWrapper>,
    });
  }, [showNotification]);
  const toastErrorMessage = useCallback(() => {
    showNotification({
      element: (
        <ToastWrapper>😯 메세지가 입력되지 않은 것 같아요!</ToastWrapper>
      ),
    });
  }, [showNotification]);

  const { register, handleSubmit, formState } = useForm<Field>({
    mode: 'onChange',
  });

  return (
    <Form
      css={{ spaceX: '$8' }}
      onSubmit={handleSubmit(async ({ message }) => {
        await addComment(id, { message });
        toastSuccessMessage();
        onSubmit();
      }, toastErrorMessage)}
    >
      <EmojiProfile id={uniqueId} />
      <Input
        {...register('message', { required: true, validate: x => x !== '' })}
        autoFocus={true}
        placeholder="재엽.소영에게 메세지 남기기"
      />
      <SubmitButton disabled={formState.isSubmitting || !formState.isValid}>
        게시
      </SubmitButton>
    </Form>
  );
}

const Form = styled('form', {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 24px 8px 10px',
  border: '1px solid $gray200',
  borderRadius: '24px',
});

const Input = styled('input', {
  flexGrow: 1,
});

const SubmitButton = styled('button', {
  justifyContent: 'flex-end',
  color: '$blue500',
  '&:disabled': {
    color: '$gray400',
  },
});
