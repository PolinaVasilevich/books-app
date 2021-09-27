import Book from "@/models/Book";

export default interface Library {
  _id: number | string;
  name: string;
  address?: string;
  // books?: Book;
}
