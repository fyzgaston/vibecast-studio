import './AudioPlayer.scss';
import { Icon } from '@/shared/ui/Icon';
import {ProgressBar, type SliderHandle } from 'shared/ui/ProgressBar';
import Button from '@/shared/ui/Button';
import {useState, useEffect, useRef, useCallback} from 'react';
import { useTrackContext } from '@/shared/lib/TrackContext';
import { formatTime } from '@/shared/lib/formatTIme.ts';
import classNames from 'classnames';
import { setFavorites } from '@/shared/lib/storage';

const AudioPlayer = () => {
  const {
    currentTrack,
    favorites,
    toggleFavorite,
    playlist,
    currentIndex,
    setCurrentIndex
  } = useTrackContext();
  const isFavorite = currentTrack ? favorites.includes(currentTrack.id) : false;

  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<SliderHandle>(null);
  const volumeSliderRef = useRef<SliderHandle>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);

  // при загрузке метаданных аудио
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // логика обновления избранного
  const handleFavorite = () => {
    if (currentTrack) {
      toggleFavorite(currentTrack.id);
      const updatedFavorites = favorites.includes(currentTrack.id)
        ? favorites.filter(id => id !== currentTrack.id)
        : [...favorites, currentTrack.id];

      setFavorites(updatedFavorites);
    }
  }

  // обновление времени вручную (ползунок)
  const handleTimeChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setTime(newTime);
    }
  };

  // воспроизведение/пауза
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // отслеживание паузы/плея извне
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    }
  })

  // при смене трека
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  // изменение громкости
  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  // инициализация звука при старте
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initialVolume = audio.volume;
    setVolume(initialVolume);
    setIsMuted(initialVolume === 0);
    volumeSliderRef.current?.setProgress(initialVolume * 100);
  }, []);

  // изменение звука
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVolumeChange = () => {
      const newVolume = audio.volume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      volumeSliderRef.current?.setProgress(newVolume * 100);
    }

    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('volumechange', handleVolumeChange);
    }
  }, [])

  // плавное обновление прогресса
  const animate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const current = audio.currentTime;
    const percent = (current / duration) * 100;

    sliderRef.current?.setProgress(percent);
    setTime(current);

    requestAnimationFrame(animate);
  }, [duration]);

  useEffect(() => {
    if (isPlaying) {
      requestAnimationFrame(animate);
    }
  }, [isPlaying, animate]);

  // кнопки назад/вперед
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= playlist.length - 1;

  //логика переключения назад
  const onPrev = () => {
    if (!isPrevDisabled) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  // логика переключения далее
  const  onNext = () => {
    if (!isNextDisabled) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  // логика рандомного перемешивания музычки
  const getShuffle = () => {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex && playlist.length > 1) {
      randomIndex = Math.floor(Math.random() * playlist.length);
    }
    setCurrentIndex(randomIndex);
  }

  // логика повтора трека
  const handleRepeat = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setIsRepeat(false);
    }
  }

  return (
    <div className='audio-player'>
      <div className='audio-player__info'>
        <img
          className='audio-player__image'
          src={`${import.meta.env.BASE_URL}track-img.jpg`}
          alt="Обложка альбома"/>
        <div className='audio-player__info-inner'>
          <div className='audio-player__info-title-wrapper'>
            <span className='audio-player__info-name'>{currentTrack?.title}</span>
            <Button
              className='track-card__favorite-button'
              width={24}
              height={24}
              iconName='heart'
              mode='transparent'
              iconMode={isFavorite ? 'orange-01' : 'gray-05'}
              hasFillIcon={isFavorite}
              onClick={handleFavorite}
            />
          </div>
          <span className='audio-player__info-artist'>{currentTrack?.artist}</span>
        </div>
      </div>
      <div className='audio-player__center'>
        <div className='audio-player__center-buttons'>
          <Button
            className='audio-player__shuffle-button'
            width={16}
            height={16}
            iconName='shuffle'
            mode='transparent'
            onClick={getShuffle}
          />
          <Button
            className={classNames('audio-player__prev-button', {
              'button--disabled': isPrevDisabled
            })}
            width={16}
            height={16}
            iconName='skipPrevArrow'
            mode='transparent'
            onClick={onPrev}
          />
          {!isPlaying ?
            <Button
              className='audio-player__play-button'
              width={13}
              height={15}
              iconName='play'
              iconMode='hover-none'
              onClick={togglePlay}
            />
            :
            <Button
              className='audio-player__play-button'
              width={10}
              height={15}
              iconName='pause'
              iconMode='hover-none'
              onClick={togglePlay}
            />
          }
          <Button
            className={classNames('audio-player__next-button', {
              'button--disabled': isNextDisabled
            })}
            width={16}
            height={16}
            iconName='skipNextArrow'
            mode='transparent'
            onClick={onNext}
          />
          <Button
            className={classNames('audio-player__repeat-button', {
              'button--orange-01': isRepeat
            })}
            width={16}
            height={16}
            iconName='repeat'
            mode='transparent'
            iconMode={isRepeat ? 'orange-01' : ''}
            hasFillIcon={isRepeat}
            onClick={() => setIsRepeat(prev => !prev)}
          />
        </div>
        <div className='audio-player__progress'>
          <span className='audio-player__progress-time'>{formatTime(time)}</span>
          <ProgressBar
            ref={sliderRef}
            value={time}
            min={0}
            max={duration}
            step={0.01}
            onChange={handleTimeChange}
          />
          <span className='audio-player__progress-time'>{formatTime(duration)}</span>
        </div>
      </div>
      <div className='audio-player__volume'>
        <Icon
          name={!isMuted ? 'volume' : 'volumeMuted'}
          width={16}
          height={16}
          iconMode='hover-none'
        />
        <ProgressBar
          ref={volumeSliderRef}
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange} />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.url_audio}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isRepeat) {
            handleRepeat();
          } else if (!isRepeat && currentIndex + 1 < playlist.length) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }}

      />

    </div>
  )
}

export default AudioPlayer;