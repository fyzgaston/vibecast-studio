import './TrackList.scss';
import {Icon} from '@/shared/ui/Icon';
import {fetchTracks, type Track } from '@/entities/api/track/trackApi.ts';
import TrackCard from '@/components/TrackCard';
import {useQuery} from '@tanstack/react-query';
import { useTrackContext } from '@/shared/lib/TrackContext';
import {useMemo} from 'react'
import { useSearchContext } from '@/shared/lib/SearchContext';

type TrackListProps = {
  mode: 'all' | 'favorites',
}

const TrackList = ({ mode }: TrackListProps) => {
  const { setCurrentTrack, favorites, toggleFavorite } = useTrackContext();
  const { searchValue } = useSearchContext();

  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const filteredTracks = useMemo((): Track[] => {
    const trackList = mode === 'favorites'
      ? tracks.filter(track => favorites.includes(track.id))
      : tracks;

    return trackList.filter((track) =>
      track.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchValue.toLowerCase()) ||
      track.album?.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [mode, tracks, favorites, searchValue])

  return (
    <div className='track-list'>
      <h1 className='track-list__title h1'>Аудифайлы и треки</h1>
      <ul className='track-list__header'>
        <li className='track-list__header-item'>№</li>
        <li className='track-list__header-item'>Название</li>
        <li className='track-list__header-item'>Альбом</li>
        <li className='track-list__header-item'>
          <Icon
            name='calendar'
            iconMode='gray-05 hover-none'
            height={16}
            width={16}
          />
        </li>
        <li className='track-list__header-item'>
          <Icon
            name='clock'
            iconMode='gray-05 hover-none'
            height={16}
            width={16}
          />
        </li>
      </ul>

      <div className='track-list__scroll-wrapper'>
        <ul className='track-list__tracks'>
          {isLoading ? (
            <li className='track-list__error-message'>
              Подождите, треки загружаются...
            </li>
          ) : (
          filteredTracks.length === 0 ? (
            <li className='track-list__error-message'>
              По вашему запросу ничего не найдено
            </li>
          ) : filteredTracks.map((track: Track) => (
              <li className='track-list__track' key={track.id}>
                <TrackCard
                  {...track}
                  isFavorite={favorites.includes(track.id)}
                  toggleFavorite={() => toggleFavorite(track.id)}
                  onPlayClick={() => setCurrentTrack(track)}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default TrackList;