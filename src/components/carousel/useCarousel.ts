import { TOptionsEvents } from 'keen-slider';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

export interface Options extends TOptionsEvents {
  defaultIndex?: number;
}

export function useCarousel(options?: Options) {
  const [index, setIndex] = useState(options?.defaultIndex ?? 0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...options,
    slideChanged: s => {
      options?.slideChanged?.(s);
      setIndex(s.details().relativeSlide);
    },
  });
  const size = slider?.details().size ?? 0;

  return {
    index,
    setIndex,
    sliderRef,
    slider,
    size,
  };
}
