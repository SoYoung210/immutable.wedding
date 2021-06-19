import React, {
  cloneElement,
  Children,
  ReactElement,
  HTMLAttributes,
  forwardRef,
  Ref,
  useImperativeHandle,
} from 'react';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider/react';
import cx from 'classnames';

import { useCarousel, Options as CarouselOptions } from './useCarousel';

interface SliderRef {
  slider: () => KeenSlider;
  moveTo: (index: number) => void;
}
interface DotProps {
  currentIndex: number;
  size: number;
}
interface Props
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Omit<CarouselOptions, 'slideChanged'> {
  dot?: (props: DotProps) => ReactElement;
  children: ReactElement[] | ReactElement;
  onChange?: (instance: KeenSlider) => void;
}
const Carousel = forwardRef(function Carousel(
  { children, dot, className, defaultIndex, onChange, ...props }: Props,
  ref: Ref<SliderRef>
) {
  const { slider, sliderRef, size, index, setIndex } = useCarousel({
    defaultIndex,
    slideChanged: onChange,
    ...props,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        slider() {
          return slider;
        },
        moveTo(index: number) {
          setIndex(index);
        },
      };
    },
    []
  );

  return (
    <>
      <div ref={sliderRef} className={cx('keen-slider', className)}>
        {Children.toArray(children).map(child => {
          const carouselItem = child as ReactElement;

          return cloneElement(carouselItem, {
            ...carouselItem.props,
            className: cx('keen-slider__slide', carouselItem.props.className),
          });
        })}
      </div>
      {dot?.({ currentIndex: index, size })}
    </>
  );
});

export default Carousel;
