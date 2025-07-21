export type Track = {
  id: number;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  size_mb?: number;
  url_audio: string;
}

// получения обычного списка треков
export const fetchTracks = async (): Promise<Track[]> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Токен не найден');
  }
  const response = await fetch('/api/tracks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при получении треков');
  }

  return await response.json();
}