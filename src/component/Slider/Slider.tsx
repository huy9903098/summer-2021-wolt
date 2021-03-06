import React, { useState, useEffect } from 'react';
import { Card } from '../Card/Card';
import './Slider.scss';

interface SliderProps {
  item: SectionType;
  width: number;
}

interface SectionType {
  title: string;
  restaurants: RestaurantType[];
}

export interface RestaurantType {
  blurhash: string;
  launch_date: string;
  location: number[];
  name: string;
  online: boolean;
  popularity: number;
}
// generate new array for slider
const getArrayToIndex = (array: RestaurantType[], index: number) => {
  let arrayFinal = [] as RestaurantType[];

  const prevItem = index - 1 < 0 ? array.length - 1 : index - 1;
  const firstItem = index;
  const secondItem = index + 1 > array.length - 1 ? 0 : index + 1;
  const thirdItem = secondItem + 1 > array.length - 1 ? 0 : secondItem + 1;
  const nextItem = thirdItem + 1 > array.length - 1 ? 0 : thirdItem + 1;

  arrayFinal = [
    array[prevItem],
    array[firstItem],
    array[secondItem],
    array[thirdItem],
    array[nextItem],
  ];
  return arrayFinal;
};

export const Slider: React.FC<SliderProps> = ({ item, width }) => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0,
    cardarray: getArrayToIndex(item.restaurants, 0),
  });

  const NextSlide = () => {
    const nextIndex =
      state.activeIndex + 1 > item.restaurants.length - 1
        ? 0
        : state.activeIndex + 1;
    setState({
      activeIndex: nextIndex,
      translate: -(width + 20),
      transition: 0.25,
      cardarray: state.cardarray,
    });
  };

  const PrevSlide = () => {
    const prevIndex =
      state.activeIndex - 1 < 0
        ? item.restaurants.length - 1
        : state.activeIndex - 1;
    setState({
      activeIndex: prevIndex,
      translate: width + 20,
      transition: 0.25,
      cardarray: state.cardarray,
    });
  };

  useEffect(() => {
    const changeArray = () => {
      setState({
        activeIndex: state.activeIndex,
        translate: 0,
        transition: 0,
        cardarray: getArrayToIndex(item.restaurants, state.activeIndex),
      });
    };

    window.addEventListener('transitionend', changeArray);
    return () => {
      window.removeEventListener('transitionend', changeArray);
    };
  }, [state.activeIndex]);

  return (
    <>
      <div className="header-container">
        <h2 className="header-container__title">
          {item.title} {` (${item.restaurants.length})`}
        </h2>
        <div className="header-container__button">
          <button className="button left" onClick={PrevSlide}>
            {'<'}
          </button>
          <button className="button right" onClick={NextSlide}>
            {'>'}
          </button>
        </div>
      </div>

      <div className="carousel">
        <div
          className="slider"
          style={{
            transform: `translate(${state.translate - (width + 20)}px)`,
            transition:
              state.transition === 0 ? 'none' : `all ${state.transition}s`,
          }}
        >
          {state.cardarray.map((restaurant, index) => (
            <div className="slider__card-item" key={index}>
              <Card width={width} restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
