export const toggleFavoriteTrack = (id: number, favorites: number[]): number[] => {
  return favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];
};