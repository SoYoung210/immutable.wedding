import { NextImage } from '@models/common/NextImage';

interface HighlightContent {
  id: number;
  image: NextImage;
}

export interface Highlight {
  id: number;
  name: string;
  thumbnailImage: NextImage;
  contents: HighlightContent[];
}

export interface RawHighlightData {
  id: number;
  name: string;
  thumbnailImageSrc: string;
  contents: {
    id: number;
    imageSrc: string;
  }[];
}
