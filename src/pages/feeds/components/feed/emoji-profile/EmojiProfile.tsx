import { Flex } from '@components/util/layout/Flex';
import { getRandomNumberInRange } from '@utils/getRandomNumberInRange';
import React from 'react';
import { styled } from 'stitches.config';

const animalEmojiSets = [
  { emoji: '🐶', color: '$amber100' },
  { emoji: '🐱', color: '$yellow100' },
  { emoji: '🐭', color: '$indigo100' },
  { emoji: '🐹', color: '$orange100' },
  { emoji: '🐰', color: '$blueGray100' },
  { emoji: '🦊', color: '$orange100' },
  { emoji: '🐻', color: '$violet100' },
  { emoji: '🐼', color: '$cyan100' },
  { emoji: '🐨', color: '$teal100' },
  { emoji: '🐯', color: '$emerald100' },
  { emoji: '🦁', color: '$lime100' },
  { emoji: '🐮', color: '$cyan100' },
  { emoji: '🐷', color: '$red100' },
  { emoji: '🐸', color: '$green100' },
  { emoji: '🐵', color: '$lightBlue100' },
  { emoji: '🐔', color: '$pink100' },
  { emoji: '🐧', color: '$violet100' },
  { emoji: '🐤', color: '$amber100' },
  { emoji: '🐦', color: '$emerald100' },
  { emoji: '🐙', color: '$red100' },
  { emoji: '🐡', color: '$lime100' },
  { emoji: '🐠', color: '$green100' },
  { emoji: '🐳', color: '$blue100' },
  { emoji: '🦄', color: '$pink100' },
];

interface Props {
  id?: number;
}

export function EmojiProfile({ id }: Props) {
  const randomIndex = id ?? EmojiProfile.getRandom();
  const { emoji, color } = animalEmojiSets[randomIndex];

  return <Circle css={{ backgroundColor: color }}>{emoji}</Circle>;
}

EmojiProfile.getRandom = () =>
  getRandomNumberInRange({ min: 0, max: animalEmojiSets.length - 1 });

const Circle = styled(Flex.Center, {
  borderRadius: '50%',
  padding: '$4',
  width: 24,
  height: 24,
  border: '1px solid $gray100',
  fontSize: 'large',
});
