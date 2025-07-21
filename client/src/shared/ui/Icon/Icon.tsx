import './Icon.scss';
import classNames from 'classnames';
import IconSearch from '@/assets/icons/search.svg?react';
import IconUserMenuArrow from '@/assets/icons/arrow-small-right.svg?react';
import IconMusicNote from '@/assets/icons/music-note.svg?react';
import IconCalendar from '@/assets/icons/calendar.svg?react';
import IconClock from '@/assets/icons/clock.svg?react';
import IconHeart from '@/assets/icons/heart.svg?react';
import IconSetting from '@/assets/icons/setting.svg?react';
import IconSettingMobile from '@/assets/icons/setting-mobile.svg?react';
import IconPrevArrow from '@/assets/icons/skip-prev-arrow.svg?react';
import IconNextArrow from '@/assets/icons/skip-next-arrow.svg?react';
import IconRepeat from '@/assets/icons/repeat.svg?react';
import IconShuffle from '@/assets/icons/shuffle.svg?react';
import IconVolume from '@/assets/icons/volume.svg?react';
import IconVolumeMuted from '@/assets/icons/volume-muted.svg?react';
import IconPlay from '@/assets/icons/play.svg?react';
import IconPause from '@/assets/icons/pause.svg?react';
import IconSmallPlay from '@/assets/icons/small-play.svg?react';

const ICONS = {
  search: IconSearch,
  userMenuArrow: IconUserMenuArrow,
  musicNote: IconMusicNote,
  calendar: IconCalendar,
  clock: IconClock,
  heart: IconHeart,
  setting: IconSetting,
  settingMobile: IconSettingMobile,
  skipPrevArrow: IconPrevArrow,
  skipNextArrow: IconNextArrow,
  repeat: IconRepeat,
  shuffle: IconShuffle,
  volume: IconVolume,
  volumeMuted: IconVolumeMuted,
  play: IconPlay,
  pause: IconPause,
  smallPlay: IconSmallPlay,
};

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  className?: string;
  hasFill?: boolean;
  width?: number;
  height?: number;
  /**
   * '' (default) / 'transparent' / 'orange-01' / 'gray-05' / 'hover-none'
   */
  iconMode?: '' | 'orange-01' | 'gray-05' | 'hover-none' | string;
};

export const Icon = ({ name, className, width, height, iconMode = '', hasFill }: IconProps) => {
  const Component = ICONS[name];
  return Component ?
    <Component
      className={classNames('icon',
        className,
        ...(iconMode?.split(' ').map(mode => `icon--${mode}`)),
        {'icon--fill': hasFill}
      )}
      width={width}
      height={height}
    /> : null;
};
