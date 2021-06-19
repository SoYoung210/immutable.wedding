import { TOptionsEvents } from 'keen-slider';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

export interface Options extends TOptionsEvents {
  defaultIndex?: number;
}

export function useCarousel(options?: Options) {
  const [currentIndex, setCurrentIndex] = useState(options?.defaultIndex ?? 0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...options,
    slideChanged: s => {
      options?.slideChanged?.(s);
      setCurrentIndex(s.details().relativeSlide);
    },
  });
  const size = slider?.details().size ?? 0;

  return {
    currentIndex,
    setCurrentIndex,
    sliderRef,
    slider,
    size,
  };
}
