import React from 'react';
import { RestaurantType } from '../Slider/Slider';
import './Card.scss';
import { Blurhash } from 'react-blurhash';
import star from '../../image/star.svg';

interface CardProps {
  restaurant: RestaurantType;
  width: number;
}

export const Card: React.FC<CardProps> = ({ restaurant, width }) => {
  return (
    <div
      className="restaurant-card"
      style={{
        width: width,
      }}
    >
      <div
        className="restaurant-card__image"
        style={{
          width: width,
          height: width * (9 / 16),
        }}
      >
        {!restaurant.online && (
          <div className={`restaurant-card__image__closed`}>Closed</div>
        )}

        <Blurhash
          hash={restaurant.blurhash}
          width={'100%'}
          height={'100%'}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <div className="restaurant-card__desc">
        <div className="restaurant-card__desc__name">{restaurant.name}</div>
        <div className="restaurant-card__desc__rating">
          <img className="restaurant-card__desc__rating__star" src={star}></img>
          {(5 * restaurant.popularity).toFixed(1)}
        </div>
      </div>
    </div>
  );
};
