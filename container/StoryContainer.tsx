import React from 'react';
import storiesData from '@assets/stories.json';
import Avatar from '@components/avatar';

const StoryContainer = () => {
  return (
    <ol>
      {storiesData.data.map(story => {
        return (
          <li key={story.id}>
            <Avatar src={story.profileImage} size={60} />
          </li>
        );
      })}
    </ol>
  );
};

export default StoryContainer;
