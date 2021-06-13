import React from 'react';
import storiesData from '@assets/stories.json';
import Avatar from '@components/avatar';
import { Flex } from '@components/util/layout/Flex';

const StoryContainer = () => {
  return (
    <Flex elementType="ol" className="gap-x-20">
      {storiesData.data.map(story => {
        return (
          <li key={story.id}>
            <Avatar src={story.profileImage} size={60} />
          </li>
        );
      })}
    </Flex>
  );
};

export default StoryContainer;
