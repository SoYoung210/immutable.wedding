import React from 'react';
import storiesData from '@assets/stories.json';
import { Flex } from '@components/util/layout/Flex';
import { theme } from 'tailwind.config';
import Gradient from '@components/gradient';
import Image from '@components/image';

const imageWrapperProps: React.HTMLProps<HTMLImageElement> = {
  className: 'relative',
};

const StoryContainer = () => {
  return (
    <Flex elementType="ol" className="flex space-x-24 pt-14 px-8">
      {storiesData.data.map(story => {
        return (
          <Flex.CenterVertical
            elementType="li"
            key={story.id}
            direction="column"
          >
            <Image.RoundShape
              wrapperProps={imageWrapperProps}
              size={60}
              variants={
                <div className="absolute -top-6 -left-6">
                  <Gradient.Circle
                    size={72}
                    strokeWidth={2.3}
                    colors={[
                      theme.colors.deepBlue['500'],
                      theme.colors.lightGreen['900'],
                    ]}
                  />
                </div>
              }
            >
              <Image.Source
                src={story.profileImage}
                alt="스토리_프로필_이미지"
              />
            </Image.RoundShape>
            <span>{story.name}</span>
          </Flex.CenterVertical>
        );
      })}
    </Flex>
  );
};

export default StoryContainer;
