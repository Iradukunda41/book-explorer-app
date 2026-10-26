let favorites = [];

export function getFavorites() {
  return [...favorites];
}

export function isFavorite(id) {
  return favorites.some((book) => book.id === id);
}

export function addFavorite(book) {
  if (isFavorite(book.id)) return false;
  favorites.push(book);
  return true;
}

export function removeFavorite(id) {
  favorites = favorites.filter((book) => book.id !== id);
}