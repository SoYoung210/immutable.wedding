import React from 'react';
import feedData from '@assets/feed.json';
import { Flex } from '@components/util/layout/Flex';
import Text from '@components/text';
import Image from '@components/image';

const FeedContainer = () => {
  return (
    <div className="pt-10">
      {feedData.data.map(feed => {
        return (
          <>
            <Header />
          </>
        );
      })}
    </div>
  );
};

const Header = () => (
  <Flex>
    <Image.RoundShape>
      <Image.Source
        src="https://avatars.githubusercontent.com/u/17924127?v=4"
        alt="재엽소영사진"
      />
    </Image.RoundShape>
    <Text weight="bold">immutable(soso, jbee)</Text>
  </Flex>
);

export default FeedContainer;
