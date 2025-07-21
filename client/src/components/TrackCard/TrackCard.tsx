import './TrackCard.scss';
import type {Track} from '@/entities/api/track/trackApi.ts';
import React from 'react';
import Button from '@/shared/ui/Button';
import {Icon} from '@/shared/ui/Icon';
import {useIsMobile} from '@/shared/lib/useIsMobile.ts';

type TrackCardProps = Track & {
  isFavorite: boolean;
  toggleFavorite: () => void;
  onPlayClick: () => void;
}

const TrackCard = (props: TrackCardProps) => {
  const {
    id,
    title,
    artist,
    duration,
    album,
    isFavorite,
    toggleFavorite,
    onPlayClick,
  } = props;

  const isMobile = useIsMobile();

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite();
  }

  return (
    <div className='track-card' onClick={onPlayClick}>
      <span className='track-card__number'>{id}</span>
      <div className='track-card__wrapper-1'>
        <img className='track-card__image' src="/track-img.jpg" alt="Обложка альбома"/>
        <div className='track-card__info'>
          <span className='track-card__info-name'>{title}</span>
          <span className='track-card__info-artist'>{artist}</span>
        </div>
      </div>
      <div className='track-card__album'>
        <span className='track-card__album-text'>{album || '-'}</span>
      </div>
      <div className='track-card__wrapper-2'>
        <span className='track-card__post-date'>6 дней назад</span>
        <Button
          className='track-card__favorite-button'
          width={24}
          height={24}
          iconName='heart'
          mode='transparent'
          iconMode={isFavorite ? 'orange-01' : 'gray-05'}
          hasFillIcon={isFavorite}
          onClick={handleFavoriteClick}
        />
      </div>
      <div className='track-card__wrapper-3'>
        <span className='track-card__duration'>{duration}</span>
        {!isMobile ?
          <Icon
            name='setting'
            className='track-card__icon'
            width={23}
            height={4}
          />
          :
          <Icon
            name='settingMobile'
            className='track-card__icon'
            width={23}
            height={4}
          />
        }
      </div>
    </div>
  )
}


export default TrackCard;