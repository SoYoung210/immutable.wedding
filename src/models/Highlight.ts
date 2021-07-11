interface Image {
  blurDataURL: string;
  src: string;
  height: number;
  width: number;
  type?: string;
}

interface HighlightContent {
  id: number;
  image: Image;
}

export interface Highlight {
  id: number;
  name: string;
  thumbnailImage: Image;
  contents: HighlightContent[];
}
