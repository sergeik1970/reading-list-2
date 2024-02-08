import * as genresAPI from "./genreService";

const books = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Станционный смотритель",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Классика" },
    author: "Пушкин А. С.",
    pages: 119
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Шинель",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Классика" },
    author: "Гоголь Н. В.",
    pages: 83
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Три мушкетёра",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Приключения" },
    author: "Дюма А.",
    pages: 352
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Таинственный остров",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Фантастика" },
    author: "Верн Ж.",
    pages: 455
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Властелин колец",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Фантастика" },
    author: "Толкин Д.",
    pages: 920
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Понедельник начинается в субботу",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Фантастика" },
    author: "Стругацкие",
    pages: 150
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Два капитана",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Приключения" },
    author: "Каверин В.",
    pages: 255
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Вокруг света за 80 дней",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Приключения" },
    author: "Верн Ж.",
    pages: 420
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Герой нашего времени",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Классика" },
    author: "Лермонтов М. Ю.",
    pages: 211
  }
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find(m => m._id === id);
}

export function saveBook(book) {
  let bookInDb = books.find(m => m._id === book._id) || {};
  bookInDb.name = book.name;
  bookInDb.genre = genresAPI.genres.find(g => g._id === book.genreId);
  bookInDb.author = book.author;
  bookInDb.pages = book.pages;

  if (!bookInDb._id) {
    bookInDb._id = Date.now();
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deleteBook(id) {
  let bookInDb = books.find(m => m._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
