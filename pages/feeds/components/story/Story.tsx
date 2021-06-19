import Gradient from '@components/gradient';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { theme } from 'tailwind.config';
import { useStories } from './useStories';

export function Story() {
  const { data: stories } = useStories();

  return (
    <Flex
      elementType="ol"
      className="flex space-x-24 py-14 px-8 border-solid border-b border-gray-300"
    >
      {stories.data.map(story => {
        return (
          <Flex.CenterVertical
            elementType="li"
            key={story.id}
            direction="column"
          >
            <Image.Root className="relative">
              <Image.RoundShape
                width={60}
                height={60}
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
            </Image.Root>
            <span>{story.name}</span>
          </Flex.CenterVertical>
        );
      })}
    </Flex>
  );
}
