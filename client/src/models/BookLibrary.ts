import Book from "@/models/Book";

export default interface BookLibrary {
  _id?: number | string;
  book: Book;
  count: number;
}
