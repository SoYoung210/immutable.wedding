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
