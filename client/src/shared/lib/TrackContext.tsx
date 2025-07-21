import { createContext, useContext, useState, useEffect} from 'react';
import React from 'react';
import { type Track } from '@/entities/api/track/trackApi';
import {toggleFavoriteTrack} from '@/shared/lib/toggleFavorite';
import {getCurrentId, getFavorites, setCurrentId, setFavorites as storeFavorites} from '@/shared/lib/storage';
import {fetchTracks} from '@/entities/api/track/trackApi';

type TrackContextType = {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  playlist: Track[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
};

export const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const useTrackContext = () => {
  const context = useContext(TrackContext);
  if (!context) throw new Error('useTrackContext must be used within a TrackProvider');
  return context;
};

type TrackProviderProps = {
  children: React.ReactNode;
};

export const TrackProvider = ({ children }: TrackProviderProps) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>(getFavorites);
  const currentTrack = playlist[currentIndex] || null;

  const setCurrentTrack = (track: Track) => {
    const index = playlist.findIndex(t => t.id === track.id);
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => toggleFavoriteTrack(id, prev));
  };

  useEffect(() => {
    if (currentTrack !== null) {
      setCurrentId(String(currentTrack.id));
    }
  }, [currentTrack]);

  useEffect(() => {
    const loadTracks = async () => {
      const tracks = await fetchTracks();
      setPlaylist(tracks);

      const savedTrackId = getCurrentId();
      const index = tracks.findIndex(track => track.id === Number(savedTrackId));
      setCurrentIndex(index >= 0 ? index : 0);

      const validFavorites = getFavorites().filter(id =>
        tracks.some(track => track.id === id)
      )

      setFavorites(validFavorites);
    };
    void loadTracks();
  }, []);


  useEffect(() => {
    storeFavorites(favorites);
  }, [favorites]);

  return (
    <TrackContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      favorites,
      toggleFavorite,
      playlist,
      currentIndex,
      setCurrentIndex
    }}>
      {children}
    </TrackContext.Provider>
  );
};