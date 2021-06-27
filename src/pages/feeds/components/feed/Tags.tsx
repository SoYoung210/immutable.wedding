import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import React from 'react';

interface Props {
  values: string[];
}

export function Tags({ values }: Props) {
  return (
    <Flex css={{ columnGap: '$6', mt: '$4' }} wrap="wrap">
      {values.map(value => {
        return (
          <Text
            key={value}
            weight="medium"
            size="base"
            css={{ color: '$blue500' }}
          >
            #{value}
          </Text>
        );
      })}
    </Flex>
  );
}
