import React, { cloneElement, HTMLProps, Children, ReactElement } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import cx from 'classnames';

interface Props extends HTMLProps<HTMLDivElement> {
  indicator: boolean;
  children: ReactElement[] | ReactElement;
}
const Carousel = ({ children, indicator }: Props) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>();

  return (
    <div ref={sliderRef} className="keen-slider">
      {Children.toArray(children).map(child => {
        const carouselItem = child as ReactElement;

        return cloneElement(carouselItem, {
          ...carouselItem.props,
          className: cx('keen-slider__slide', carouselItem.props.className),
        });
      })}
    </div>
  );
};

export default Carousel;
