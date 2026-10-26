import { books } from './books.js';
import { addFavorite, removeFavorite, getFavorites, isFavorite } from './favorites.js';

const booksGrid = document.querySelector('#books-grid');
const favoritesGrid = document.querySelector('#favorites-grid');
const emptyMessage = document.querySelector('#empty-message');

const heartIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`;

function createButton(book, mode) {
  if (mode === 'remove') {
    return `<button data-id="${book.id}" data-action="remove"
      class="mt-4 flex w-fit items-center gap-1 rounded-lg border border-red-500 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
      Remove</button>`;
  }
  if (mode === 'added') {
    return `<button disabled
      class="mt-4 flex w-fit cursor-not-allowed items-center gap-1 rounded-lg bg-gray-200 px-3 py-1.5 text-sm text-gray-500">
      ${heartIcon} Added</button>`;
  }
  return `<button data-id="${book.id}" data-action="add"
    class="mt-4 flex w-fit items-center gap-1 rounded-lg border border-indigo-600 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50">
    ${heartIcon} Add to favorites</button>`;
}

function createCard(book, mode) {
  return `
    <article class="flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <div class="flex h-56 items-center justify-center bg-gray-200 text-gray-400">Cover</div>
      <div class="flex flex-1 flex-col p-4">
        <h3 class="font-semibold">${book.title}</h3>
        <p class="mt-1 text-sm text-gray-500">${book.author}</p>
        <p class="mt-3 line-clamp-3 text-sm text-gray-600">${book.description}</p>
        <div class="mt-auto">${createButton(book, mode)}</div>
      </div>
    </article>`;
}

function render() {
  const favorites = getFavorites();

  favoritesGrid.innerHTML = favorites.map((book) => createCard(book, 'remove')).join('');
  emptyMessage.classList.toggle('hidden', favorites.length > 0);

  booksGrid.innerHTML = books
    .map((book) => createCard(book, isFavorite(book.id) ? 'added' : 'add'))
    .join('');
}

function handleClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = Number(button.dataset.id);

  if (button.dataset.action === 'add') {
    addFavorite(books.find((book) => book.id === id));
  } else if (button.dataset.action === 'remove') {
    removeFavorite(id);
  }

  render();
}

booksGrid.addEventListener('click', handleClick);
favoritesGrid.addEventListener('click', handleClick);

render();